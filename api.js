

document.addEventListener('DOMContentLoaded', function() {

    const uploadBtn = document.getElementById('analyzeBtn');

    uploadBtn.addEventListener('click', wrap);

    async function wrap() {
        console.log('wrap-started');  // Debugging log
    
        const imageUrl = "example_pics/example1.jpg";
        const text = document.getElementById('teachersComments').value;
        
        // Wait for the server response
        const response = await sendImageAndText(imageUrl, text);
    
        // Set the server's response inside the div
        document.getElementById("aiAnalysis").innerText = response.report;
        
        console.log('wrap-success'); // Debugging log
    }

    async function sendImageAndText(imageUrl, text) {
        try {
            // Fetch the image as a Blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    
            // Create FormData
            const formData = new FormData();
            formData.append('file', file);  // Correct key
            formData.append('comment', text);  // Correct key
    
            // Send request
            const result = await fetch('http://127.0.0.1:5003/process_image', {
                method: 'POST',
                body: formData
            });
    
            const json = await result.json();
            console.log("DEBUG: Response from server:", json); 
    
            return json;  // 🔹 RETURN the response!
    
        } catch (error) {
            console.error('Error:', error);
            return { report: "Error processing request" }; // 🔹 Return an error response
        }
    }    
});


