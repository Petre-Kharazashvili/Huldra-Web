FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your API will run on
EXPOSE 8000

# Command to run the application (assuming FastAPI with uvicorn)
CMD ["uvicorn", "driver:app", "--host", "0.0.0.0", "--port", "8000"]
