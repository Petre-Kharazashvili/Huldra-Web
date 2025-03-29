import cv2
from PIL import Image
from paddleocr import PaddleOCR

def preprocess_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
    img = cv2.resize(img, (1024, 768))  # Resize for uniformity
    img = cv2.GaussianBlur(img, (5, 5), 0)
    thresholded_image = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                              cv2.THRESH_BINARY, 11, 2)
    return Image.fromarray(thresholded_image)


preprocessed_img = preprocess_image("images/example.jpg")
preprocessed_img.save("Preprocessed_imgs/processed_text.jpg")

ocr = PaddleOCR(use_angle_cls=True, lang='en')
image_path = 'Preprocessed_imgs/processed_text.jpg'
result = ocr.ocr(image_path, cls=True)

for line in result:
    print([word_info[1][0] for word_info in line])


