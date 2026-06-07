import zipfile
import xml.etree.ElementTree as ET
import os

def docx_hyperlinks(docx_path):
    if not os.path.exists(docx_path):
        print(f"File not found: {docx_path}")
        return {}
        
    try:
        with zipfile.ZipFile(docx_path) as docx:
            # Read relationship file
            rels_xml = docx.read('word/_rels/document.xml.rels')
            rels_root = ET.fromstring(rels_xml)
            
            # Map relationship ID to target URL
            id_to_url = {}
            for rel in rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                r_id = rel.get('Id')
                target = rel.get('Target')
                type_ = rel.get('Type')
                if "hyperlink" in type_:
                    id_to_url[r_id] = target
                    
            # Now parse document.xml to match text with relationship ID
            doc_xml = docx.read('word/document.xml')
            doc_root = ET.fromstring(doc_xml)
            
            namespaces = {
                'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
                'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
            }
            
            hyperlinks = []
            for h in doc_root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hyperlink'):
                r_id = h.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                texts = [t.text for t in h.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
                text = "".join(texts)
                url = id_to_url.get(r_id, "Unknown URL")
                hyperlinks.append((text, url))
                
            return hyperlinks
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    doc_path = "/Users/barretlin/GitProjects/Tour/1.docx"
    links = docx_hyperlinks(doc_path)
    for text, url in links:
        print(f"[{text}] -> {url}")
