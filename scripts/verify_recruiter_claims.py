from pathlib import Path
r=Path(__file__).resolve().parents[1]
files=[r/'resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex',r/'src/data/resume.ts']
for f in files:
    s=f.read_text(encoding='utf-8-sig').lower()
    for forbidden in ['96.15', '40% reduction', '60% detection', '100% of unauthorized', '98.7% success']:
        if forbidden in s:
            raise SystemExit(f'{f.name}: unverified impact claim {forbidden}')
    for verified in ['723','81.91','25 deterministic','240 passed','241 passed','33/33']:
        if verified not in s:
            raise SystemExit(f'{f.name}: missing evidence {verified}')
print('Resume factual guard passed on canonical LaTeX and TypeScript sources')
