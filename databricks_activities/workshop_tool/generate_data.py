from __future__ import annotations

import html
import json
import re
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
GLOSSARY_PATH = ROOT / "RACI_V2.3_Glossary.md"
PPTX_PATH = ROOT / "RACI_Matrix_V2.3.1_Filled_In.pptx"
OUTPUT_PATH = Path(__file__).resolve().parent / "workshop-data.js"

ROLE_CODES = {"R", "A", "R/A", "C", "I", "–"}
PILLARS = {
    "EBT": {
        "name": "Enterprise Business Technology",
        "summary": "Builds and runs business-facing data and AI platforms, standards, and enablement services.",
    },
    "EET": {
        "name": "Enterprise Enabling Technology",
        "summary": "Owns foundational infrastructure, identity, networking, and enterprise engineering controls.",
    },
    "DMO": {
        "name": "Data Management Office",
        "summary": "Owns data governance, policy, classification, entitlements, and control frameworks.",
    },
    "BU": {
        "name": "Business Units",
        "summary": "Own the domain use cases, steward their data, run domain workloads, and carry business outcomes.",
    },
}


def normalize_activity_name(value: str) -> str:
    value = html.unescape(value)
    value = value.lower()
    value = value.replace("→", "to")
    value = value.replace("—", "-")
    value = value.replace("&", "and")
    value = re.sub(r"[(){}\[\],.:;/]", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def clean_markdown(value: str) -> str:
    value = value.replace("**", "")
    value = value.replace("*", "")
    value = value.replace("`", "")
    return value.strip()


def parse_glossary() -> list[dict]:
    text = GLOSSARY_PATH.read_text(encoding="utf-8")
    lines = text.splitlines()

    sections: list[dict] = []
    current_section: dict | None = None
    current_activity: dict | None = None
    buffer: list[str] = []

    def flush_activity() -> None:
        nonlocal buffer, current_activity
        if not current_activity:
            return
        paragraphs: list[str] = []
        paragraph_lines: list[str] = []
        for raw_line in buffer:
            line = raw_line.strip()
            if not line or line == "---":
                if paragraph_lines:
                    paragraphs.append(" ".join(paragraph_lines).strip())
                    paragraph_lines = []
                continue
            paragraph_lines.append(line)
        if paragraph_lines:
            paragraphs.append(" ".join(paragraph_lines).strip())

        current_activity["definition"] = clean_markdown("\n\n".join(paragraphs).strip())
        current_activity["summary"] = clean_markdown(paragraphs[0]) if paragraphs else ""
        current_activity["key_points"] = [clean_markdown(paragraph) for paragraph in paragraphs[1:]]
        buffer = []
        current_activity = None

    for line in lines:
        if line.startswith("## §"):
            flush_activity()
            title = line[3:].strip()
            current_section = {"title": title, "activities": []}
            sections.append(current_section)
            continue
        if line.startswith("### "):
            flush_activity()
            if current_section is None:
                continue
            title = line[4:].strip()
            current_activity = {"title": title}
            current_section["activities"].append(current_activity)
            continue
        if current_activity is not None:
            buffer.append(line)

    flush_activity()
    return sections


def slide_sort_key(name: str) -> int:
    match = re.search(r"slide(\d+)\.xml", name)
    return int(match.group(1)) if match else 0


def parse_pptx_raci() -> dict[str, dict[str, str]]:
    activity_map: dict[str, dict[str, str]] = {}

    with zipfile.ZipFile(PPTX_PATH) as archive:
        slide_names = sorted(
            [name for name in archive.namelist() if name.startswith("ppt/slides/slide") and name.endswith(".xml")],
            key=slide_sort_key,
        )

        for slide_name in slide_names:
            xml_text = archive.read(slide_name).decode("utf-8")
            text_items = [html.unescape(match) for match in re.findall(r"<a:t>(.*?)</a:t>", xml_text)]
            if "Pre-populated RACI — review and challenge" not in text_items:
                continue

            try:
                start_index = text_items.index("BU") + 1
            except ValueError:
                continue

            data_items = [item.strip() for item in text_items[start_index:] if item.strip()]
            for index in range(0, len(data_items), 5):
                row = data_items[index : index + 5]
                if len(row) < 5:
                    continue
                activity, ebt, eet, dmo, bu = row
                if {ebt, eet, dmo, bu}.issubset(ROLE_CODES):
                    activity_map[normalize_activity_name(activity)] = {
                        "EBT": ebt,
                        "EET": eet,
                        "DMO": dmo,
                        "BU": bu,
                    }

    return activity_map


def build_payload() -> dict:
    sections = parse_glossary()
    raci_map = parse_pptx_raci()
    activities: list[dict] = []

    for section in sections:
        for activity in section["activities"]:
            key = normalize_activity_name(activity["title"])
            activities.append(
                {
                    "id": key.replace(" ", "-"),
                    "section": section["title"],
                    "title": activity["title"],
                    "definition": activity["definition"],
                    "summary": activity["summary"],
                    "keyPoints": activity["key_points"],
                    "defaultRaci": raci_map.get(key, {"EBT": "–", "EET": "–", "DMO": "–", "BU": "–"}),
                }
            )

    return {
        "title": "Databricks RACI Workshop Assistant",
        "subtitle": "Interactive discussion tool for reviewing the pre-filled RACI against the glossary definitions.",
        "pillars": PILLARS,
        "sections": [section["title"] for section in sections],
        "activities": activities,
        "generatedFrom": {
            "glossary": GLOSSARY_PATH.name,
            "presentation": PPTX_PATH.name,
        },
    }


def main() -> None:
    payload = build_payload()
    OUTPUT_PATH.write_text(
        "window.WORKSHOP_DATA = " + json.dumps(payload, indent=2, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
