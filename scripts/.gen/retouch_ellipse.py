import sys, json
from PIL import Image
def is_amber(px):
    r,g,b,a=px
    return a>0 and r>135 and g>95 and b<165 and r>=g-5 and (r-b)>30
def retouch(cid, cx, cy, rx, ry, ymax_frac, outer=None):
    p=f"public/sprites/{cid}.webp"
    im=Image.open(p).convert("RGBA"); w,h=im.size; px=im.load()
    ymax=int(h*ymax_frac); n=0
    for y in range(ymax):
        for x in range(w):
            r,g,b,a=px[x,y]
            if a==0 or not is_amber((r,g,b,a)): continue
            # ellipse test: inside face core -> KEEP
            ex=((x-cx)/rx)**2 + ((y-cy)/ry)**2
            if ex<=1.0: continue  # protect the face/head core
            if outer is not None:
                d2=((x-cx)/outer)**2+((y-cy)/outer)**2
                if d2>1.0: continue  # beyond halo -> leave (avoid other gold)
            px[x,y]=(r,g,b,0); n+=1
    bb=im.getbbox(); im=im.crop(bb) if bb else im
    im.save(p,"WEBP",quality=88,method=6); print(f"{cid}: removed {n} -> {im.size}")
# params: cid cx cy rx ry ymaxfrac [outer]
a=sys.argv[1:]
retouch(a[0], int(a[1]),int(a[2]),int(a[3]),int(a[4]),float(a[5]), int(a[6]) if len(a)>6 else None)
