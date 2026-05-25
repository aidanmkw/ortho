#!/usr/bin/env python3
"""Generate all 24 character portraits via Google Imagen 4."""
import json
import base64
import os
import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

KEY = Path("/home/user/ortho/.gemini-key").read_text().strip()
MODEL = "imagen-4.0-fast-generate-001"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={KEY}"
OUT_DIR = Path("/home/user/ortho/public/portraits")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PORTRAITS = [
    ("st-anthony", "Byzantine icon painting of Saint Anthony the Great, ancient desert hermit, kind weathered face, long flowing pure white beard reaching his chest, simple black monastic skufia cap, modest brown habit, holding a small wooden cross over his heart, large luminous golden halo surrounding his head, traditional dark linen and gold-leaf background, painted in authentic Eastern Orthodox iconography style, head and shoulders devotional portrait, soft warm candlelight"),

    ("st-ignatius", "Orthodox icon of Saint Ignatius of Antioch, ancient bishop of the apostolic age, intelligent kind face with gray short beard, wearing an ornate gold mitre with red gems and a small cross atop, white omophorion stole with woven red crosses, dark vestments beneath, iron chains hanging visibly from his shoulders symbolizing his martyrdom, large gold halo, gold-leaf background, traditional Byzantine icon style, head and shoulders"),

    ("st-athanasius", "Orthodox icon of Saint Athanasius the Great of Alexandria, dark-skinned Coptic bishop, short black hair and short black beard, intense determined eyes, wearing crimson and gold patriarchal vestments with a gold-trimmed omophorion, holding open scroll showing the Nicene Creed in Greek, gold halo, gold-leaf icon background, traditional Eastern Orthodox iconography, head and shoulders, devotional painting"),

    ("st-macarius", "Orthodox icon of Saint Macarius the Great of Egypt, ancient desert father, sun-darkened face, long flowing white beard, simple coarse brown monastic robe, holding small wooden cross, gentle eyes, large gold halo, gold-leaf and desert ochre background, Coptic Orthodox icon style, head and shoulders, devotional painting"),

    ("st-cyril", "Orthodox icon of Saint Cyril of Alexandria, ascetic Greek-Egyptian patriarch, brown beard reaching his chest, wearing an ornate gold mitre encrusted with red rubies and a central cross, white sakkos vestments with embroidered red crosses, holding rolled scroll, intense theological focus in his eyes, gold halo, gold-leaf background, Byzantine icon style, head and shoulders"),

    ("st-john-damascus", "Orthodox icon of Saint John of Damascus, Arab Christian monk, brown skin, dark hair under black monastic skufia cap, long dark beard, black monastic robe, holding an ornate icon of Christ Pantocrator in his hands, defender of holy images, gold halo, gold-leaf icon background, traditional Byzantine icon style, head and shoulders"),

    ("st-mark-ephesus", "Orthodox icon of Saint Mark of Ephesus, gaunt fasting bishop of the 15th century, very long pure white beard, hollow cheeks from asceticism, deep determined eyes, wearing a tall purple Greek mandyas, gold mitre with cross, holding a scroll refusing union with Rome, gold halo, gold-leaf background, late Byzantine icon style, head and shoulders"),

    ("st-catherine", "Orthodox icon of Saint Catherine of Alexandria, young noble Egyptian-Greek woman, long flowing dark hair under a white maphorion veil, beautiful serene face, wearing royal purple robe with gold trim, holding an open book of Scripture, broken iron torture wheel visible behind her shoulder, large gold halo, gold-leaf background, Byzantine icon painting, head and shoulders"),

    ("st-george", "Orthodox icon of Saint George the Trophy-bearer, young Roman soldier-saint, handsome youthful face, short chestnut hair, no beard, wearing polished steel mail armor with a centered white cross on red surcoat, holding a long spear, slain dragon visible at his feet in the lower margin, large gold halo, gold-leaf background, Russian Orthodox icon style, head and shoulders"),

    ("st-mary-egypt", "Orthodox icon of Saint Mary of Egypt, ascetic woman after decades in the desert, very dark sun-burned skin, long unkempt black hair partly covering her, gaunt face, simple brown monastic mantle, holding small wooden cross, gold halo, gold-leaf and desert ochre background, traditional Byzantine icon, head and shoulders devotional portrait"),

    ("st-seraphim", "Orthodox icon of Saint Seraphim of Sarov, Russian elder, long flowing pure white beard, kneeling in prayer pose, simple brown monastic habit, holding small wooden cross, divine uncreated golden light radiating outward from his face and around his whole figure, candles in background, large gold halo, traditional Russian Orthodox icon style, head and shoulders"),

    ("centurion", "Painted portrait of a 1st century Roman centurion, weathered hardened soldier face, dark stubble, scar across one cheek, gleaming iron lorica segmentata armor, crimson horsehair plume on his iron helmet, crimson cape, severe untrusting expression, painted in classical Roman fresco style on dark Pompeian red background, head and shoulders portrait"),

    ("marcus", "Painted portrait of a pagan Roman patrician, aristocratic Marcus Verus, dignified middle-aged face, short dark hair, neatly trimmed dark beard, wearing toga praetexta with crimson border draped over white tunic, golden laurel wreath on his head, intense intelligent gaze, painted in classical Pompeian fresco style, niche of household pagan deity statues blurred behind him, head and shoulders portrait"),

    ("arius", "Painted portrait of Arius the heresiarch of Alexandria, gaunt Egyptian presbyter, hollow cheeks from extreme fasting, jet black hair and short pointed black beard, piercing manipulative eyes, wearing dark purple deacon vestments with white sticharion beneath, holding a scroll of his heretical doctrine, painted in dark dramatic chiaroscuro style on shadowy library background, head and shoulders portrait"),

    ("tempter", "Dark fantasy oil painting of a hooded demonic tempter, faceless figure beneath a heavy black cowl, only two glowing red eyes visible inside the shadow of the hood, ethereal purple mist drifting from where the mouth would be, dark cavernous robe blending into surrounding void darkness, faint pentacle smoke wisps, oppressive ominous atmosphere, head and shoulders composition, painted in style of Beksinski"),

    ("eutyches", "Painted portrait of Eutyches the Monophysite archimandrite, very old man, extraordinarily long flowing pure white beard reaching his waist, hollow-eyed gaunt face, wearing tall black monastic klobuk with black veil falling behind, simple black monastic mantle with small gold cross, stubborn fanatical expression, painted in dark Byzantine portrait style, dark monastery cell background, head and shoulders"),

    ("iconoclast", "Painted portrait of Byzantine emperor Constantine V the Iconoclast, severe imperial face, dark hair and short dark beard, wearing the golden stemma crown encrusted with rubies and sapphires with white pearl strings (prependoulia) hanging down beside his cheeks, imperial purple chlamys robe with broad gold loros encrusted with gems across his chest, cold ruthless eyes, holding rolled imperial decree against icons, dark dramatic Byzantine imperial portrait, head and shoulders"),

    ("humbert", "Painted Renaissance portrait of Cardinal Humbert of Silva Candida, 11th century Roman legate, stern arrogant face, tonsured graying hair, clean shaven, wearing the wide red cardinal galero hat with golden tassels hanging at the sides, scarlet crimson cassock with prominent gold pectoral cross on chain, dark Vatican stone background with one candle, painted in style of Italian Renaissance portraiture, head and shoulders"),

    ("pope-eugene", "Painted Renaissance portrait of Pope Eugene IV (Gabriele Condulmer), 15th century Roman pontiff, weary intelligent face with gray stubble, wearing the papal triple tiara (triregnum) of three gold and white crowns encrusted with red rubies and a small gold cross atop, white papal vestments with broad gold and red orphreys, holding the decree of Union of Florence, dark Vatican audience chamber background, painted in style of Italian Renaissance portraiture, head and shoulders"),

    ("nkvd", "Painted portrait of a Soviet NKVD interrogator officer in 1937, cold dispassionate face, neat brown hair, military brown mustache, wearing the gray peaked NKVD cap with red star and red collar tabs, gray-green military tunic with multiple medals and red-and-gold ribbons across his chest, single bulb harsh overhead lighting, painted in Soviet realist style with dark concrete interrogation room background, head and shoulders portrait"),

    ("lds", "Modern digital illustration of a young LDS missionary Elder Williams, friendly clean cut American young man early twenties, side parted brown hair, no facial hair, sincere bright eyes, wearing crisp white dress shirt, dark navy blue tie, missionary black name tag on his chest pocket reading 'Elder Williams', holding a leather Book of Mormon, warm afternoon sunlight on suburban porch background blurred behind him, painted illustration style, head and shoulders"),

    ("reformed", "Modern digital illustration of Sarah Kelley a young female Reformed seminarian, intelligent serious face, cropped short ginger hair, gold-rimmed round glasses, light freckles, wearing dark gray sweater over collared shirt, holding open copy of John Calvin's Institutes of the Christian Religion with two highlighters tucked into the pages, warm cafe background blurred behind her, painted illustration style, head and shoulders"),

    ("atheist", "Modern digital illustration of Alex Chen a thirty year old Asian-American software engineer skeptic, sharp intelligent face, short dark hair, dark stubble, black thick-rimmed glasses, wearing dark gray hoodie, black headphones around his neck, late night blue computer monitor glow illuminating one side of his face, painted illustration style, head and shoulders"),

    ("doubt", "Surreal symbolic dark fantasy oil painting of 'The Doubt', a faceless humanoid shadow figure that resembles the viewer's own silhouette, where eyes should be only two faint distant glowing red points like dying embers, body composed of swirling purple-black smoke and drifting wisps of darkness, void background suggesting endless empty space, oppressive sense of internal emptiness and acedia, painted in style of Zdzislaw Beksinski, head and shoulders composition"),
]


