// Module-level variables
let courseCount = 5;
const formElement = document.getElementById("form");

// Validate form - check all required fields
function validateForm() {
    const requiredFields = formElement.querySelectorAll("[required]");
    let isValid = true;
    
    requiredFields.forEach((field) => {
        if (field.type !== "file" && !field.value.trim()) {
            field.style.border = "2px solid red";
            isValid = false;
        } else {
            field.style.border = "";
        }
    });
    
    if (!isValid) {
        alert("Please fill in all required fields.");
    }
    
    return isValid;
}

// Gather all courses
function gatherCourses() {
    const courses = [];
    const courseItems = document.querySelectorAll(".course-item");
    
    courseItems.forEach((item) => {
        // Find all input fields within this course item
        const inputs = item.querySelectorAll("input[type='text']");
        if (inputs.length >= 4) {
            const course = {
                department: inputs[0].value || "",
                number: inputs[1].value || "",
                name: inputs[2].value || "",
                reason: inputs[3].value || ""
            };
            courses.push(course);
        }
    });
    
    return courses;
}

// Gather all links
function gatherLinks() {
    const links = [];
    for (let i = 1; i <= 5; i++) {
        const nameElement = document.getElementById(`link${i}Name`);
        const urlElement = document.getElementById(`link${i}URL`);
        const name = nameElement ? nameElement.value : "";
        const url = urlElement ? urlElement.value : "";
        if (name && url) {
            links.push({ name, url });
        }
    }
    return links;
}

// Gather all form data
function gatherFormData() {
    const data = {
        firstName: document.getElementById("firstName").value,
        middleInitial: document.getElementById("middleInitial").value,
        nickname: document.getElementById("nickname").value,
        lastName: document.getElementById("lastName").value,
        mascotAdjective: document.getElementById("mascotAdjective").value,
        mascotAnimal: document.getElementById("mascotAnimal").value,
        divider: document.getElementById("divider").value,
        imageFile: document.getElementById("imageFile").files[0],
        imagePath: document.getElementById("imageFile").files[0] ? URL.createObjectURL(document.getElementById("imageFile").files[0]) : "images/my-photo.jpg",
        imageCaption: document.getElementById("imageCaption").value,
        personalStatement: document.getElementById("personalStatement").value,
        personalBg: document.getElementById("personalBg").value,
        professionalBg: document.getElementById("professionalBg").value,
        academicBg: document.getElementById("academicBg").value,
        subjectBg: document.getElementById("subjectBg").value,
        primaryComputer: document.getElementById("primaryComputer").value,
        backupComputer: document.getElementById("backupComputer").value,
        quote: document.getElementById("quote").value,
        quoteAuthor: document.getElementById("quoteAuthor").value,
        funnyThing: document.getElementById("funnyThing").value,
        shareInfo: document.getElementById("shareInfo").value,
        courses: gatherCourses(),
        links: gatherLinks()
    };
    
    return data;
}

