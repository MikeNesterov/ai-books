
import os
import re
from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Setup paths
BASE_DIR = "/Users/michaelnesterov/Documents/ivan comics/Главы/Глава 01"
OUTPUT_FILE = "/Users/michaelnesterov/Documents/ivan comics/Chapter_01.pdf"

# Page range
PAGES = range(1, 9)

def get_text_content(file_path):
    if not os.path.exists(file_path):
        return "Текст не найден."
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract text from "## Текст (Левая страница)" section
    # Matches everything until the next header starting with ##
    pattern = r"## Текст \(Левая страница\)\s+(.*?)(?=\n##|\Z)"
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        return match.group(1).strip()
    return "Секция текста не найдена."

def wrap_text(text, width, canvas_obj):
    """Simple word wrapper"""
    lines = []
    for paragraph in text.split('\n'):
        if not paragraph.strip():
            lines.append("")
            continue
            
        words = paragraph.split()
        current_line = []
        
        for word in words:
            current_line.append(word)
            line_width = canvas_obj.stringWidth(' '.join(current_line), 'Helvetica', 12)
            if line_width > width:
                current_line.pop()
                lines.append(' '.join(current_line))
                current_line = [word]
        
        lines.append(' '.join(current_line))
    return lines

def create_pdf():
    c = canvas.Canvas(OUTPUT_FILE, pagesize=landscape(A4))
    width, height = landscape(A4)
    
    # Register a font (using default Helvetica for now due to lack of custom font file, 
    # but ideally we would check for a Cyrillic supporting font)
    # Using a standard font that usually supports basic Cyrillic or falling back relies on system.
    # Actually, standard PDF fonts like Helvetica often don't support Cyrillic well.
    # Let's try to assume system availability or use a safe fallback if possible.
    # For this environment, we might need a TTF for Cyrillic. 
    # Since I don't have a guaranteed TTF path, I will try to use a standard font but 
    # if chars are missing, I might need to find a font.
    # Let's proceed with standard font first. If text is garbled, I'll need to find a font.
    # WAIT: Standard PDF fonts usually do NOT support Cyrillic. 
    # I should check if there is a font available. 
    # I'll try to find Arial or similar on the mac system.
    
    font_path = "/System/Library/Fonts/Supplemental/Arial.ttf"
    if os.path.exists(font_path):
        pdfmetrics.registerFont(TTFont('Arial', font_path))
        font_name = 'Arial'
    else:
        # Fallback to Helvetica and hope for the best (likely boxes for Cyrillic)
        # Update: Mac usually has fonts. Let's try another common path if Arial isn't there.
        font_path = "/System/Library/Fonts/Helvetica.ttc" # Often requires reading ttc index
        # Let's stick to Arial as primary attempt.
        font_name = 'Helvetica'

    # Title Page
    c.setFont(font_name, 36)
    title = "Глава 1: Пробуждение Силы"
    c.drawCentredString(width / 2, height / 2, title)
    c.showPage()

    for page_num in PAGES:
        page_dir_name = f"Страница {page_num:02d}"
        page_dir = os.path.join(BASE_DIR, page_dir_name)
        
        if not os.path.exists(page_dir):
            print(f"Directory not found: {page_dir}")
            continue
            
        # Get Text
        scenario_path = os.path.join(page_dir, "сценарий.md")
        text_content = get_text_content(scenario_path)
        
        # Get Image
        image_path = os.path.join(page_dir, "render.png")
        if not os.path.exists(image_path):
            image_path = os.path.join(page_dir, "рендер.png")
            
        if not os.path.exists(image_path):
            print(f"Image not found for page {page_num}")
            # Use placeholder?
            image_path = None

        # Draw content
        # Left side: Text
        # Adjusted layout for wider text column
        margin_x = 40
        margin_y_top = 50
        margin_y_bottom = 50
        gap = 30 # Gap between text and center/image
        
        c.setFont(font_name, 12)
        text_x = margin_x
        text_y = height - margin_y_top
        
        # Give text slightly more than half width minus margins if needed, 
        # but sticking to left half for now, just reducing internal padding.
        # Original was (width/2) - 100.
        # Let's use (width/2) - margin_x - gap/2
        text_width = (width / 2) - margin_x - (gap / 2)
        
        wrapped_lines = wrap_text(text_content, text_width, c)
        
        for line in wrapped_lines:
            if text_y < margin_y_bottom:
                print(f"Warning: Text on page {page_num} truncated due to length.")
                break
            c.drawString(text_x, text_y, line)
            text_y -= 15 # Line height
            
        # Right side: Image
        if image_path:
            # Fit image to the right half
            img_x = (width / 2) + (gap / 2)
            img_y = margin_y_bottom
            img_w = (width / 2) - margin_x - (gap / 2)
            img_h = height - (margin_y_top + margin_y_bottom)
            
            # Maintain aspect ratio
            img = ImageReader(image_path)
            orig_w, orig_h = img.getSize()
            ratio = min(img_w/orig_w, img_h/orig_h)
            new_w = orig_w * ratio
            new_h = orig_h * ratio
            
            # Center vertically
            # Calculate vertical center of the available image area
            center_y = img_y + img_h / 2
            draw_y = center_y - new_h / 2
            
            # If image is smaller than area, centering is good.
            c.drawImage(image_path, img_x, draw_y, width=new_w, height=new_h)
            
        # Page Layout Lines 
        # c.line(width/2, 0, width/2, height) # Center divider
        
        # Page Number
        c.setFont(font_name, 10)
        c.drawCentredString(width / 2, 20, f"Страница {page_num}")
        
        c.showPage()
        
    c.save()
    print(f"PDF saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    create_pdf()
