// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Sample course data
    const sampleCourses = [
        {
            code: 'CS101',
            title: 'Introduction to Programming',
            schedule: 'MWF 9:00-10:30',
            slots: '30/40',
            status: 'Available'
        },
        {
            code: 'MATH201',
            title: 'Calculus II',
            schedule: 'TTH 13:00-14:30',
            slots: '40/40',
            status: 'Full'
        },
        {
            code: 'ENG102',
            title: 'Academic Writing',
            schedule: 'MWF 14:00-15:30',
            slots: '45/50',
            status: 'Waitlisted'
        }
    ];

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Populate Course Table
    function populateCourseTable() {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';

        sampleCourses.forEach(course => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-light-green';
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${course.code}</td>
                <td class="px-6 py-4">${course.title}</td>
                <td class="px-6 py-4">${course.schedule}</td>
                <td class="px-6 py-4">${course.slots}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs rounded-full ${getStatusClass(course.status)}">
                        ${course.status}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button class="px-3 py-1 text-sm bg-medium-green text-white rounded hover:bg-deep-green"
                            onclick="enlistCourse('${course.code}')"
                            ${course.status === 'Full' ? 'disabled' : ''}>
                        Enlist
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    // Helper function for status classes
    function getStatusClass(status) {
        switch(status) {
            case 'Available':
                return 'bg-medium-green text-white';
            case 'Full':
                return 'bg-red-500 text-white';
            case 'Waitlisted':
                return 'bg-yellow-500 text-black';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    }

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = searchInput.nextElementSibling;

    function searchCourses(query) {
        return sampleCourses.filter(course => 
            course.code.toLowerCase().includes(query.toLowerCase()) ||
            course.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        const filteredCourses = searchCourses(query);
        // Update table with filtered results
        // Implementation would go here
    });

    // Enlistment function
    window.enlistCourse = function(courseCode) {
        // Show confirmation dialog
        const confirmed = confirm(`Are you sure you want to enlist in ${courseCode}?`);
        
        if (confirmed) {
            // Simulate API call
            setTimeout(() => {
                alert(`Successfully enlisted in ${courseCode}`);
                // Update UI accordingly
            }, 500);
        }
    };

    // Issue submission
    const issueForm = document.querySelector('form');
    if (issueForm) {
        issueForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call
            setTimeout(() => {
                alert('Issue reported successfully!');
                issueForm.reset();
            }, 500);
        });
    }

    // Initialize the course table
    populateCourseTable();

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + / for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // Add responsive sidebar toggle
    const menuButton = document.createElement('button');
    menuButton.className = 'md:hidden p-4';
    menuButton.innerHTML = '☰';
    menuButton.addEventListener('click', () => {
        const sidebar = document.querySelector('aside');
        sidebar.classList.toggle('active');
    });

    document.querySelector('header').prepend(menuButton);
});

// Simulated real-time updates
setInterval(() => {
    // Update slot numbers randomly for demo
    const slots = document.querySelectorAll('td:nth-child(4)');
    slots.forEach(slot => {
        const [current, total] = slot.textContent.split('/');
        const newCurrent = Math.min(parseInt(current) + Math.floor(Math.random() * 3) - 1, parseInt(total));
        slot.textContent = `${newCurrent}/${total}`;
    });
}, 5000);

// Progress tracker animation
function updateProgress(step) {
    const progressBar = document.querySelector('.progress-bar');
    const steps = ['selection', 'conflict', 'confirmation'];
    const currentStep = steps.indexOf(step);
    
    progressBar.style.width = `${(currentStep + 1) * (100 / steps.length)}%`;
}

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tip = document.createElement('div');
            tip.className = 'tooltip';
            tip.textContent = e.target.dataset.tooltip;
            document.body.appendChild(tip);
            
            const rect = e.target.getBoundingClientRect();
            tip.style.top = rect.top - tip.offsetHeight - 10 + 'px';
            tip.style.left = rect.left + (rect.width - tip.offsetWidth) / 2 + 'px';
        });
        
        tooltip.addEventListener('mouseleave', () => {
            const tip = document.querySelector('.tooltip');
            if (tip) tip.remove();
        });
    });
}
