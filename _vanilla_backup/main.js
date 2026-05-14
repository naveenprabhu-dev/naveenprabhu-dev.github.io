"use strict";
// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = e.target;
            const targetId = targetElement.getAttribute('href');
            if (!targetId || targetId === '#')
                return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Calculate position accounting for the fixed navbar height
                const navBar = document.querySelector('.navbar');
                const navHeight = navBar ? navBar.clientHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Update the footer year dynamically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');
        const navBar = document.querySelector('.navbar');
        const navHeight = navBar ? navBar.clientHeight : 0;
        sections.forEach(section => {
            const htmlElement = section;
            const sectionTop = htmlElement.offsetTop;
            const sectionHeight = htmlElement.clientHeight;
            if (window.pageYOffset >= (sectionTop - navHeight - 10)) {
                current = htmlElement.getAttribute('id') || '';
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
