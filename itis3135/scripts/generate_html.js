// Helper function to escape HTML special characters
function escapeHtmlSpecialChars(text) {
    if (!text) return "";
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Gather courses for HTML
function gatherCoursesForHtml() {
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

// Gather links for HTML
function gatherLinksForHtml() {
    const links = [];
    for (let i = 1; i <= 5; i++) {
        const nameField = document.getElementById(`link${i}Name`);
        const urlField = document.getElementById(`link${i}URL`);
        
        if (nameField && urlField && nameField.value && urlField.value) {
            links.push({
                name: nameField.value,
                url: urlField.value
            });
        }
    }
    return links;
}

// Gather form data for HTML generation
function gatherHtmlFormData() {
    const data = {
        firstName: document.getElementById("firstName").value,
        middleInitial: document.getElementById("middleInitial").value,
        nickname: document.getElementById("nickname").value,
        lastName: document.getElementById("lastName").value,
        mascotAdjective: document.getElementById("mascotAdjective").value,
        mascotAnimal: document.getElementById("mascotAnimal").value,
        divider: document.getElementById("divider").value,
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
        courses: gatherCoursesForHtml(),
        links: gatherLinksForHtml()
    };
    
    return data;
}

// Generate HTML code as a string
function generateHtmlCode(data) {
    // Build the full name for h1-style reference
    let fullName = data.firstName;
    if (data.middleInitial) {
        fullName = data.middleInitial + '. ' + fullName;
    }
    fullName += " " + data.lastName;
    
    // Build h3 name (first and last only)
    const h3Name = data.firstName + " " + data.lastName;
    const mascot = `${data.mascotAdjective} ${data.mascotAnimal}`;
    
    let htmlCode = `&lt;h2&gt;Introduction&lt;/h2&gt;\n`;
    htmlCode += `&lt;h3&gt;${escapeHtmlSpecialChars(h3Name)}&lt;/h3&gt;\n`;
    htmlCode += `&lt;figure&gt;\n`;
    htmlCode += `    &lt;img\n`;
    htmlCode += `        src="itis3135/images/my-photo.jpg"\n`;
    htmlCode += `        alt="${escapeHtmlSpecialChars(data.imageCaption)}"\n`;
    htmlCode += `    /&gt;\n`;
    htmlCode += `    &lt;figcaption&gt;${escapeHtmlSpecialChars(data.imageCaption)}&lt;/figcaption&gt;\n`;
    htmlCode += `&lt;/figure&gt;\n`;
    htmlCode += `&lt;p&gt;${escapeHtmlSpecialChars(data.personalStatement)}&lt;/p&gt;\n`;
    htmlCode += `&lt;ul&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Personal Background:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.personalBg)}&lt;/li&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Professional Background:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.professionalBg)}&lt;/li&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Academic Background:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.academicBg)}&lt;/li&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Background in this Subject:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.subjectBg)}&lt;/li&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Primary Work Computer:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.primaryComputer)}&lt;/li&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Backup Work Computer &amp; Location Plan:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.backupComputer)}&lt;/li&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Current Courses:&lt;/strong&gt;\n`;
    htmlCode += `        &lt;ol&gt;\n`;
    
    data.courses.forEach((course) => {
        htmlCode += `            &lt;li&gt;&lt;strong&gt;${escapeHtmlSpecialChars(course.department)}${escapeHtmlSpecialChars(course.number)} – ${escapeHtmlSpecialChars(course.name)}:&lt;/strong&gt; ${escapeHtmlSpecialChars(course.reason)}&lt;/li&gt;\n`;
    });
    
    htmlCode += `        &lt;/ol&gt;\n`;
    htmlCode += `    &lt;/li&gt;\n`;
    
    if (data.funnyThing) {
        htmlCode += `    &lt;li&gt;&lt;strong&gt;Funny/Interesting Item to Remember Me By:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.funnyThing)}&lt;/li&gt;\n`;
    }
    
    if (data.shareInfo) {
        htmlCode += `    &lt;li&gt;&lt;strong&gt;I'd Also Like to Share:&lt;/strong&gt; ${escapeHtmlSpecialChars(data.shareInfo)}&lt;/li&gt;\n`;
    }
    
    htmlCode += `&lt;/ul&gt;\n`;
    htmlCode += `&lt;blockquote&gt;&quot;${escapeHtmlSpecialChars(data.quote)}&quot;\n`;
    htmlCode += `    &lt;cite&gt;&mdash; ${escapeHtmlSpecialChars(data.quoteAuthor)}&lt;/cite&gt;\n`;
    htmlCode += `&lt;/blockquote&gt;\n`;
    htmlCode += `&lt;nav&gt;\n`;
    
    data.links.forEach((link, index) => {
        htmlCode += `    &lt;a href="${escapeHtmlSpecialChars(link.url)}" target="_blank"&gt;${escapeHtmlSpecialChars(link.name)}&lt;/a&gt;`;
        if (index < data.links.length - 1) {
            htmlCode += ` | \n`;
        } else {
            htmlCode += `\n`;
        }
    });
    
    htmlCode += `&lt;/nav&gt;\n`;
    
    return htmlCode;
}

// Display HTML output with syntax highlighting
function displayHtmlOutput(htmlCode) {
    const form = document.getElementById("form");
    const resultContainer = document.getElementById("resultContainer");
    
    // Create the output HTML
    let htmlContent = `
        <h2>Introduction HTML</h2>
        <p><a href="#" onclick="resetHtmlView(); return false;">← Back to Form</a></p>
        <section>
            <pre><code id="htmlCode">${htmlCode}</code></pre>
        </section>
        <p><button type="button" onclick="resetHtmlView()">Start Over</button></p>
    `;
    
    resultContainer.innerHTML = htmlContent;
    resultContainer.style.display = "block";
    form.style.display = "none";
    
    // Try to apply syntax highlighting if Highlight.js is available
    if (typeof hljs !== 'undefined') {
        document.getElementById("htmlCode").classList.add('language-html');
        hljs.highlightElement(document.getElementById("htmlCode"));
    }
}

// Reset HTML view
window.resetHtmlView = function() {
    if (typeof resetForm === 'function') {
        resetForm();
    } else {
        document.getElementById("form").style.display = "block";
        document.getElementById("resultContainer").style.display = "none";
        document.getElementById("resultContainer").innerHTML = "";
    }
};

// Generate HTML button functionality - Event Listener
document.getElementById("generateHtmlBtn").addEventListener("click", function() {
    // Validate required fields first
    const requiredFields = document.querySelectorAll("form [required]");
    let isValid = true;
    
    requiredFields.forEach((field) => {
        if (field.type !== "file" && !field.value.trim()) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        alert("Please fill in all required fields before generating HTML.");
        return;
    }
    
    // Gather form data
    const formData = gatherHtmlFormData();
    
    // Generate HTML
    const htmlCode = generateHtmlCode(formData);
    
    // Display HTML
    displayHtmlOutput(htmlCode);
});
