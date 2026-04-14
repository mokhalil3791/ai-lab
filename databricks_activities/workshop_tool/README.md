# Databricks Activity Explorer

Static local web tool for teaching the Databricks activity model from the RACI glossary in a more audience-friendly way.

## What it does

- turns the glossary into a visual learning experience
- groups activities into themes like platform setup, governance, operations, security, and enablement
- lets the audience browse activities with section, theme, and lead-pillar filters
- explains each activity in plain language with workshop talking points
- includes an interactive accountability quiz for live sessions

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
