#!/usr/bin/env python3
"""Generate prerecorded MP3s from the exact texts in the shipped manifests.
Run from this package root: python3 -m pip install edge-tts; python3 generate_mp3.py
Requires Internet. Review provider terms before publishing commercial content.
"""
import asyncio,json,sys,os
from pathlib import Path
try: import edge_tts
except ImportError: sys.exit('Install first: python3 -m pip install edge-tts')
ROOT=Path(__file__).resolve().parent
VOICES={'en-US':'en-US-JennyNeural','vi-VN':'vi-VN-HoaiMyNeural'}
async def main():
 sem=asyncio.Semaphore(2)
 jobs=[]
 for folder,locale in [('english-speaking','en-US'),('vietnamese','vi-VN')]:
  data=json.loads((ROOT/folder/'audio-manifest.json').read_text())
  for text,rel in data[locale].items():
   output=ROOT/folder/rel
   if output.exists() and output.stat().st_size>1024:continue
   jobs.append((text,output,VOICES[locale]))
 print(f'Generating {len(jobs)} MP3 files. This may take time.')
 failed=[]
 async def one(text,path,voice):
  async with sem:
   path.parent.mkdir(parents=True,exist_ok=True)
   for attempt in range(3):
    try:
     await edge_tts.Communicate(text,voice,rate='-10%').save(str(path))
     if path.stat().st_size<1024:raise RuntimeError('Empty/short MP3')
     return
    except Exception as ex:
     if path.exists():path.unlink()
     if attempt==2:failed.append((text,str(ex)))
     else:await asyncio.sleep(2*(attempt+1))
 await asyncio.gather(*(one(*j) for j in jobs))
 print(f'Generated {len(jobs)-len(failed)}; failed {len(failed)}')
 if failed:
  (ROOT/'generation-errors.json').write_text(json.dumps(failed,ensure_ascii=False,indent=2))
  sys.exit(1)
if __name__=='__main__':asyncio.run(main())
