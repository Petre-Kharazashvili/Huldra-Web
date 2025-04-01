import re
import google.generativeai as genai

# Configure API key - use environment variables in production!
genai.configure(api_key='AIzaSyDSJ_sT88Idp-DfewHnsiNGAiHNgEosi_A')


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
        Analyze this homework based on these criteria keep it short and comprehensive:
        CRITERIA: {rubric}
        HOMEWORK: {plain_text}

        {format}
        """


        model = genai.GenerativeModel('gemini-2.5-pro-exp-03-25')
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"Error: {str(e)}"

