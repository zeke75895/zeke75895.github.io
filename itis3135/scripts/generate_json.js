// Helper function to escape HTML characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Gather courses for JSON
function gatherCoursesForJson() {
    const courses = [];
    const courseItems = document.querySelectorAll(".course-item");
    
    courseItems.forEach((item) => {
        // Find all input fields within this course item
        const inputs = item.querySelectorAll("input[type='text']");
        if (inputs.length >= 4) {
            const course = {
                department: inputs[0].value,
                number: inputs[1].value,
                name: inputs[2].value,
                reason: inputs[3].value
            };
            courses.push(course);
        }
    });
    
    return courses;
}

// Gather links for JSON
function gatherLinksForJson() {
    const links = [];
    for (let i = 1; i <= 5; i++) {
        const nameField = document.getElementById(`link${i}Name`);
        const urlField = document.getElementById(`link${i}URL`);
        
        if (nameField && urlField && nameField.value && urlField.value) {
            links.push({
                name: nameField.value,
                href: urlField.value
            });
        }
    }
    return links;
}

// Gather form data for JSON
function gatherJsonFormData() {
    const data = {};
    data["first_name"] = document.getElementById("firstName").value;
    data["middle_initial"] = document.getElementById("middleInitial").value || "";
    data["preferred_name"] = document.getElementById("nickname").value || "";
    data["last_name"] = document.getElementById("lastName").value;
    data.divider = document.getElementById("divider").value;
    data["mascot_adjective"] = document.getElementById("mascotAdjective").value;
    data["mascot_animal"] = document.getElementById("mascotAnimal").value;
    data.image = "itis3135/images/my-photo.jpg";
    data["image_caption"] = document.getElementById("imageCaption").value;
    data["personal_statement"] = document.getElementById("personalStatement").value;
    data["personal_background"] = document.getElementById("personalBg").value;
    data["professional_background"] = document.getElementById("professionalBg").value;
    data["academic_background"] = document.getElementById("academicBg").value;
    data["subject_background"] = document.getElementById("subjectBg").value;
    data["primary_computer"] = document.getElementById("primaryComputer").value;
    data["backup_computer"] = document.getElementById("backupComputer").value;
    data.courses = gatherCoursesForJson();
    data.quote = document.getElementById("quote").value;
    data["quote_author"] = document.getElementById("quoteAuthor").value;
    data["funny_thing"] = document.getElementById("funnyThing").value || "";
    data["something_to_share"] = document.getElementById("shareInfo").value || "";
    data.links = gatherLinksForJson();
    
    return data;
}

// Display JSON output with syntax highlighting
function displayJsonOutput(jsonString) {
    const form = document.getElementById("form");
    const resultContainer = document.getElementById("resultContainer");
    
    // Create the output HTML
    let htmlContent = `
        <h2>Introduction JSON</h2>
        <p><a href="#" onclick="resetJsonView(); return false;">← Back to Form</a></p>
        <section>
            <pre><code id="jsonCode">${escapeHtml(jsonString)}</code></pre>
        </section>
        <p><button type="button" onclick="resetJsonView()">Start Over</button></p>
    `;
    
    resultContainer.innerHTML = htmlContent;
    resultContainer.style.display = "block";
    form.style.display = "none";
    
    // Try to apply syntax highlighting if Highlight.js is available
    if (typeof hljs !== 'undefined') {
        document.getElementById("jsonCode").classList.add('language-json');
        hljs.highlightElement(document.getElementById("jsonCode"));
    }
}

// Reset JSON view
window.resetJsonView = function() {
    if (typeof resetForm === 'function') {
        resetForm();
    } else {
        document.getElementById("form").style.display = "block";
        document.getElementById("resultContainer").style.display = "none";
        document.getElementById("resultContainer").innerHTML = "";
    }
};

// Generate JSON button functionality - Event Listener
document.getElementById("generateJsonBtn").addEventListener("click", function() {
    // Validate required fields first
    const requiredFields = document.querySelectorAll("form [required]");
    let isValid = true;
    
    requiredFields.forEach((field) => {
        if (field.type !== "file" && !field.value.trim()) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        alert("Please fill in all required fields before generating JSON.");
        return;
    }
    
    // Gather form data
    const formData = gatherJsonFormData();
    
    // Generate JSON
    const jsonString = JSON.stringify(formData, null, 2);
    
    // Display JSON
    displayJsonOutput(jsonString);
});