def fetch_image(prompt: str, retries: int = 3) -> bytes:
    body = json.dumps({
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": 1, "aspectRatio": "3:4"},
    }).encode("utf-8")
    last_err = None
    for attempt in range(retries):
        try:
            req = Request(URL, data=body, headers={"Content-Type": "application/json"})
            with urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read())
            preds = data.get("predictions", [])
            if not preds:
                raise RuntimeError(f"no predictions: {data}")
            b64 = preds[0].get("bytesBase64Encoded")
            if not b64:
                raise RuntimeError(f"no image bytes in: {preds[0]}")
            return base64.b64decode(b64)
        except HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")[:300]
            last_err = f"HTTP {e.code}: {err_body}"
            if e.code in (429, 503):
                wait = 5 + attempt * 10
                print(f"    retry in {wait}s ({last_err[:80]})")
                time.sleep(wait)
                continue
            raise RuntimeError(last_err)
        except Exception as e:
            last_err = str(e)
            time.sleep(5)
    raise RuntimeError(f"gave up: {last_err}")


def main():
    targets = sys.argv[1:] if len(sys.argv) > 1 else None
    for i, (cid, prompt) in enumerate(PORTRAITS):
        if targets and cid not in targets:
            continue
        out = OUT_DIR / f"{cid}.png"
        if out.exists() and out.stat().st_size > 50_000 and not targets:
            print(f"[{i+1:2d}/{len(PORTRAITS)}] {cid} — exists, skip")
            continue
        print(f"[{i+1:2d}/{len(PORTRAITS)}] {cid} — generating...")
        try:
            img = fetch_image(prompt)
            out.write_bytes(img)
            print(f"          saved {out} ({len(img)} bytes)")
        except Exception as e:
            print(f"          FAILED: {e}")
        # Small delay to avoid rate limits
        time.sleep(1.0)


if __name__ == "__main__":
    main()
