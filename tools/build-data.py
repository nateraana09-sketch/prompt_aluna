"""Regenera el recurso JS local desde content.json, sin dependencias."""
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
data = json.loads((root/'assets/data/content.json').read_text(encoding='utf-8'))
(root/'assets/data/content.js').write_text(
    '/* Generado desde content.json por tools/build-data.py. */\nwindow.ALUNA = '+
    json.dumps(data, ensure_ascii=False, indent=2)+';\n', encoding='utf-8')
print('Datos locales regenerados.')
