document.addEventListener('DOMContentLoaded', function() {
    // Initialize tests data
    let testsData = JSON.parse(localStorage.getItem('testsData')) || [
        {
            id: 1,
            testName: "Algebra Midterm",
            assignedDate: "2023-10-15",
            dueDate: "2023-10-30",
            status: "Assigned",
            averageScore: "78.5",
            testOverview: "Algebra basics",
            additionalDetails: "Covered linear equations and quadratic functions with geometric applications.",
            teachersComments: "Good work on quadratic equations, but need more practice on geometry proofs.",
            aiAnalysis: "The student shows strong algebraic skills but struggles with geometric visualization."
        },

        {
            id: 1,
            testName: "Algebra Midterm",
            assignedDate: "2023-10-15",
            dueDate: "2023-10-30",
            status: "Assigned",
            averageScore: "78.5",
            testOverview: "Algebra basics",
            additionalDetails: "Covered linear equations and quadratic functions with geometric applications."
        },
        {
            id: 2,
            testName: "Literature Essay",
            assignedDate: "2023-11-01",
            dueDate: "2023-11-15",
            status: "In Progress",
            averageScore: "-",
            testOverview: "Shakespeare analysis",
            additionalDetails: "Focused on sonnet analysis with emphasis on poetic devices and historical context."
        },
        {
            id: 3,
            testName: "Name",
            assignedDate: "2025-03-29",
            dueDate: "2025-03-29",
            status: "Assigned",
            averageScore: "-",
            testOverview: "",
            additionalDetails: ""
        }
    ];


    function showTestPopup(testId) {
        const popup = document.getElementById('testPopupOverlay');
        const test = testsData.find(t => t.id == testId) || {};
        
        // Set the test image
        const testImage = document.getElementById('popupTestImage');
        testImage.src = "example_pics/example1.jpg"
        testImage.alt = test.testName || 'Test Image';
        
        // Set comments
        document.getElementById('teachersComments').innerHTML = 
            test.teachersComments || 'No teacher comments available';
        
        document.getElementById('aiAnalysis').innerHTML = 
            test.aiAnalysis || 'No AI analysis available';
        
        // Show the popup
        popup.style.display = 'flex';
    }

    function closeTestPopup() {
        document.getElementById('testPopupOverlay').style.display = 'none';
    }


    

    // Save tests to localStorage
    function saveTestsData(data) {
        localStorage.setItem('testsData', JSON.stringify(data));
    }

    // Calendar Functions
    function generateCalendarWithAttendance() {
        const calendarContainer = document.getElementById('calendar');
        if (!calendarContainer) return;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Create calendar header with month/year
        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        
        const monthYearDisplay = document.createElement('h3');
        monthYearDisplay.textContent = `${now.toLocaleString('default', { month: 'long' })} ${currentYear}`;
        calendarHeader.appendChild(monthYearDisplay);
        
        // Create calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Add day names header
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayNameEl = document.createElement('div');
            dayNameEl.className = 'calendar-day-name';
            dayNameEl.textContent = day;
            calendarGrid.appendChild(dayNameEl);
        });
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;
            
            // Highlight current day
            if (day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
                dayEl.classList.add('today');
            }
            
            calendarGrid.appendChild(dayEl);
        }
        
        // Create attendance section
        const attendanceSection = document.createElement('div');
        attendanceSection.className = 'attendance-section';
        
        const attendanceTitle = document.createElement('h3');
        attendanceTitle.textContent = 'Attendance for Selected Date';
        attendanceSection.appendChild(attendanceTitle);
        
        // Sample student data
        const students = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
            { id: 3, name: 'Mike Johnson' },
            { id: 4, name: 'Sarah Williams' }
        ];
        
        const attendanceTable = document.createElement('table');
        attendanceTable.className = 'attendance-table';
        
        // Create table header
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr>
                <th>Student Name</th>
                <th>Status</th>
            </tr>
        `;
        attendanceTable.appendChild(tableHeader);
        
        // Create table body with student rows
        const tableBody = document.createElement('tbody');
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>
                    <button class="attendance-btn absent" data-student-id="${student.id}">Absent</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        attendanceTable.appendChild(tableBody);
        attendanceSection.appendChild(attendanceTable);
        
        // Clear previous content and add new elements
        calendarContainer.innerHTML = '';
        calendarContainer.appendChild(calendarHeader);
        calendarContainer.appendChild(calendarGrid);
        calendarContainer.appendChild(attendanceSection);
        
        // Add event listeners to attendance buttons
        document.querySelectorAll('.attendance-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('absent')) {
                    this.classList.remove('absent');
                    this.classList.add('present');
                    this.textContent = 'Present';
                } else {
                    this.classList.remove('present');
                    this.classList.add('absent');
                    this.textContent = 'Absent';
                }
            });
        });
    }

    function generateCalendar() {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Create calendar header with month/year
        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        
        const monthYearDisplay = document.createElement('h3');
        monthYearDisplay.textContent = `${now.toLocaleString('default', { month: 'long' })} ${currentYear}`;
        calendarHeader.appendChild(monthYearDisplay);
        
        // Create calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Add day names header
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayNameEl = document.createElement('div');
            dayNameEl.className = 'calendar-day-name';
            dayNameEl.textContent = day;
            calendarGrid.appendChild(dayNameEl);
        });
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;
            
            // Highlight current day
            if (day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
                dayEl.classList.add('today');
            }
            
            // Add click event to select days
            dayEl.addEventListener('click', function() {
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                this.classList.add('selected');
            });
            
            calendarGrid.appendChild(dayEl);
        }
        
        // Clear previous calendar content and add new elements
        calendarEl.innerHTML = '';
        calendarEl.appendChild(calendarHeader);
        calendarEl.appendChild(calendarGrid);
    }

    // Test Management Functions
    function renderAllTests() {
        renderAssignedTests();
        renderTestOverviews();
    }

    function renderAssignedTests() {
        const container = document.getElementById('assignedTestsContainer');
        if (!container) return;
        
        container.innerHTML = `
            <h2>Assigned Tests</h2>
            <table class="assigned-tests-table">
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Assigned Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Average Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${testsData.map(test => `
                        <tr>
                            <td>${test.testName || 'undefined'}</td>
                            <td>${test.assignedDate}</td>
                            <td>${test.dueDate}</td>
                            <td>${test.status}</td>
                            <td>${test.averageScore}</td>
                            <td>
                                <button class="edit-btn" data-id="${test.id}">Edit</button>
                                <button class="delete-btn" data-id="${test.id}">Delete</button>
                                <button class="add-test-btn" data-id="${test.id}">View Details</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;



document.querySelectorAll('.edit-btn').forEach(btn => {
btn.addEventListener('click', handleEditTest);
});
                    
document.querySelectorAll('.delete-btn').forEach(btn => {
btn.addEventListener('click', handleDeleteTest);
});
            
document.querySelectorAll('.add-test-btn').forEach(btn => {
btn.addEventListener('click', function() {
const testId = this.getAttribute('data-id');
showTestPopup(testId);
        });
    });
}      
    
    // Remove the Test Overview table completely by not calling renderTestOverviews()
    function renderAllTests() {
        renderAssignedTests(); // Only render this one table
        // Don't call renderTestOverviews();
    }

    function renderTestOverviews() {
        const container = document.getElementById('testOverviewsContainer');
        if (!container) return;
        
        container.innerHTML = `
            <h2>Test Overview</h2>
            <table class="overview-table">
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Test Overview</th>
                        <th>Average Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${testsData.map(test => `
                        <tr class="test-row">
                            <td>${test.testName}</td>
                            <td>${test.testOverview}</td>
                            <td>${test.averageScore}</td>
                        </tr>
                        <tr class="details-row">
                            <td colspan="3">
                                <div class="additional-details">${test.additionalDetails}</div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    function handleEditTest(e) {
        const testId = parseInt(e.target.getAttribute('data-id'));
        const test = testsData.find(t => t.id === testId);
        
        if (test) {
            // Populate the edit form with test data
            const testNameInput = document.querySelector('.test-name-input');
            const testOverviewInput = document.querySelector('.test-overview-input');
            const additionalDetailsInput = document.querySelector('.additional-details-input');
            
            if (testNameInput) testNameInput.value = test.testName;
            if (testOverviewInput) testOverviewInput.value = test.testOverview;
            if (additionalDetailsInput) additionalDetailsInput.value = test.additionalDetails;
            
            // Store the test ID for updating
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) submitBtn.dataset.editingId = testId;
            
            // Open the popup
            const popupOverlay = document.getElementById('popupOverlay');
            if (popupOverlay) popupOverlay.classList.add('active');
        }
    }

    function handleDeleteTest(e) {
        if (confirm('Are you sure you want to delete this test?')) {
            const testId = parseInt(e.target.getAttribute('data-id'));
            testsData = testsData.filter(test => test.id !== testId);
            saveTestsData(testsData);
            renderAllTests();
        }
    }

    // Authentication Functions
    function showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }
    
    function showSuccess(message) {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
        }
    }

    // Initialize the application
    // Initialize the application
    function initializeApp() {
        // Your existing initialization code
        generateCalendarWithAttendance();
        renderAssignedTests(); // Only render this one table now
        
        // Add popup event listeners
        document.querySelector('.close-popup')?.addEventListener('click', closeTestPopup);
        document.getElementById('closeTestBtn')?.addEventListener('click', closeTestPopup);
        document.getElementById('saveTestBtn')?.addEventListener('click', function() {
            alert('Test details saved!');
            closeTestPopup();
        });
        
        document.getElementById('testPopupOverlay')?.addEventListener('click', function(e) {
            if (e.target === this) {
                closeTestPopup();
            }
        });
        
        // Your existing session check and redirection logic
        const savedUser = sessionStorage.getItem('currentUser');
        if (savedUser) {
            // ... your existing redirection logic ...
        }
    }

    // Event Listeners
    const popupOverlay = document.getElementById('popupOverlay');
    const attendancePopupOverlay = document.getElementById('attendancePopupOverlay');
    const imageUpload = document.getElementById('imageUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const previewImage = document.getElementById('previewImage');
    const testNameInput = document.querySelector('.test-name-input');
    const testOverviewInput = document.querySelector('.test-overview-input');
    const additionalDetailsInput = document.querySelector('.additional-details-input');
    const submitBtn = document.querySelector('.submit-btn');
    const addBtn = document.getElementById('addBtn');
    const viewAttendanceBtn = document.getElementById('viewAttendanceBtn');
    const closeBtn = document.getElementById('closeBtn');
    const closeAttendanceBtn = document.getElementById('closeAttendanceBtn');
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const vibeBoxes = document.querySelectorAll('.vibe-box');
    const subjectCards = document.querySelectorAll('.subject-card');
    const subjectPopup = document.getElementById('subjectPopup');
    const popupTitle = document.getElementById('popupSubjectTitle');
    const popupBody = document.getElementById('popupBody');
    const closePopup = document.getElementById('closePopup');

    // Mock user database
    const users = [
        { username: "0101", password: "teach123", role: "teacher" },
        { username: "02302", password: "learn123", role: "pupil" },
        { username: "admin", password: "admin123", role: "admin" }
    ];

    // Add Test Button
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            console.log('Add button clicked');
            if (popupOverlay) {
                // Reset the form when opening
                if (imageUpload) imageUpload.value = '';
                if (previewImage) {
                    previewImage.src = '#';
                    previewImage.style.display = 'none';
                }
                if (testNameInput) testNameInput.value = '';
                if (testOverviewInput) testOverviewInput.value = '';
                if (additionalDetailsInput) additionalDetailsInput.value = '';
                
                popupOverlay.classList.add('active');
            }
        });
    }

    // File Upload
    if (uploadBtn && imageUpload) {
        uploadBtn.addEventListener('click', function() {
            imageUpload.click();
        });

        imageUpload.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    if (previewImage) {
                        previewImage.src = event.target.result;
                        previewImage.style.display = 'block';
                    }
                }
                
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    // Form Submission
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // Validate inputs
            if (testNameInput && testNameInput.value.trim() === '') {
                alert('Please enter a test name');
                return;
            }

            // Create test object with the data
            const newTest = {
                id: Date.now(),
                testName: testNameInput ? testNameInput.value.trim() : '',
                assignedDate: new Date().toISOString().split('T')[0],
                dueDate: new Date().toISOString().split('T')[0],
                status: "Assigned",
                averageScore: "-",
                testOverview: testOverviewInput ? testOverviewInput.value.trim() : '',
                additionalDetails: additionalDetailsInput ? additionalDetailsInput.value.trim() : ''
            };

            // Check if we're editing an existing test
            const editingId = submitBtn.dataset.editingId;
            if (editingId) {
                // Update existing test
                const testIndex = testsData.findIndex(t => t.id === parseInt(editingId));
                if (testIndex !== -1) {
                    testsData[testIndex] = {
                        ...testsData[testIndex],
                        testName: newTest.testName,
                        testOverview: newTest.testOverview,
                        additionalDetails: newTest.additionalDetails
                    };
                }
                delete submitBtn.dataset.editingId;
            } else {
                // Add new test
                testsData.push(newTest);
            }

            // Save to localStorage
            saveTestsData(testsData);
            
            // Update the display
            renderAllTests();

            // Close the popup
            if (popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });
    }

    // Attendance Button
    // Attendance Button - MODIFIED THIS SECTION
if (viewAttendanceBtn) {
    viewAttendanceBtn.addEventListener('click', function() {
        console.log('Attendance button clicked');
        showAttendanceCalendar(); // Call our new function instead
    });
}
    // Close Buttons
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });
    }
    
    if (closeAttendanceBtn) {
        closeAttendanceBtn.addEventListener('click', function() {
            if (attendancePopupOverlay) {
                attendancePopupOverlay.classList.remove('active');
            }
        });
    }
    
    // Close Popups when clicking outside
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });
    }
    
    if (attendancePopupOverlay) {
        attendancePopupOverlay.addEventListener('click', function(e) {
            if (e.target === attendancePopupOverlay) {
                attendancePopupOverlay.classList.remove('active');
            }
        });
    }

    // Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            // Reset messages
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');
            if (errorMessage) errorMessage.style.display = 'none';
            if (successMessage) successMessage.style.display = 'none';
            
            // Validate inputs
            if (!username || !password) {
                showError("Please fill in all fields");
                return;
            }
            
            // Show loading spinner
            if (loginBtn) loginBtn.disabled = true;
            if (loadingSpinner) loadingSpinner.style.display = 'block';
            
            // Simulate API call delay
            setTimeout(() => {
                // Check credentials
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    // Successful login
                    showSuccess(`Welcome ${user.username}! Redirecting...`);
                    
                    // Store user in session
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    
                    // Redirect based on role
                    if (user.role === 'teacher') {
                        window.location.href = '../HackaThon/Teacher.html';
                    } else if (user.role === 'pupil') {
                        window.location.href = '../HackaThon/Student.html';
                    } else {
                        window.location.href = '../HackaThon/Dashboard.html';
                    }
                } else {
                    showError("Invalid username or password");
                    if (loginBtn) loginBtn.disabled = false;
                    if (loadingSpinner) loadingSpinner.style.display = 'none';
                }
            }, 1000);
        });
    }

    // Vibe Boxes
    // Vibe Boxes - Updated to redirect to classes.html
// Vibe Boxes - Updated to redirect to classes.html
// Vibe Boxes navigation
if (vibeBoxes && vibeBoxes.length > 0) {
    vibeBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Add this to prevent event bubbling
            
            // Save the class information to sessionStorage
            const numberElement = this.querySelector('.vibe-number');
            const baseNumber = numberElement.childNodes[0].nodeValue;
            const superscript = this.querySelector('.vibe-sup').textContent;
            const subject = this.querySelector('.vibe-label').textContent;
            
            sessionStorage.setItem('selectedBaseNumber', baseNumber);
            sessionStorage.setItem('selectedSuperscript', superscript);
            sessionStorage.setItem('selectedSubject', subject);
            
            // Use replace instead of assign to prevent back button issues
            window.location.replace('/HackaThon/classes.html');
        });
    });
}

    // Subject Cards
    if (subjectCards && subjectCards.length > 0 && subjectPopup) {
        function getElapsedStudyMonths() {
            const academicStartDate = new Date('2023-09-01');
            const currentDate = new Date();
            
            let months = (currentDate.getFullYear() - academicStartDate.getFullYear()) * 12;
            months -= academicStartDate.getMonth();
            months += currentDate.getMonth();
            
            return months <= 0 ? 1 : months;
        }
        
        subjectCards.forEach(card => {
            card.addEventListener('click', function() {
                const subjectName = this.querySelector('.subject-name').textContent;
                const monthsCount = getElapsedStudyMonths();
                
                popupTitle.textContent = `${subjectName} Progress Report`;
                
                let content = '';
                const monthNames = ["January", "February", "March", "April", "May", "June", 
                                  "July", "August", "September", "October", "November", "December"];
                
                const academicStartDate = new Date('2023-09-01');
                
                for (let i = monthsCount - 1; i >= 0; i--) {
                    const monthDate = new Date(academicStartDate);
                    monthDate.setMonth(academicStartDate.getMonth() + i);
                    
                    const monthName = monthNames[monthDate.getMonth()];
                    const year = monthDate.getFullYear();
                    
                    const attendance = this.querySelector('.attendance-value')?.textContent || `${Math.floor(Math.random() * 20) + 80}%`;
                    const avgPoints = this.querySelector('.points-value')?.textContent || `${(Math.random() * 2 + 8).toFixed(1)}`;
                    
                    content += `
                        <div class="month-section">
                            <h3 class="month-title">${monthName} ${year}</h3>
                            <div class="month-stats">
                                <span>Attendance: ${attendance}</span><br>
                                <span>Average Points: ${avgPoints}</span>
                            </div>
                            <div class="month-content">
                                <p>Progress report for <strong>${subjectName}</strong> during ${monthName} ${year}.</p>
                                <p>Topics covered: Algebra, Geometry, and Calculus fundamentals.</p>
                                <p>Assignments completed: 5 homework sets, 2 quizzes, and 1 project.</p>
                            </div>
                        </div>
                    `;
                }
                
                popupBody.innerHTML = content;
                subjectPopup.classList.add('active');
            });
        });
        
        if (closePopup) {
            closePopup.addEventListener('click', function() {
                subjectPopup.classList.remove('active');
            });
        }
        
        subjectPopup.addEventListener('click', function(e) {
            if (e.target === subjectPopup) {
                subjectPopup.classList.remove('active');
            }
        });
    }

    // Enhanced Attendance Tracking
    const attendanceList = document.getElementById('attendanceList');
    const selectedDateSpan = document.getElementById('selectedDate');
    
    // Extract student data from the existing table
    const studentTable = document.querySelector('.student-list table tbody');
    const students = [];
    
    // Get student names from the table
    if (studentTable) {
        studentTable.querySelectorAll('tr').forEach((row, index) => {
            const studentName = row.querySelector('.student-name').textContent;
            students.push({
                id: index + 1,
                name: studentName
            });
        });
    }
    
    // Set today's date as default selected date
    let selectedDate = new Date();
    
    function formatDateForDisplay(date) {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }


    function showAttendanceCalendar() {
        // Create popup overlay
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'attendance-calendar-overlay';
        
        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.className = 'attendance-calendar-popup';
        
        // Create header
        const header = document.createElement('h2');
        header.textContent = 'Attendance Calendar';
        popupContent.appendChild(header);
        
        // Create calendar container
        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'attendance-calendar-container';
        
        // Create navigation controls
        const navControls = document.createElement('div');
        navControls.className = 'calendar-nav-controls';
        
        const prevMonthBtn = document.createElement('button');
        prevMonthBtn.innerHTML = '&lt;';
        prevMonthBtn.className = 'calendar-nav-btn';
        
        const nextMonthBtn = document.createElement('button');
        nextMonthBtn.innerHTML = '&gt;';
        nextMonthBtn.className = 'calendar-nav-btn';
        
        const monthHeader = document.createElement('h3');
        monthHeader.className = 'calendar-month-header';
        
        navControls.appendChild(prevMonthBtn);
        navControls.appendChild(monthHeader);
        navControls.appendChild(nextMonthBtn);
        calendarContainer.appendChild(navControls);
        
        // Create calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'attendance-calendar-grid';
        
        // Add day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayNameCell = document.createElement('div');
            dayNameCell.className = 'attendance-calendar-day-name';
            dayNameCell.textContent = day;
            calendarGrid.appendChild(dayNameCell);
        });
        
        calendarContainer.appendChild(calendarGrid);
        popupContent.appendChild(calendarContainer);
        
        // Add date display
        const selectedDateDisplay = document.createElement('div');
        selectedDateDisplay.className = 'selected-date-display';
        popupContent.appendChild(selectedDateDisplay);
        
        // Add student list container
        const studentList = document.createElement('div');
        studentList.className = 'attendance-student-list';
        
        const studentHeader = document.createElement('h3');
        studentHeader.textContent = 'Attendance for selected date';
        studentList.appendChild(studentHeader);
        
        const studentTable = document.createElement('table');
        studentTable.innerHTML = `
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="attendance-data">
                <!-- Attendance data will be loaded here -->
            </tbody>
        `;
        studentList.appendChild(studentTable);
        popupContent.appendChild(studentList);
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'attendance-close-btn';
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popupOverlay);
        });
        popupContent.appendChild(closeButton);
        
        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);
        
        // Close when clicking outside
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                document.body.removeChild(popupOverlay);
            }
        });
        
        // Calendar functionality
        let currentMonth, currentYear;
        const now = new Date();
        
        // Initialize calendar
        function initCalendar(month, year) {
            currentMonth = month;
            currentYear = year;
            
            monthHeader.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
            
            // Clear previous days
            while (calendarGrid.children.length > 7) {
                calendarGrid.removeChild(calendarGrid.lastChild);
            }
            
            // Get first day of month and days in month
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Add empty cells for days before first day
            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'attendance-calendar-day empty';
                calendarGrid.appendChild(emptyCell);
            }
            
            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'attendance-calendar-day';
                dayCell.textContent = day;
                
                // Highlight current day
                if (day === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
                    dayCell.classList.add('today');
                }
                
                // Add click handler
                dayCell.addEventListener('click', () => {
                    // Remove previous selection
                    const selected = calendarGrid.querySelector('.selected');
                    if (selected) selected.classList.remove('selected');
                    
                    // Select this day
                    dayCell.classList.add('selected');
                    
                    // Update selected date display
                    const selectedDate = new Date(year, month, day);
                    selectedDateDisplay.textContent = `Selected: ${selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}`;
                    
                    // Load attendance for this date
                    loadAttendanceData(selectedDate);
                });
                
                calendarGrid.appendChild(dayCell);
            }
        }
        
        // Navigation handlers
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            initCalendar(currentMonth, currentYear);
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            initCalendar(currentMonth, currentYear);
        });
        
        // Sample student data
        const students = [
            { id: 1, name: 'Ana Beridze' },
            { id: 2, name: 'Giorgi Kapanadze' },
            { id: 3, name: 'Otar Khunashvili' },
            { id: 4, name: 'Mariam Mamulashvili' },
            { id: 5, name: 'Nika Tsereteli' }
        ];
        
        // Sample attendance data (in a real app, this would come from an API)
        const attendanceData = {
            '2023-11-15': {
                1: 'present',
                2: 'present',
                3: 'absent',
                4: 'present',
                5: 'absent'
            },
            '2023-11-16': {
                1: 'present',
                2: 'present',
                3: 'present',
                4: 'present',
                5: 'present'
            },
            '2023-11-17': {
                1: 'absent',
                2: 'present',
                3: 'present',
                4: 'absent',
                5: 'present'
            }
        };
        
        // Function to load attendance data for a specific date
        function loadAttendanceData(date) {
            const dateKey = date.toISOString().split('T')[0];
            const tbody = studentTable.querySelector('#attendance-data');
            tbody.innerHTML = '';
            
            students.forEach(student => {
                const row = document.createElement('tr');
                
                // Student name
                const nameCell = document.createElement('td');
                nameCell.textContent = student.name;
                row.appendChild(nameCell);
                
                // Attendance status
                const statusCell = document.createElement('td');
                const status = attendanceData[dateKey]?.[student.id] || 'not-recorded';
                statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);
                statusCell.className = `attendance-status ${status}`;
                row.appendChild(statusCell);
                
                // Actions
                const actionsCell = document.createElement('td');
                
                const presentBtn = document.createElement('button');
                presentBtn.textContent = 'Present';
                presentBtn.className = 'attendance-action present';
                presentBtn.addEventListener('click', () => updateAttendance(date, student.id, 'present'));
                
                const absentBtn = document.createElement('button');
                absentBtn.textContent = 'Absent';
                absentBtn.className = 'attendance-action absent';
                absentBtn.addEventListener('click', () => updateAttendance(date, student.id, 'absent'));
                
                actionsCell.appendChild(presentBtn);
                actionsCell.appendChild(absentBtn);
                row.appendChild(actionsCell);
                
                tbody.appendChild(row);
            });
        }
        
        // Function to update attendance (in a real app, this would call an API)
        function updateAttendance(date, studentId, status) {
            const dateKey = date.toISOString().split('T')[0];
            
            // Initialize date if not exists
            if (!attendanceData[dateKey]) {
                attendanceData[dateKey] = {};
            }
            
            // Update status
            attendanceData[dateKey][studentId] = status;
            
            // Reload data to reflect changes
            loadAttendanceData(date);
        }
        
        // Initialize with current month
        initCalendar(now.getMonth(), now.getFullYear());
        
        // Select today by default and load attendance
        const todayCell = calendarGrid.querySelector('.today');
        if (todayCell) {
            todayCell.click();
        }
    }
    
    function formatDateForStorage(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }


    
    
    // Display selected date in the attendance popup
    if (selectedDateSpan) {
        selectedDateSpan.textContent = formatDateForDisplay(selectedDate);
    }
    
    // Create date navigation controls for attendance popup
    function createDateNavigation() {
        if (!attendanceList) return;
        
        // Create date navigation container
        const dateNav = document.createElement('div');
        dateNav.className = 'date-navigation';
        
        // Previous day button
        const prevDayBtn = document.createElement('button');
        prevDayBtn.className = 'nav-btn prev-day';
        prevDayBtn.innerHTML = '&laquo; Previous Day';
        prevDayBtn.addEventListener('click', function() {
            selectedDate = new Date(selectedDate);
            selectedDate.setDate(selectedDate.getDate() - 1);
            selectedDateSpan.textContent = formatDateForDisplay(selectedDate);
            generateAttendanceList();
        });
        
        // Next day button
        const nextDayBtn = document.createElement('button');
        nextDayBtn.className = 'nav-btn next-day';
        nextDayBtn.innerHTML = 'Next Day &raquo;';
        nextDayBtn.addEventListener('click', function() {
            selectedDate = new Date(selectedDate);
            selectedDate.setDate(selectedDate.getDate() + 1);
            selectedDateSpan.textContent = formatDateForDisplay(selectedDate);
            generateAttendanceList();
        });
        
        // Today button
        const todayBtn = document.createElement('button');
        todayBtn.className = 'nav-btn today';
        todayBtn.innerHTML = 'Today';
        todayBtn.addEventListener('click', function() {
            selectedDate = new Date();
            selectedDateSpan.textContent = formatDateForDisplay(selectedDate);
            generateAttendanceList();
        });
        
        // Append buttons to navigation container
        dateNav.appendChild(prevDayBtn);
        dateNav.appendChild(todayBtn);
        dateNav.appendChild(nextDayBtn);
        
        // Clear and append to attendance list
        const existingNav = attendanceList.querySelector('.date-navigation');
        if (existingNav) {
            attendanceList.removeChild(existingNav);
        }
        
        // Insert at the beginning
        if (attendanceList.firstChild) {
            attendanceList.insertBefore(dateNav, attendanceList.firstChild);
        } else {
            attendanceList.appendChild(dateNav);
        }
    }
    
    // Function to generate attendance list for selected date
    function generateAttendanceList() {
        if (!attendanceList) return;
        
        // Clear current content
        attendanceList.innerHTML = '';
        
        // Add date navigation
        createDateNavigation();
        
        // Create attendance table
        const table = document.createElement('table');
        table.className = 'attendance-table';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const studentHeader = document.createElement('th');
        studentHeader.textContent = 'Student';
        headerRow.appendChild(studentHeader);
        
        const statusHeader = document.createElement('th');
        statusHeader.textContent = 'Status';
        headerRow.appendChild(statusHeader);
        
        const notesHeader = document.createElement('th');
        notesHeader.textContent = 'Notes';
        headerRow.appendChild(notesHeader);
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Date key for storage
        const dateKey = formatDateForStorage(selectedDate);
        
        // Get saved attendance data for selected date
        let savedAttendance = localStorage.getItem(`attendance-${dateKey}`);
        savedAttendance = savedAttendance ? JSON.parse(savedAttendance) : {};
        
        // Add each student to the list
        students.forEach(student => {
            const row = document.createElement('tr');
            
            // Student name cell
            const nameCell = document.createElement('td');
            nameCell.textContent = student.name;
            row.appendChild(nameCell);
            
            // Attendance status cell
            const statusCell = document.createElement('td');
            
            // Create present/absent radio buttons
            const radioGroup = document.createElement('div');
            radioGroup.className = 'attendance-radio-group';
            
            // Present radio button
            const presentLabel = document.createElement('label');
            presentLabel.className = 'radio-label';
            const presentInput = document.createElement('input');
            presentInput.type = 'radio';
            presentInput.name = `attendance-${student.id}-${dateKey}`;
            presentInput.value = 'present';
            presentInput.id = `present-${student.id}-${dateKey}`;
            
            // Check if student was marked present before
            if (savedAttendance[student.id] && savedAttendance[student.id].status === 'present') {
                presentInput.checked = true;
            } else if (!savedAttendance[student.id]) {
                presentInput.checked = true; // Default to present
            }
            
            presentLabel.appendChild(presentInput);
            presentLabel.appendChild(document.createTextNode(' Present'));
            radioGroup.appendChild(presentLabel);
            
            // Absent radio button
            const absentLabel = document.createElement('label');
            absentLabel.className = 'radio-label';
            const absentInput = document.createElement('input');
            absentInput.type = 'radio';
            absentInput.name = `attendance-${student.id}-${dateKey}`;
            absentInput.value = 'absent';
            absentInput.id = `absent-${student.id}-${dateKey}`;
            
            // Check if student was marked absent before
            if (savedAttendance[student.id] && savedAttendance[student.id].status === 'absent') {
                absentInput.checked = true;
            }
            
            absentLabel.appendChild(absentInput);
            absentLabel.appendChild(document.createTextNode(' Absent'));
            radioGroup.appendChild(absentLabel);
            
            statusCell.appendChild(radioGroup);
            row.appendChild(statusCell);
            
            // Notes cell
            const notesCell = document.createElement('td');
            const notesInput = document.createElement('input');
            notesInput.type = 'text';
            notesInput.className = 'attendance-note';
            notesInput.placeholder = 'Add notes (optional)';
            
            // Set saved note if exists
            if (savedAttendance[student.id] && savedAttendance[student.id].note) {
                notesInput.value = savedAttendance[student.id].note;
            }
            
            // Save note when changed
            notesInput.addEventListener('input', function() {
                saveAttendanceData(student.id, dateKey, 
                    document.querySelector(`input[name="attendance-${student.id}-${dateKey}"]:checked`).value, 
                    this.value);
            });
            
            notesCell.appendChild(notesInput);
            row.appendChild(notesCell);
            
            // Save attendance when radio buttons change
            [presentInput, absentInput].forEach(input => {
                input.addEventListener('change', function() {
                    saveAttendanceData(student.id, dateKey, this.value, notesInput.value);
                });
            });
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        attendanceList.appendChild(table);
        
        // Add save button
        const saveButtonDiv = document.createElement('div');
        saveButtonDiv.className = 'attendance-save-btn-container';
        
        const saveButton = document.createElement('button');
        saveButton.className = 'attendance-save-btn';
        saveButton.textContent = 'Save Attendance';
        saveButton.addEventListener('click', function() {
            alert('Attendance saved successfully!');
            
            // Update attendance percentages for all students
            students.forEach(student => {
                updateAttendancePercentage(student.id, student.name);
            });
            
            // Update calendar day to show it has attendance
            updateCalendarForAttendance(selectedDate);
        });
        
        saveButtonDiv.appendChild(saveButton);
        attendanceList.appendChild(saveButtonDiv);
        
        // Add report button
        const reportButton = document.createElement('button');
        reportButton.className = 'attendance-report-btn';
        reportButton.textContent = 'View Attendance Report';
        reportButton.addEventListener('click', function() {
            generateAttendanceReport();
        });
        
        saveButtonDiv.appendChild(reportButton);
    }
    
    // Function to save attendance data
    function saveAttendanceData(studentId, dateKey, status, note) {
        // Get existing data
        let savedAttendance = localStorage.getItem(`attendance-${dateKey}`);
        savedAttendance = savedAttendance ? JSON.parse(savedAttendance) : {};
        
        // Update data
        savedAttendance[studentId] = {
            status: status,
            note: note || ''
        };
        
        // Save back to localStorage
        localStorage.setItem(`attendance-${dateKey}`, JSON.stringify(savedAttendance));
    }
    
    // Function to update attendance percentage in the main table
    function updateAttendancePercentage(studentId, studentName) {
        // Count present days for this student
        let totalDays = 0;
        let presentDays = 0;
        
        // Loop through localStorage to find attendance records
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('attendance-')) {
                const data = JSON.parse(localStorage.getItem(key));
                if (data[studentId]) {
                    totalDays++;
                    if (data[studentId].status === 'present') {
                        presentDays++;
                    }
                }
            }
        }
        
        // Calculate attendance percentage
        const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;
        
        // Update percentage in the main table
        const studentRows = document.querySelectorAll('.student-list table tbody tr');
        studentRows.forEach(row => {
            const nameCell = row.querySelector('.student-name');
            if (nameCell && nameCell.textContent === studentName) {
                const attendanceSpan = row.querySelector('.attendance-value span');
                if (attendanceSpan) {
                    attendanceSpan.textContent = percentage;
                }
            }
        });
    }
    
    // Function to generate attendance report
    function generateAttendanceReport() {
        // Create report container
        const reportContainer = document.createElement('div');
        reportContainer.className = 'attendance-report';
        
        // Create report header
        const reportHeader = document.createElement('div');
        reportHeader.className = 'report-header';
        reportHeader.innerHTML = `<h2>Attendance Report</h2>`;
        reportContainer.appendChild(reportHeader);
        
        // Create report table
        const reportTable = document.createElement('table');
        reportTable.className = 'report-table';
        
        // Create table header with student names and date columns
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Add student name header
        const nameHeader = document.createElement('th');
        nameHeader.textContent = 'Student';
        headerRow.appendChild(nameHeader);
        
        // Get all dates with attendance records
        const attendanceDates = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('attendance-')) {
                const dateStr = key.replace('attendance-', '');
                const dateParts = dateStr.split('-');
                const recordDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                
                // Only add if date doesn't already exist in array
                if (!attendanceDates.some(d => d.toDateString() === recordDate.toDateString())) {
                    attendanceDates.push(recordDate);
                }
            }
        }
        
        // Sort dates
        attendanceDates.sort((a, b) => a - b);
        
        // Add date headers
        attendanceDates.forEach(date => {
            const dateHeader = document.createElement('th');
            dateHeader.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            headerRow.appendChild(dateHeader);
        });
        
        // Add percentage header
        const percentHeader = document.createElement('th');
        percentHeader.textContent = 'Percentage';
        headerRow.appendChild(percentHeader);
        
        thead.appendChild(headerRow);
        reportTable.appendChild(thead);
        
        // Create table body with student rows
        const tbody = document.createElement('tbody');
        
        students.forEach(student => {
            const row = document.createElement('tr');
            
            // Add student name
            const nameCell = document.createElement('td');
            nameCell.textContent = student.name;
            row.appendChild(nameCell);
            
            // Add attendance for each date
            let presentCount = 0;
            attendanceDates.forEach(date => {
                const dateKey = formatDateForStorage(date);
                const attendance = localStorage.getItem(`attendance-${dateKey}`);
                const statusCell = document.createElement('td');
                
                if (attendance) {
                    const data = JSON.parse(attendance);
                    if (data[student.id]) {
                        statusCell.textContent = data[student.id].status === 'present' ? 'P' : 'A';
                        statusCell.className = data[student.id].status === 'present' ? 'present' : 'absent';
                        
                        if (data[student.id].status === 'present') {
                            presentCount++;
                        }
                        
                        // Add note as tooltip if exists
                        if (data[student.id].note) {
                            statusCell.title = data[student.id].note;
                        }
                    } else {
                        statusCell.textContent = '-';
                    }
                } else {
                    statusCell.textContent = '-';
                }
                
                row.appendChild(statusCell);
            });
            
            // Add percentage
            const percentCell = document.createElement('td');
            const totalDates = attendanceDates.length;
            const percentage = totalDates > 0 ? Math.round((presentCount / totalDates) * 100) : 0;
            percentCell.textContent = `${percentage}%`;
            percentCell.className = 'percentage';
            row.appendChild(percentCell);
            
            tbody.appendChild(row);
        });
        
        reportTable.appendChild(tbody);
        reportContainer.appendChild(reportTable);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-report-btn';
        closeBtn.textContent = 'Close Report';
        closeBtn.addEventListener('click', function() {
            const reportOverlay = document.getElementById('reportOverlay');
            if (reportOverlay) {
                reportOverlay.remove();
            }
        });
        reportContainer.appendChild(closeBtn);
        
        // Create overlay for report
        const reportOverlay = document.createElement('div');
        reportOverlay.id = 'reportOverlay';
        reportOverlay.className = 'popup-overlay';
        reportOverlay.style.display = 'flex';
        reportOverlay.appendChild(reportContainer);
        
        // Add overlay to document
        document.body.appendChild(reportOverlay);
        
        // Close when clicking outside
        reportOverlay.addEventListener('click', function(e) {
            if (e.target === reportOverlay) {
                reportOverlay.remove();
            }
        });
    }
    
    // Function to update calendar when attendance is saved
    function updateCalendarForAttendance(date) {
        const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
        if (!calendarDays.length) return;
        
        const day = date.getDate();
        
        // Find the day in the calendar
        calendarDays.forEach(dayEl => {
            if (parseInt(dayEl.textContent) === day) {
                dayEl.classList.add('has-attendance');
                
                // If it doesn't already have a marker, add one
                if (!dayEl.querySelector('.attendance-marker')) {
                    const marker = document.createElement('span');
                    marker.className = 'attendance-marker';
                    marker.textContent = '✓';
                    dayEl.appendChild(marker);
                }
            }
        });
    }

    // CSS Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Calendar Styles */
        .calendar-header {
            text-align: center;
            margin-bottom: 15px;
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
        }
        
        .calendar-day-name {
            text-align: center;
            font-weight: bold;
            padding: 5px;
        }
        
        .calendar-day {
            border: 1px solid #ddd;
            padding: 5px;
            text-align: center;
            cursor: pointer;
        }
        
        .calendar-day.empty {
            background-color: #f9f9f9;
            border: none;
        }
        
        .calendar-day.today {
            background-color: #e6f7ff;
            font-weight: bold;
        }
        
        .calendar-day.selected {
            background-color: #d4edda;
        }
        
        .attendance-section {
            margin-top: 20px;
        }
        
        .attendance-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .attendance-table th, .attendance-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        
        .attendance-btn {
            padding: 3px 8px;
            cursor: pointer;
        }
        
        .present {
            background-color: #d4edda;
        }
        
        .absent {
            background-color: #f8d7da;
        }
        
        /* Test Tables Styles */
        .tests-table, .overview-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        
        .tests-table th, .tests-table td,
        .overview-table th, .overview-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        
        .tests-table th, .overview-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        
        .test-row {
            background-color: #ffffff;
        }
        
        .details-row {
            background-color: #f5f5f5;
        }
        
        .additional-details {
            color: #555;
            font-size: 0.9em;
            padding: 5px 0;
        }
        
        /* Popup Styles */
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            display: none;
        }
        
        .popup-overlay.active {
            display: flex;
        }
        
        .popup-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 80%;
            max-width: 500px;
        }
        
        /* Login Form Styles */
        #errorMessage, #successMessage {
            display: none;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
        }
        
        #errorMessage {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        #successMessage {
            background-color: #d4edda;
            color: #155724;
        }
        
        #loadingSpinner {
            display: none;
        }
        
        /* Attendance Styles */
        .calendar-day.has-attendance {
            position: relative;
        }
        
        .attendance-marker {
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 10px;
            color: green;
        }
        
        .date-navigation {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .nav-btn {
            padding: 5px 10px;
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .nav-btn:hover {
            background-color: #e0e0e0;
        }
        
        .attendance-note {
            width: 100%;
            padding: 4px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .attendance-report {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 80%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .report-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .report-table th, .report-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        
        .report-table th {
            background-color: #f2f2f2;
        }
        
        .report-table td.present {
            background-color: rgba(0, 128, 0, 0.1);
        }
        
        .report-table td.absent {
            background-color: rgba(255, 0, 0, 0.1);
        }
        
        .close-report-btn {
            padding: 8px 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: block;
            margin: 0 auto;
        }
        
        .attendance-report-btn {
            margin-left: 10px;
            background-color: #2196F3;
        }
    `;
    document.head.appendChild(style);

    // Initialize the application
    initializeApp();
});