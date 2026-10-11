from pathlib import Path
import json,sys
root=Path(__file__).resolve().parent
missing=[];bad=[];total=0
for folder,locale in [('english-speaking','en-US'),('vietnamese','vi-VN')]:
 m=json.loads((root/folder/'audio-manifest.json').read_text())[locale]
 for text,rel in m.items():
  total+=1;p=root/folder/rel
  if not p.is_file():missing.append((folder,text,rel))
  elif p.stat().st_size<1024 or not (p.read_bytes()[:3]==b'ID3' or p.read_bytes()[:2] in [b'\xff\xfb',b'\xff\xf3',b'\xff\xf2']):bad.append((folder,text,rel))
print(f'References: {total} | Missing: {len(missing)} | Invalid: {len(bad)}')
for item in (missing+bad)[:20]:print(' -',item)
sys.exit(bool(missing or bad))
