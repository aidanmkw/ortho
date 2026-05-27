import sys
from PIL import Image

def is_amber(px): 
    r,g,b,a=px
    return a>0 and r>135 and g>95 and b<160 and r>=g and g>=b-12 and (r-b)>32

def retouch(cid, region=0.34, maxThick=7):
    p=f"public/sprites/{cid}.webp"
    im=Image.open(p).convert("RGBA"); w,h=im.size; px=im.load()
    ymax=int(h*region)
    # amber boolean grid for the region
    amb=[[is_amber(px[x,y]) for x in range(w)] for y in range(ymax)]
    def run(x0,y0,dx,dy):
        # distance until non-amber (or edge), capped
        d=0; x,y=x0,y0
        while 0<=x<w and 0<=y<ymax and amb[y][x] and d<=maxThick+1:
            d+=1; x+=dx; y+=dy
        return d
    kill=[]
    for y in range(ymax):
        for x in range(w):
            if not amb[y][x]: continue
            hthk=run(x,y,-1,0)+run(x,y,1,0)-1
            vthk=run(x,y,0,-1)+run(x,y,0,1)-1
            if min(hthk,vthk)<=maxThick:
                kill.append((x,y))
    for x,y in kill: 
        r,g,b,a=px[x,y]; px[x,y]=(r,g,b,0)
    bb=im.getbbox(); 
    if bb: im=im.crop(bb)
    im.save(p,"WEBP",quality=88,method=6)
    print(f"{cid}: removed {len(kill)} thin-amber px -> {im.size}")

for cid in sys.argv[1:]: retouch(cid)
