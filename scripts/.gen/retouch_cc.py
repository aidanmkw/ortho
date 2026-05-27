import sys
from collections import deque
from PIL import Image

def retouch(cid, region=0.40, dryrun=False):
    p=f"public/sprites/{cid}.webp"
    im=Image.open(p).convert("RGBA"); w,h=im.size; px=im.load()
    opaque=[[px[x,y][3]>40 for x in range(w)] for y in range(h)]
    seen=[[False]*w for _ in range(h)]
    # seed: scan a band at 60-80% height, center, for an opaque pixel (torso)
    seed=None
    for y in range(int(h*0.6),int(h*0.8)):
        for x in range(int(w*0.3),int(w*0.7)):
            if opaque[y][x]: seed=(x,y); break
        if seed: break
    if not seed: print(f"{cid}: no seed"); return
    q=deque([seed]); seen[seed[1]][seed[0]]=True
    while q:
        x,y=q.popleft()
        for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx,ny=x+dx,y+dy
            if 0<=nx<w and 0<=ny<h and opaque[ny][nx] and not seen[ny][nx]:
                seen[ny][nx]=True; q.append((nx,ny))
    # remove opaque pixels NOT connected to the figure, in the top region
    ymax=int(h*region); n=0
    for y in range(ymax):
        for x in range(w):
            if opaque[y][x] and not seen[y][x]:
                if not dryrun:
                    r,g,b,a=px[x,y]; px[x,y]=(r,g,b,0)
                n+=1
    print(f"{cid}: disconnected top-region px = {n}{' (dry run)' if dryrun else ' removed'}")
    if not dryrun:
        bb=im.getbbox(); im=im.crop(bb) if bb else im; im.save(p,"WEBP",quality=88,method=6)

dry = "--dry" in sys.argv
for cid in [a for a in sys.argv[1:] if not a.startswith("--")]:
    retouch(cid, dryrun=dry)
