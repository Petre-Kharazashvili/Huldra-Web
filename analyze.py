import re
import google.generativeai as genai
from pathlib import Path

import preProcessing

# Configure API key - use environment variables in production!
genai.configure(api_key='AIzaSyB1Y0YHh0gYt_wtLfvtJofHwctfYodAcGA')


def latex_to_text(latex_str):
    """Convert LaTeX content to plain text."""
    latex_str = re.sub(r'\\(begin|end)\{.*?\}', '', latex_str)
    latex_str = re.sub(r'\\[a-zA-Z]+\?(?:\[[^\]]\])?(?:\{.*?\})?', '', latex_str)
    latex_str = re.sub(r'\%.*', '', latex_str)
    latex_str = re.sub(r'\$\$(.*?)\$\$', r'\1', latex_str)
    latex_str = re.sub(r'\$(.*?)\$', r'\1', latex_str)
    return latex_str.strip()


def evaluate_homework(latex_text, rubric, format):
    """Evaluate homework using Gemini AI."""
    try:
        plain_text = latex_to_text(latex_text)

        # Create prompt
        prompt = f"""
        Analyze this homework based on these criteria:
        CRITERIA: {rubric}
        HOMEWORK: {plain_text}

        {format}
        """


        model = genai.GenerativeModel('gemini-1.5-pro-latest')
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"Error: {str(e)}"

