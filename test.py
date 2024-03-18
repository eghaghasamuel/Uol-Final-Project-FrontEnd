import os

def print_file_structure(folder_path):
    for root, dirs, files in os.walk(folder_path):
        level = root.replace(folder_path, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print('{}{}/'.format(indent, os.path.basename(root)))
        subindent = ' ' * 4 * (level + 1)
        for file in files:
            print('{}{}'.format(subindent, file))

# Replace '/path/to/your/folder' with the actual path to your folder
folder_path = 'C:\\Users\\oeghagha\\OneDrive - Capgemini\\Documents\\travel application\\client'
print_file_structure(folder_path)