// Generate and display the introduction page
function generateIntroductionPage(data) {
    const form = document.getElementById("form");
    const resultContainer = document.getElementById("resultContainer");
    
    // Build the full name for h1
    let fullName = data.firstName;
    if (data.middleInitial) {
        fullName = data.middleInitial + ". " + fullName;
    }
    fullName += " " + data.lastName;
    
    // Build h3 name (first and last only)
    const h3Name = data.firstName + " " + data.lastName;
    
    // Build mascot
    const mascot = `${data.mascotAdjective} ${data.mascotAnimal}`;
    
    // Build HTML content
    let htmlContent = `
        <h2>Introduction Form</h2>
        <h3>${h3Name}</h3>
        
        <figure>
            <img src="${data.imagePath}" alt="${data.imageCaption}" style="width: 200px; height: 300px; object-fit: cover;">
            <figcaption><em>${data.imageCaption}</em></figcaption>
        </figure>
        
        <p>${data.personalStatement}</p>
        
        <ul>
            <li><strong>Personal Background:</strong> ${data.personalBg}</li>
            <li><strong>Professional Background:</strong> ${data.professionalBg}</li>
            <li><strong>Academic Background:</strong> ${data.academicBg}</li>
            <li><strong>Background in this Subject:</strong> ${data.subjectBg}</li>
            <li><strong>Primary Work Computer:</strong> ${data.primaryComputer}</li>
            <li><strong>Backup Work Computer & Location Plan:</strong> ${data.backupComputer}</li>
            <li><strong>Current Courses:</strong>
                <ol>
    `;
    
    // Add courses
    data.courses.forEach((course) => {
        htmlContent += `
                    <li><strong>${course.department}${course.number} – ${course.name}:</strong> ${course.reason}</li>
        `;
    });
    
    htmlContent += `
                </ol>
            </li>
    `;
    
    // Add optional fields if present
    if (data.funnyThing) {
        htmlContent += `<li><strong>Funny/Interesting Item to Remember Me By:</strong> ${data.funnyThing}</li>`;
    }
    
    if (data.shareInfo) {
        htmlContent += `<li><strong>I'd Also Like to Share:</strong> ${data.shareInfo}</li>`;
    }
    
    htmlContent += `
        </ul>
        
        <blockquote>&quot;${data.quote}&quot;
            <cite>&mdash; ${data.quoteAuthor}</cite>
        </blockquote>
    `;
    
    // Build footer with links
    htmlContent += '<nav>';
    data.links.forEach((link, index) => {
        htmlContent += `<a href="${link.url}" target="_blank">${link.name}</a>`;
        if (index < data.links.length - 1) {
            htmlContent += ' | ';
        }
    });
    htmlContent += '</nav>';
    
    // Add reset button
    htmlContent += `<p><button type="button" onclick="resetForm()">Start Over</button></p>`;
    
    // Display result
    resultContainer.innerHTML = htmlContent;
    resultContainer.style.display = "block";
    form.style.display = "none";
}

// Reset the form and display it again
window.resetForm = function() {
    const form = document.getElementById("form");
    const resultContainer = document.getElementById("resultContainer");
    
    // First, remove any extra courses (beyond the initial 5)
    const courseItems = document.querySelectorAll(".course-item");
    if (courseItems.length > 5) {
        for (let i = 5; i < courseItems.length; i++) {
            courseItems[i].remove();
        }
    }
    
    // Reset courseCount back to 5
    courseCount = 5;
    
    // Reset to initial values (not empty)
    document.getElementById("firstName").value = "Kelechi";
    document.getElementById("middleInitial").value = "O";
    document.getElementById("nickname").value = "";
    document.getElementById("lastName").value = "Otiocha";
    document.getElementById("acknowledgement").value = "I am a student and I have read the guidelines";
    document.getElementById("acknowledgeDate").value = "2024-01-15";
    document.getElementById("mascotAdjective").value = "Observant";
    document.getElementById("mascotAnimal").value = "Kangaroo";
    document.getElementById("divider").value = "★";
    document.getElementById("imageCaption").value = "A picture of myself";
    document.getElementById("personalStatement").value = "I'm a junior at UNC Charlotte studying Computer Science with a concentration in Software Engineering and Web/Mobile App Development. I have a passion for learning new backend technologies and frameworks.";
    document.getElementById("personalBg").value = "I'm 21 years old and I like playing soccer and video games.";
    document.getElementById("professionalBg").value = "I currently work as an Amazon warehouse associate and as a part time research assistant at UNC Charlotte.";
    document.getElementById("academicBg").value = "I'm currently a junior at UNC Charlotte studying computer science with a concentration in Software Engineering and Web/Mobile App Development.";
    document.getElementById("subjectBg").value = "I have done some front-end online courses in the past through the Odin Project.";
    document.getElementById("primaryComputer").value = "My primary computer is a 2020 Apple MacBook Air (macOS).";
    document.getElementById("backupComputer").value = "I have a prebuilt HP Omen PC at my apartment as a backup.";
    document.getElementById("quote").value = "The only place success comes before work is in the dictionary.";
    document.getElementById("quoteAuthor").value = "Vince Lombardi";
    document.getElementById("funnyThing").value = "When I was a kid, I won a turkey for Thanksgiving during a race.";
    document.getElementById("shareInfo").value = "I was born in California.";
    document.getElementById("imageFile").value = "";
    
    // Reset links
    document.getElementById("link1Name").value = "CLT Web";
    document.getElementById("link1URL").value = "https://webpages.charlotte.edu/kotiocha/";
    document.getElementById("link2Name").value = "GitHub.io";
    document.getElementById("link2URL").value = "https://zeke75895.github.io/";
    document.getElementById("link3Name").value = "GitHub";
    document.getElementById("link3URL").value = "https://github.com/zeke75895";
    document.getElementById("link4Name").value = "freeCodeCamp";
    document.getElementById("link4URL").value = "https://www.freecodecamp.org/kotiocha75895";
    document.getElementById("link5Name").value = "LinkedIn";
    document.getElementById("link5URL").value = "https://www.linkedin.com/in/kelechi-otiocha-271847349/";
    
    // Reset courses
    const courseValues = [
        { dept: "ITIS", num: "3135", name: "Front-End Web App Development", reason: "Required class and helpful for learning the front-end side of web/app development." },
        { dept: "ITSC", num: "3160", name: "Database Design & Implementation", reason: "Required concentration class." },
        { dept: "STAT", num: "2122", name: "Introduction to Probability and Statistics", reason: "Required math class to fulfill math requirement for my CS degree." },
        { dept: "ITIS", num: "3130", name: "Introduction to Human-Centered Computing", reason: "Interesting class for a non-natural creative person." },
        { dept: "ITSC", num: "2181", name: "Introduction to Computer Systems", reason: "Required CS class and helpful for understanding the processes and protocols behind how the hardware and software communicate with each other on a low-level scale." }
    ];
    
    // Reset remaining courses values using the simpler approach
    const remainingCourses = document.querySelectorAll(".course-item");
    remainingCourses.forEach((item, index) => {
        const inputs = item.querySelectorAll("input[type='text']");
        if (inputs.length >= 4 && index < courseValues.length) {
            inputs[0].value = courseValues[index].dept;
            inputs[1].value = courseValues[index].num;
            inputs[2].value = courseValues[index].name;
            inputs[3].value = courseValues[index].reason;
        }
    });
    
    // Show form, hide result
    form.style.display = "block";
    resultContainer.style.display = "none";
    resultContainer.innerHTML = "";
};

