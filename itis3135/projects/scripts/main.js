// JavaScript powers the shared behavior of Kangaroo Tech Lab pages.
// It updates the footer year, highlights the active navigation link, and adds page-specific behaviors.

document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(function (link) {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    const introForm = document.getElementById('introForm');
    if (introForm) {
        introForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('visitorName').value.trim();
            const email = document.getElementById('visitorEmail').value.trim();
            const course = document.getElementById('courseSection').value.trim();
            const idea = document.getElementById('projectIdea').value.trim();
            const result = document.getElementById('introResult');

            if (!name || !email || !course) {
                result.innerHTML = '<h2>Submission summary</h2><p>Please complete the required fields: name, email, and course section.</p>';
                return;
            }

            result.innerHTML = `
                <h2>Submission summary</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Course section:</strong> ${course}</p>
                <p><strong>Project idea:</strong> ${idea || 'No idea provided yet.'}</p>
                <p>Thank you for submitting your introduction! This summary demonstrates form handling and validation.</p>
            `;
            introForm.reset();
        });
    }

    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const inventoryTable = document.getElementById('inventoryTable');

    function filterInventory() {
        if (!inventoryTable) return;
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const categoryFilter = categorySelect ? categorySelect.value : 'all';
        const rows = inventoryTable.querySelectorAll('tbody tr');

        rows.forEach(function (row) {
            const itemText = row.cells[0].textContent.toLowerCase();
            const categoryText = row.dataset.category.toLowerCase();
            const matchesSearch = itemText.includes(searchTerm) || categoryText.includes(searchTerm);
            const matchesCategory = categoryFilter === 'all' || categoryText === categoryFilter;
            row.style.display = matchesSearch && matchesCategory ? '' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterInventory);
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', filterInventory);
    }

    const planData = document.getElementById('planData');
    if (planData) {
        fetch('data/project_plan.json')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Could not load project plan data.');
                }
                return response.json();
            })
            .then(function (data) {
                const pageList = data.pages.map(function (page) {
                    return `<li><strong>${page.name}</strong>: ${page.description}</li>`;
                }).join('');
                planData.innerHTML = `
                    <p>${data.note}</p>
                    <ul>${pageList}</ul>
                `;
            })
            .catch(function (error) {
                planData.textContent = error.message;
            });
    }
});
