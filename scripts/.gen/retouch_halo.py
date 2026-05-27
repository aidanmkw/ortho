import sys
from PIL import Image, ImageFilter

def is_amber(r,g,b):
    return (r>135 and g>95 and b<160 and r>=g and g>=b-12 and (r-b)>32)

def retouch(cid, region=0.46, passes=5, R=2):
    p=f"public/sprites/{cid}.webp"
    im=Image.open(p).convert("RGBA"); w,h=im.size; ymax=int(h*region)
    total=0
    for _ in range(passes):
        alpha=im.getchannel("A")
        transp=alpha.point(lambda v: 255 if v==0 else 0)
        near=transp.filter(ImageFilter.MaxFilter(2*R+1))  # dilate transparency by R
        px=im.load(); npx=near.load(); kill=0
        for y in range(ymax):
            for x in range(w):
                r,g,b,a=px[x,y]
                if a>0 and npx[x,y]>0 and is_amber(r,g,b):
                    px[x,y]=(r,g,b,0); kill+=1
        total+=kill
        if kill==0: break
    bb=im.getbbox(); 
    if bb: im=im.crop(bb)
    im.save(p,"WEBP",quality=88,method=6)
    print(f"{cid}: removed {total} ring px -> {im.size}")

for cid in sys.argv[1:]:
    retouch(cid)
