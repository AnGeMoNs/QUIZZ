import openpyxl
import json

wb = openpyxl.load_workbook('/Users/angemon/Downloads/Disquizz - Preguntas.xlsx', data_only=True)
sheet = wb['Hoja 1']

quiz_data = []

# Define the blocks based on where categories are found
# block: (category_name, start_col, q_col, alt_cols[])

def extract_block(start_row, num_rows, q_col, alt_cols, category):
    for r in range(start_row, start_row + num_rows):
        q_cell = sheet.cell(row=r, column=q_col)
        if not q_cell.value:
            continue
        
        question = str(q_cell.value).strip()
        options = []
        correct_answer = None
        
        for col in alt_cols:
            cell = sheet.cell(row=r, column=col)
            val = cell.value
            if val is not None:
                options.append(str(val).strip())
                color = cell.fill.start_color.index if cell.fill and cell.fill.start_color else None
                if color == 'FF00FF00':
                    correct_answer = str(val).strip()
        
        if options and correct_answer:
            quiz_data.append({
                "category": category,
                "question": question,
                "options": options,
                "answer": correct_answer
            })


# Row 2 categories
# Música (Col 2), Videojuegos (Col 9), Series/Películas (Col 15)
extract_block(5, 20, 2, [3, 4, 5, 6], 'Música')
extract_block(5, 20, 9, [10, 11, 12, 13], 'Videojuegos')
extract_block(5, 20, 16, [17, 18, 19, 20], 'Series/Películas')

# Row 26 categories
# Cultura general (Col 2), Cultura general DISC/Universidad (Col 9)
extract_block(29, 20, 2, [3, 4, 5, 6], 'Cultura general')
extract_block(29, 20, 9, [10, 11, 12, 13], 'Cultura general DISC/Universidad')

with open('quiz.json', 'w', encoding='utf-8') as f:
    json.dump(quiz_data, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(quiz_data)} questions.")
