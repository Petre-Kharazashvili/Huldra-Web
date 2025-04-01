from typing import List

import analyze
import class_average
import preProcessing
from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from io import BytesIO
from PIL import Image
import json
from fastapi.middleware.cors import CORSMiddleware


teacher_repo_individual = """
Provide feedback in this format and keep it very short:

Is it correct?: Yes/No

Missing: [list missing elements]

Correct: [list correct items]

Strengths: [highlight areas where the student excelled]

Needs Improvement: [list issues]

Areas for Growth: [suggest specific improvements or approaches to address the issues]

Critical Gaps: [point out any crucial missing concepts or components that need attention]

Suggestions for Improvement: [list actionable advice, resources, or methods for improvement]
"""

student_repo_individual="""
Provide feedback in this format:

Is it correct?: Yes/No

What They Did Well: [list correct items]

Missing Elements: [list missing elements]

Strengths: [highlight the areas where you excelled]

Areas to Improve: [list issues]

Suggestions for Improvement: [give clear and actionable advice on how to tackle these areas]

Things to Focus On: [point out any critical concepts or components that need attention]

Next Steps: [list specific actions or resources that can help them improve]
"""

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change this to specific origins in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/process_image")
async def process_image(
    file: UploadFile = File(...),  # Required image file
    comment: str = Form(None),     # Optional string 1
):
    try:
        # Read the uploaded image
        image_bytes = await file.read()
        image = Image.open(BytesIO(image_bytes))

        # Example image processing: Convert to grayscale
        gray_image = image.convert("L")
        latex_code=preProcessing.convert_to_TeX(gray_image)
        report=analyze.evaluate_homework(latex_code, "Evaluate how correct the work is, never use latex code in your responses.", teacher_repo_individual)
        report = report.replace("\n", "\\n").replace('"', '\\"')
        print("DEBUG: report =", report)  # Check if this is a non-empty string

        if not report:
            raise ValueError("Report is empty or None")

        return {"report":report}

    except Exception as e:
        return {"message": f"Error processing image: {str(e)}"}


from fastapi import Request
import json

@app.post("/community")
async def process(request: Request):
    try:
        raw_body = await request.body()
        data = json.loads(raw_body)
        string_array = data["string_array"]  # Manual extraction
        single_string = ", ".join(string_array)
        report = class_average.safe_generate(single_string)
        return {"report": report}
    except Exception as e:
        return {"error": str(e), "received_data": data}
