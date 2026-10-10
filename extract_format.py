import openpyxl

wb = openpyxl.load_workbook('/Users/angemon/Downloads/Disquizz - Preguntas.xlsx', data_only=True)
sheet = wb['Hoja 1']

for row in sheet.iter_rows(min_row=1, max_row=30):
    for cell in row:
        if cell.value:
            is_bold = cell.font.bold if cell.font else False
            color = cell.fill.start_color.index if cell.fill and cell.fill.start_color else None
            if is_bold or (color and color != '00000000'):
                print(f"Cell {cell.coordinate}: '{cell.value}' - Bold: {is_bold}, Color: {color}")
