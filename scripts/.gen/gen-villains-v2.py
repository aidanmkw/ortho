"""Regenerate 5 villain sprites: no halo, no see-through, no stripped fills.

Key fixes over gen-halofix.py:
  1. Connectivity-based chroma key: only pixels matching background color
     AND reachable from the image edge through similar pixels become
     transparent. Interior red/gold patches that happen to match background
     tolerance are preserved.
  2. Bright cyan-green background (RGB 0 255 200), far from any natural
     skin / robe / metal color, instead of magenta which collided with reds.
  3. Final flood-fill pass to plug any remaining interior holes by
     sampling the nearest opaque pixel color.
  4. Self-paced retry loop for quota exhaustion (waits up to 8 hours).
"""
import json, base64, io, time, sys
from collections import deque
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from PIL import Image

KEY = Path("/home/user/ortho/.gemini-key").read_text().strip()
URL = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key={KEY}"
OUT = Path("/home/user/ortho/public/sprites")

VSTYLE = (
    "Full-body character sprite for a visual novel, a VILLAIN ANTAGONIST, "
    "dramatic cel-shaded illustration, sinister, naturalistic, NOT a saint, "
    "NOT a religious icon. ABSOLUTELY NO HALO, no nimbus, no glow, no gold "
    "disc or ring, nothing behind the head. Exactly two arms. Centered "
    "standing figure head to feet, isolated on a flat solid bright "
    "cyan-green background RGB 0 255 200, no frame, no scenery, no floor, "
    "no shadow."
)

JOBS = {
    "centurion": (
        "A Roman centurion, a hard-faced soldier in segmented lorica armor "
        "with a transverse-crested helmet and a deep red cloak, holding a "
        "vine-staff, stern and merciless. Bare-headed apart from the helmet "
        "crest, no halo, no glow behind the head."
    ),
    "humbert": (
        "Cardinal Humbert of Silva Candida, a haughty 11th-century Latin "
        "cardinal in a red Western cassock and a wide flat red galero hat, "
        "holding a sealed parchment bull, a cold imperious face. The hat "
        "covers the head completely, no halo, no nimbus, no glow."
    ),
    "lds": (
        "A clean-cut young LDS missionary, a man in a crisp white dress "
        "shirt, black tie, and a black name badge, neat side-parted hair, "
        "an over-polished smile. Plain hair, no halo, no glow behind the head."
    ),
    "iconoclast": (
        "Constantine V, the iconoclast Byzantine emperor, a stern middle-aged "
        "warrior-emperor in purple imperial robes with gold trim and a "
        "Byzantine stemma crown, holding a hammer raised to smash an icon, "
        "menacing. The crown sits on the head, no halo, no nimbus behind."
    ),
    "arius": (
        "Arius the heresiarch, a gaunt austere 4th-century Alexandrian "
        "presbyter in plain dark robes, narrow ascetic face, holding a "
        "scroll, a thin defiant smile. Tonsured grey hair, no halo, no "
        "nimbus, no glow."
    ),
}

BG = (0, 255, 200)  # cyan-green
BG_TOL = 65 ** 2     # color distance tolerance squared


def connectivity_key(img: Image.Image) -> Image.Image:
    """Chroma-key only pixels matching BG AND reachable from the image edge."""
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()

    def is_bg(p):
        r, g, b = p[0], p[1], p[2]
        return (r - BG[0]) ** 2 + (g - BG[1]) ** 2 + (b - BG[2]) ** 2 < BG_TOL

    # BFS from edges through bg-colored pixels only
    visited = [[False] * h for _ in range(w)]
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if is_bg(px[x, y]):
                visited[x][y] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_bg(px[x, y]) and not visited[x][y]:
                visited[x][y] = True
                q.append((x, y))

    while q:
        x, y = q.popleft()
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny] and is_bg(px[nx, ny]):
                visited[nx][ny] = True
                q.append((nx, ny))

    # Pixels marked as exterior-bg become transparent; the rest stay opaque
    for y in range(h):
        for x in range(w):
            if visited[x][y]:
                px[x, y] = (0, 0, 0, 0)

    bb = img.getbbox()
    return img.crop(bb) if bb else img


def fill_holes(img: Image.Image) -> Image.Image:
    """Plug any remaining interior transparent pixels by sampling nearest opaque."""
    w, h = img.size
    px = img.load()

    # Mark true exterior via edge flood through transparent pixels
    visited = [[False] * h for _ in range(w)]
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if px[x, y][3] < 128:
                visited[x][y] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if px[x, y][3] < 128 and not visited[x][y]:
                visited[x][y] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny] and px[nx, ny][3] < 128:
                visited[nx][ny] = True
                q.append((nx, ny))

    holes = [(x, y) for y in range(h) for x in range(w)
             if px[x, y][3] < 128 and not visited[x][y]]
    if not holes:
        return img

    # BFS from opaque pixels outward, recording nearest opaque source per hole
    nearest = [[None] * h for _ in range(w)]
    q = deque()
    for y in range(h):
        for x in range(w):
            if px[x, y][3] >= 128:
                nearest[x][y] = (x, y)
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1),
                       (-1, -1), (1, 1), (-1, 1), (1, -1)):
            nx, ny = x + dx, y + dy
            if (0 <= nx < w and 0 <= ny < h and nearest[nx][ny] is None
                    and px[nx, ny][3] < 128 and not visited[nx][ny]):
                nearest[nx][ny] = nearest[x][y]
                q.append((nx, ny))

    for x, y in holes:
        if nearest[x][y]:
            sx, sy = nearest[x][y]
            r, g, b, _ = px[sx, sy]
            px[x, y] = (r, g, b, 255)
    return img


def generate_one(cid: str, desc: str, max_wait_hours: int = 8) -> bool:
    body = json.dumps({
        "instances": [{"prompt": VSTYLE + " " + desc}],
        "parameters": {"sampleCount": 1, "aspectRatio": "9:16"},
    }).encode()
    deadline = time.time() + max_wait_hours * 3600
    backoff = 60
    while time.time() < deadline:
        try:
            req = Request(URL, data=body, headers={"Content-Type": "application/json"})
            with urlopen(req, timeout=200) as r:
                data = json.loads(r.read())
            raw = base64.b64decode(data["predictions"][0]["bytesBase64Encoded"])
            img = Image.open(io.BytesIO(raw))
            img = connectivity_key(img)
            img = fill_holes(img)
            img.thumbnail((500, 1100), Image.LANCZOS)
            img.save(OUT / f"{cid}.webp", "WEBP", quality=92, method=6)
            print(f"{cid}: DONE {img.size}", flush=True)
            return True
        except HTTPError as e:
            if e.code in (429, 503):
                print(f"{cid}: quota/throttle ({e.code}), sleeping {backoff}s", flush=True)
                time.sleep(backoff)
                backoff = min(backoff * 2, 1800)
                continue
            print(f"{cid}: HTTP {e.code} {str(e)[:80]}", flush=True)
            return False
        except Exception as e:
            print(f"{cid}: ERR {str(e)[:120]}", flush=True)
            time.sleep(30)
            continue
    print(f"{cid}: gave up after {max_wait_hours}h", flush=True)
    return False


def main():
    only = set(sys.argv[1:]) or None
    for cid, desc in JOBS.items():
        if only and cid not in only:
            continue
        ok = generate_one(cid, desc)
        time.sleep(5 if ok else 30)
    print("ALL DONE", flush=True)


if __name__ == "__main__":
    main()
