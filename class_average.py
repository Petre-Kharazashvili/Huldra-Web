from collections import Counter
import google.generativeai as genai



genai.configure(api_key='AIzaSyB1Y0YHh0gYt_wtLfvtJofHwctfYodAcGA')
model = genai.GenerativeModel('gemini-1.5-pro-latest')

def analyze_common_issues(assessments):
    """Extract only common issues from student assessments"""
    issues = []
    # Extract issues from each assessment
    response = model.generate_content(
        f"List ONLY the specific errors in this assessment give detail explanation to why they made the mistake:\n{assessments}"
    )
    issues.extend(response.text.strip().split("\n"))

    # Count and rank issues
    issue_counts = Counter(filter(None, issues))  # Remove empty lines
    top_issues = issue_counts.most_common(5)

    # Format output
    report = "Most Common Issues:\n" + "\n".join(
        f"{i + 1}. {issue} ({count} students)"
        for i, (issue, count) in enumerate(top_issues)
    )
    return report