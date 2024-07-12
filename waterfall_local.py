import os
import subprocess
import sys
import webbrowser

def generate_html(directory):
    # List of supported image file extensions
    image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']

    # Get the base directory name
    directory_name = os.path.basename(directory)

    # Prepare the HTML content
    html_content = f'''<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Directory listing for {directory_name}/</title>
</head>
<body>
<fieldset>
'''

    # Traverse the directory and add image tags to HTML content
    for filename in sorted(os.listdir(directory)):
        if any(filename.lower().endswith(ext) for ext in image_extensions):
            html_content += f'<br><br><img src="{filename}" width="800"><br><br>\n'

    # Complete the HTML content
    html_content += '''</fieldset>
</body>
</html>
'''

    # Write the HTML content to a file
    html_filename = os.path.join(directory, f'{directory_name}.html')
    with open(html_filename, 'w', encoding='utf-8') as html_file:
        html_file.write(html_content)

    print(f'HTML file "{html_filename}" generated successfully.')

    # Start a local HTTP server in the directory
    http_server_cmd = ["python", "-m", "http.server", "--directory", directory]
    subprocess.Popen(http_server_cmd)

    # Construct the local URL to open in Chrome
    local_url = f'http://localhost:8000/{directory_name}.html'

    # Open in a new Chrome window
    webbrowser.open_new(local_url)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <directory_path>")
        sys.exit(1)

    directory_path = sys.argv[1]

    if not os.path.isdir(directory_path):
        print(f"Error: {directory_path} is not a valid directory.")
        sys.exit(1)

    generate_html(directory_path)
