import zipfile
import xml.etree.ElementTree as ET
import os

def docx_to_text(docx_path):
    # Namespace mapping
    namespaces = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    
    if not os.path.exists(docx_path):
        print(f"File not found: {docx_path}")
        return ""
        
    try:
        with zipfile.ZipFile(docx_path) as docx:
            # Read document.xml
            doc_xml = docx.read('word/document.xml')
            root = ET.fromstring(doc_xml)
            
            paragraphs = []
            for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = [node.text for node in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
                if texts:
                    paragraphs.append("".join(texts))
                else:
                    # Keep empty line if it's empty paragraph for formatting
                    paragraphs.append("")
            
            return "\n".join(paragraphs)
    except Exception as e:
        print(f"Error reading docx: {e}")
        return ""

if __name__ == "__main__":
    doc_path = "/Users/barretlin/GitProjects/Tour/1.docx"
    text = docx_to_text(doc_path)
    # Save output to a text file for inspection
    out_path = "/Users/barretlin/GitProjects/Tour/scratch/docx_extracted.txt"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Extracted {len(text)} characters to {out_path}")
