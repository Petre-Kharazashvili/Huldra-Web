import time
from collections import Counter
import google.generativeai as genai

genai.configure(api_key='AIzaSyDSJ_sT88Idp-DfewHnsiNGAiHNgEosi_A')
model = genai.GenerativeModel('gemini-2.5-pro-exp-03-25')

def safe_generate(assessment):
    try:
        response = model.generate_content(
            f"Read this assessment of students and find their most common mistakes in tests:\n{assessment}"
        )
        return response.text
    except Exception as e:
        print(f"Error: {e}")
        print("Retrying in 60 seconds...")
        time.sleep(60)
        return safe_generate(assessment)


