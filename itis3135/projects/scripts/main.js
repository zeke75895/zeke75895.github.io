// JavaScript powers the shared behavior of Kangaroo Tech Lab pages.
// It updates the footer year, highlights the active navigation link, and adds page-specific behaviors.

document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    const themeToggle = document.getElementById('themeToggle');
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    const introForm = document.getElementById('introForm');
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const inventoryTable = document.getElementById('inventoryTable');
    const inventoryMessage = document.getElementById('inventoryMessage');
    const planData = document.getElementById('planData');
    const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');
    const detailToggleSection = document.getElementById('detailToggleSection');
    const highlightButton = document.getElementById('highlightButton');
    const highlightResult = document.getElementById('highlightResult');
    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeMessage = document.getElementById('subscribeMessage');
    const projectIdea = document.getElementById('projectIdea');
    const ideaCharCount = document.getElementById('ideaCharCount');

    const themeStorageKey = 'kangarooTechTheme';
    const productHighlights = [
        {
            title: 'Roo Ranger Pro',
            description: 'Advanced field kit with AI alerts, solar charge support, and rugged case protection.'
        },
        {
            title: 'Bushwalker Basic',
            description: 'Portable starter pack for outdoor observation with easy setup and field notes.'
        },
        {
            title: 'Outback Unlimited',
            description: 'Premium suite with lifetime updates, premium support, and advanced wildlife tracking.'
        }
    ];

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
        }
        localStorage.setItem(themeStorageKey, theme);
    }

    function loadTheme() {
        const saved = localStorage.getItem(themeStorageKey);
        setTheme(saved === 'dark' ? 'dark' : 'light');
    }

    function updateInventoryMessage() {
        if (!inventoryTable || !inventoryMessage) return;
        const rows = Array.from(inventoryTable.querySelectorAll('tbody tr'));
        const visibleRows = rows.filter(function (row) {
            return row.style.display !== 'none';
        });
        if (visibleRows.length === 0) {
            inventoryMessage.textContent = 'No inventory items match your current search and filter.';
        } else {
            inventoryMessage.textContent = `Showing ${visibleRows.length} item${visibleRows.length === 1 ? '' : 's'} from inventory.`;
        }
    }

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
        updateInventoryMessage();
    }

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (themeToggle) {
        loadTheme();
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    if (introForm) {
        introForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('visitorName').value.trim();
            const email = document.getElementById('visitorEmail').value.trim();
            const course = document.getElementById('courseSection').value.trim();
            const idea = projectIdea ? projectIdea.value.trim() : '';
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
            if (ideaCharCount) {
                ideaCharCount.textContent = '0 / 200 characters';
            }
        });
    }

    if (projectIdea && ideaCharCount) {
        projectIdea.addEventListener('input', function () {
            const maxLength = projectIdea.getAttribute('maxlength') || 200;
            ideaCharCount.textContent = `${projectIdea.value.length} / ${maxLength} characters`;
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterInventory);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', filterInventory);
    }

    if (inventoryTable && inventoryMessage) {
        updateInventoryMessage();
    }

    if (toggleDetailsBtn && detailToggleSection) {
        toggleDetailsBtn.addEventListener('click', function () {
            const currentlyHidden = detailToggleSection.hidden;
            detailToggleSection.hidden = !currentlyHidden;
            toggleDetailsBtn.textContent = currentlyHidden ? 'Hide page details' : 'Show page details';
        });
    }

    if (highlightButton && highlightResult) {
        highlightButton.addEventListener('click', function () {
            const chosen = productHighlights[Math.floor(Math.random() * productHighlights.length)];
            highlightResult.innerHTML = `
                <h3>${chosen.title}</h3>
                <p>${chosen.description}</p>
            `;
        });
    }

    if (subscribeForm && subscribeMessage) {
        subscribeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const emailInput = subscribeForm.querySelector('#subscribeEmail');
            const email = emailInput ? emailInput.value.trim() : '';
            if (!email) {
                subscribeMessage.innerHTML = '<p>Please enter a valid email address to subscribe.</p>';
                return;
            }
            subscribeMessage.innerHTML = `
                <h3>Subscription confirmed</h3>
                <p>Thank you! <strong>${email}</strong> will receive the next product update.</p>
            `;
            subscribeForm.reset();
        });
    }

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
