# Databricks RACI Workshop Assistant

Static local workshop tool for reviewing the Databricks activity glossary alongside the pre-filled RACI matrix.

## What it does

- shows all glossary activities in one interactive matrix
- lets participants review or override the suggested RACI
- explains each activity in plain language
- gives discussion prompts for workshop facilitation
- exports the workshop result to CSV

## Source of truth

- `../RACI_V2.3_Glossary.md`
- `../RACI_Matrix_V2.3.1_Filled_In.pptx`

## Regenerate data

```powershell
cd D:\Dev\personal\ai-lab\databricks_activities\workshop_tool
python generate_data.py
```

## Open the tool

Open [index.html](d:/Dev/personal/ai-lab/databricks_activities/workshop_tool/index.html:1) in your browser.

If you want to serve it locally instead of opening the file directly:

```powershell
cd D:\Dev\personal\ai-lab\databricks_activities\workshop_tool
python -m http.server 8010
```

Then browse to `http://127.0.0.1:8010`.
