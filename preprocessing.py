import json
import requests
import base64
import cv2
import numpy as np
from PIL import Image

def preprocess_image(image_path):
    img = image_path
    img = cv2.resize(np.array(img), (1024, 768))  # Resize for uniformity
    img = cv2.GaussianBlur(img, (5, 5), 0)
    thresholded_image = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                              cv2.THRESH_BINARY, 11, 2)
    return thresholded_image

# Set up your Mathpix API credentials
app_id = 'test_08ff6f_d2ac32'         # Replace with your Mathpix App ID
app_key = '3269ed9eea01b2c926c1991a65ac2988d8f1a5934a6938448622f81780b6ff18'  # Replace with your Mathpix App Key


# The URL for the Mathpix API endpoint
url = 'https://api.mathpix.com/v3/text'


# Open the image file and prepare the POST request
def convert_to_TeX(image_path):

    ready_image=preprocess_image(image_path)

    # Prepare the HTTP headers
    headers = {
        'app_id': app_id,
        'app_key': app_key,
        'Content-type': 'application/json'
    }

    # Prepare the JSON payload with base64 encoding
    _, buffer = cv2.imencode('.png', ready_image)
    png_bytes = buffer.tobytes()

    # Now encode to base64
    base64_image = base64.b64encode(png_bytes).decode('utf-8')

    payload = {
        'src': f'data:image/png;base64,{base64_image}',
        'formats': ['latex'],  # Specify the desired output format
    }
    # Make the POST request
    response = requests.post(url, headers=headers, json=payload)

    # Ensure the request was successful
    if response.status_code == 200:
        # Extract the JSON content
        response_data = response.json()

        # Access the 'text' key to get the LaTeX code
        latex_code = response_data['text']
        return latex_code
    else:
        print(f"Error: {response.status_code} - {response.text}")
