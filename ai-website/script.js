document.addEventListener('DOMContentLoaded', () => {

    // 1. Dark/Light Theme Control via Vector Shifting
    const toggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Explicit SVG path data strings for clean DOM injection
    const moonPath = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    const sunPath = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.innerHTML = moonPath; // Safely swaps only the inside path to a Moon icon
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.innerHTML = sunPath;  // Safely swaps only the inside path to a Sun icon
        }
    });

    // 2. Interactive Filter Engine (Updated to track Systems & Apps)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                // Evaluates the new data categories 'systems' and 'apps' mapped in index.html
                if (filterValue === 'all' || card.getAttribute('data-cat') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Trigger Skill Metrics on Scroll Visibility
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                progressBar.style.width = progressBar.getAttribute('data-width');
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));

    // 4. Navigation Link Active Tracking on Scroll (With top scroll reset guard)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // If the user is at the absolute top of the page, force focus to 'home'
        if (window.pageYOffset < 10) {
            current = 'home';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});