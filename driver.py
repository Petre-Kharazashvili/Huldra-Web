import analyze
import preProcessing
from preProcessing import preprocess_image

data="example.jpg"

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
What They Did Well: [list correct items]

Missing Elements: [list missing elements]

Strengths: [highlight the areas where you excelled]

Areas to Improve: [list issues]

Suggestions for Improvement: [give clear and actionable advice on how to tackle these areas]

Things to Focus On: [point out any critical concepts or components that need attention]

Next Steps: [list specific actions or resources that can help them improve]
"""

latex_code=preProcessing.convert_to_TeX(data)
overview=analyze.evaluate_homework(latex_code, "A matrix problem", teacher_repo_individual)
overview2=analyze.evaluate_homework(latex_code, "A matrix problem", student_repo_individual)
print("Teacher:", overview)
#print("Student:", overview2)