import json, base64, io, time
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
KEY=Path("/home/user/ortho/.gemini-key").read_text().strip()
URL=f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key={KEY}"
OUT=Path("/home/user/ortho/public/sprites")
VSTYLE=("Full-body character sprite for a visual novel, a VILLAIN ANTAGONIST, dramatic cel-shaded "
 "illustration, sinister, naturalistic, NOT a saint, NOT a religious icon. ABSOLUTELY NO HALO, no nimbus, "
 "no gold disc or ring, nothing behind the head. Exactly two arms. Centered standing figure head to feet, "
 "isolated on a flat solid magenta background RGB 255 0 255, no frame, no scenery, no floor, no shadow.")
SSTYLE=("Clean cel-shaded flat illustration with bold outlines and gold accents, Byzantine-icon inspired but "
 "a cut-out character sprite, NOT a framed panel icon, no border, no frame, no text, no scenery, no floor, "
 "no shadow. A flat gold disc halo behind the head. Exactly two arms and two hands. Single figure centered, "
 "standing, head to feet, isolated on a flat solid magenta background RGB 255 0 255.")
JOBS=[
 ("arius","V","Arius the heresiarch, a tall gaunt ascetic presbyter in austere dark clerical robes, sharp clever face, thin lips, cold persuasive expression, short dark beard."),
 ("iconoclast","V","A Byzantine iconoclast emperor in military court dress with a small jeweled crown, holding a whitewash brush and a sword, a hard fanatic's face, dark beard."),
 ("stephen-nicomedia","V","Stephen of Nicomedia, a cold 11th-century Byzantine court official-cleric in severe dark formal robes, clean-shaven hard face, grey hair, holding a rolled decree."),
 ("origenist-deacon","V","A 6th-century Origenist heretic deacon in a plain dark slate robe, holding an esoteric scroll, a sly over-clever expression, thin pointed brown beard."),
 ("frankish-archpriest","V","A 9th-century Frankish archpriest, shaved tonsure, austere dark Latin clerical robes, holding a heavy Latin tome, a stern arrogant scowl, clean-shaven."),
 ("monothelite-examiner","V","A 7th-century Byzantine imperial inquisitor-official in opulent dark court robes and a stiff court cap, dark beard, holding the emperor's edict scroll, a cruel glare."),
 ("cyril-methodius","S","Saint Cyril (Constantine the Philosopher), a 9th-century Byzantine missionary monk, a single tonsured monk in dark monastic robes, holding an open Slavonic gospel showing the Glagolitic alphabet, dark beard, devout scholarly face."),
 ("st-mary-egypt","S","Saint Mary of Egypt, an emaciated elderly desert ascetic woman with long thin sun-bleached grey hair, deeply tanned weathered skin, wrapped in a single scant faded grey mantle leaving her thin arms and lower legs bare, gaunt holy face. Exactly two arms."),
]
def is_gold(r,g,b): return (r>150 and g>105 and b<150 and (r-b)>50 and r>=g and (g-b)>20)
def keyit(raw, strip):
    img=Image.open(io.BytesIO(raw)).convert("RGBA"); w,h=img.size; px=img.load()
    cs=[px[2,2],px[w-3,2],px[2,h-3],px[w-3,h-3],px[w//2,2],px[2,h//2]]
    bg=tuple(sum(c[i] for c in cs)//len(cs) for i in range(3)); TOL=78**2
    for y in range(h):
      for x in range(w):
        r,g,b,a=px[x,y]
        if (r-bg[0])**2+(g-bg[1])**2+(b-bg[2])**2<TOL: px[x,y]=(r,g,b,0)
    bb=img.getbbox(); img=img.crop(bb) if bb else img
    if strip:
      w2,h2=img.size; px2=img.load(); cut=int(h2*0.16)
      for y in range(cut):
        for x in range(w2):
          r,g,b,a=px2[x,y]
          if a>0 and is_gold(r,g,b): px2[x,y]=(r,g,b,0)
      bb=img.getbbox(); img=img.crop(bb) if bb else img
    return img
for cid,kind,desc in JOBS:
    style=VSTYLE if kind=="V" else SSTYLE
    body=json.dumps({"instances":[{"prompt":style+" "+desc}],"parameters":{"sampleCount":1,"aspectRatio":"9:16"}}).encode()
    try:
        with urlopen(Request(URL,data=body,headers={"Content-Type":"application/json"}),timeout=200) as r:
            data=json.loads(r.read())
        img=keyit(base64.b64decode(data['predictions'][0]['bytesBase64Encoded']), strip=(kind=="V"))
        img.thumbnail((500,1100),Image.LANCZOS); img.save(OUT/f"{cid}.webp","WEBP",quality=88,method=6)
        print(f"{cid}: DONE {img.size}", flush=True)
    except Exception as e: print(f"{cid} ERR {str(e)[:80]}", flush=True)
    time.sleep(3)
print("ALL DONE")