// Delete a course
window.deleteCourse = function(button) {
    button.parentElement.remove();
};

// Prevent default form submission - Event Listener
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!validateForm()) {
        return;
    }
    
    // Gather form data
    const formData = gatherFormData();
    
    // Generate and display the introduction page
    generateIntroductionPage(formData);
});

// Clear all form fields - Event Listener
document.getElementById("clearBtn").addEventListener("click", function() {
    // Clear all input fields
    document.querySelectorAll("form input").forEach((input) => {
        if (input.type !== "file") {
            input.value = "";
        }
    });
    // Clear all textarea fields
    document.querySelectorAll("form textarea").forEach((textarea) => {
        textarea.value = "";
    });
});

// Add another course - Event Listener
document.getElementById("addCourseBtn").addEventListener("click", function() {
    courseCount++;
    const coursesContainer = document.getElementById("coursesContainer");
    
    const newCourse = document.createElement("div");
    newCourse.className = "course-item";
    newCourse.innerHTML = `
        <label for="course${courseCount}Dept">Course ${courseCount} - Department: <span class="required">*</span></label>
        <input type="text" id="course${courseCount}Dept" name="course${courseCount}Dept" placeholder="e.g., ITIS" required>
        
        <label for="course${courseCount}Num">Course Number: <span class="required">*</span></label>
        <input type="text" id="course${courseCount}Num" name="course${courseCount}Num" placeholder="e.g., 3135" required>
        
        <label for="course${courseCount}Name">Course Name: <span class="required">*</span></label>
        <input type="text" id="course${courseCount}Name" name="course${courseCount}Name" placeholder="e.g., Front-End Web App Development" required>
        
        <label for="course${courseCount}Reason">Reason for Taking: <span class="required">*</span></label>
        <input type="text" id="course${courseCount}Reason" name="course${courseCount}Reason" placeholder="e.g., Required class" required>
        
        <button type="button" class="deleteBtn" onclick="deleteCourse(this)">Delete Course</button>
    `;
    
    coursesContainer.appendChild(newCourse);
});

// Validate on input - remove error border when user starts typing
document.querySelectorAll("form input, form textarea").forEach((field) => {
    field.addEventListener("input", function() {
        if (this.value.trim()) {
            this.style.border = "";
        }
    });
});
