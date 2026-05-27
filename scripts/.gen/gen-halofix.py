import json, base64, io, time
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
KEY=Path("/home/user/ortho/.gemini-key").read_text().strip()
URL=f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key={KEY}"
OUT=Path("/home/user/ortho/public/sprites")
VSTYLE=("Full-body character sprite for a visual novel, a VILLAIN ANTAGONIST, dramatic cel-shaded "
 "illustration, sinister, naturalistic, NOT a saint, NOT a religious icon. ABSOLUTELY NO HALO, no nimbus, "
 "no glow, no gold disc or ring, nothing behind the head. Exactly two arms. Centered standing figure head "
 "to feet, isolated on a flat solid magenta background RGB 255 0 255, no frame, no scenery, no floor, no shadow.")
JOBS={
 "eutyches":"Eutyches the heresiarch, a stubborn elderly archimandrite in heavy plain dark monastic robes, a defiant furrowed scowl, clutching a scroll, grey beard.",
 "centurion":"A Roman centurion, a hard-faced soldier in segmented lorica armor with a transverse-crested helmet and a deep red cloak, holding a vine-staff, stern and merciless.",
 "reformed":"A modern Reformed Protestant preacher, a man in a plain dark suit and tie holding a thick black Bible, an earnest severe expression, short neat hair.",
 "lds":"A clean-cut young LDS missionary, a man in a crisp white dress shirt, black tie, and a black name badge, neat side-parted hair, an over-polished smile.",
 "humbert":"Cardinal Humbert of Silva Candida, a haughty 11th-century Latin cardinal in red Western cassock and a wide red galero hat, holding a sealed parchment bull, a cold imperious face.",
}
def keyit(raw):
    img=Image.open(io.BytesIO(raw)).convert("RGBA"); w,h=img.size; px=img.load()
    cs=[px[2,2],px[w-3,2],px[2,h-3],px[w-3,h-3],px[w//2,2],px[2,h//2]]
    bg=tuple(sum(c[i] for c in cs)//len(cs) for i in range(3)); TOL=78**2
    for y in range(h):
      for x in range(w):
        r,g,b,a=px[x,y]
        if (r-bg[0])**2+(g-bg[1])**2+(b-bg[2])**2<TOL: px[x,y]=(r,g,b,0)
    bb=img.getbbox(); return img.crop(bb) if bb else img
for cid,desc in JOBS.items():
    body=json.dumps({"instances":[{"prompt":VSTYLE+" "+desc}],"parameters":{"sampleCount":1,"aspectRatio":"9:16"}}).encode()
    try:
        with urlopen(Request(URL,data=body,headers={"Content-Type":"application/json"}),timeout=200) as r:
            data=json.loads(r.read())
        img=keyit(base64.b64decode(data['predictions'][0]['bytesBase64Encoded']))
        img.thumbnail((500,1100),Image.LANCZOS); img.save(OUT/f"{cid}.webp","WEBP",quality=88,method=6)
        print(f"{cid}: DONE {img.size}", flush=True)
    except Exception as e: print(f"{cid} ERR {str(e)[:70]}", flush=True)
    time.sleep(3)
print("ALL DONE")
