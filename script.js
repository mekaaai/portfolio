// Navigation indicator animation
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.getElementById('navIndicator');
const navLinksContainer = document.getElementById('navLinks');

function moveIndicator(element) {
    const linkRect = element.getBoundingClientRect();
    const containerRect = navLinksContainer.getBoundingClientRect();

    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.left = `${linkRect.left - containerRect.left}px`;
    navIndicator.style.opacity = '1';
}

// Set initial position on first link
if (navLinks.length > 0) {
    moveIndicator(navLinks[0]);
    navLinks[0].classList.add('active');
}

// Move indicator on hover
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
        moveIndicator(this);
    });
});

// Return to active link when mouse leaves
navLinksContainer.addEventListener('mouseleave', function () {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        moveIndicator(activeLink);
    }
});

// Update active state on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    if (!navLinksContainer.matches(':hover')) {
                        moveIndicator(link);
                    }
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on load
updateActiveLink();