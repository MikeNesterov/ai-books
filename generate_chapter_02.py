#!/usr/bin/env python3
"""
Скрипт для генерации PDF второй главы комикса.
"""

import os
import re
from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Setup paths - используем относительные пути от расположения скрипта
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.join(SCRIPT_DIR, "Главы", "Глава 02")
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "Chapter_02.pdf")

# Chapter info
CHAPTER_TITLE = "Глава 2: Первый бой"
PAGES = range(1, 8)  # 7 страниц

def get_text_content(file_path):
    if not os.path.exists(file_path):
        return "Текст не найден."

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract text from "## Текст (Левая страница)" section
    pattern = r"## Текст \(Левая страница\)\s+(.*?)(?=\n##|\Z)"
    match = re.search(pattern, content, re.DOTALL)

    if match:
        return match.group(1).strip()
    return "Секция текста не найдена."

def wrap_text(text, width, canvas_obj, font_name, font_size):
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
            line_width = canvas_obj.stringWidth(' '.join(current_line), font_name, font_size)
            if line_width > width:
                current_line.pop()
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]

        if current_line:
            lines.append(' '.join(current_line))
    return lines

def find_font():
    """Поиск шрифта с поддержкой кириллицы"""
    font_paths = [
        # Mac
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        # Linux
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        # Fallback
        "/usr/share/fonts/TTF/DejaVuSans.ttf",
    ]

    for path in font_paths:
        if os.path.exists(path):
            return path
    return None

def create_pdf():
    c = canvas.Canvas(OUTPUT_FILE, pagesize=landscape(A4))
    width, height = landscape(A4)

    # Find and register font
    font_path = find_font()
    if font_path:
        try:
            pdfmetrics.registerFont(TTFont('CustomFont', font_path))
            font_name = 'CustomFont'
            print(f"Using font: {font_path}")
        except Exception as e:
            print(f"Font registration failed: {e}")
            font_name = 'Helvetica'
    else:
        font_name = 'Helvetica'
        print("Warning: No Cyrillic font found, using Helvetica")

    # Title Page
    c.setFont(font_name, 36)
    c.drawCentredString(width / 2, height / 2, CHAPTER_TITLE)
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
            image_path = None

        # Layout settings
        margin_x = 40
        margin_y_top = 50
        margin_y_bottom = 50
        gap = 30

        # Draw text on left side
        font_size = 12
        c.setFont(font_name, font_size)
        text_x = margin_x
        text_y = height - margin_y_top
        text_width = (width / 2) - margin_x - (gap / 2)

        wrapped_lines = wrap_text(text_content, text_width, c, font_name, font_size)

        for line in wrapped_lines:
            if text_y < margin_y_bottom:
                print(f"Warning: Text on page {page_num} truncated due to length.")
                break
            c.drawString(text_x, text_y, line)
            text_y -= 18  # Line height

        # Draw image on right side
        if image_path:
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
            center_y = img_y + img_h / 2
            draw_y = center_y - new_h / 2

            c.drawImage(image_path, img_x, draw_y, width=new_w, height=new_h)

        # Page Number
        c.setFont(font_name, 10)
        c.drawCentredString(width / 2, 20, f"Страница {page_num}")

        c.showPage()

    c.save()
    print(f"PDF saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    create_pdf()
