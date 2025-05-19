function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(
        '.about-text p, .highlight-item, .skill-category, .project-card, .contact-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.transition = 'width 1s ease-out';
                    entry.target.style.width = width;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

function setupTypewriterEffect() {
    const roleElement = document.querySelector('.hero-text p:first-of-type');
    
    if (roleElement) {
        const roles = [
            "a Software Developer",
            "a Web Developer", 
            "a Blockchain Developer", 
            "an AI Enthusiast", 
            "a Problem Solver"
        ];
        
        roleElement.innerHTML = `<span class="fixed-text">I'm </span><span class="animated-text"></span>`;
        const animatedText = roleElement.querySelector('.animated-text');
        
        let currentRoleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                animatedText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                animatedText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            .fixed-text {
                font-weight: 500;
            }
            .animated-text {
                font-weight: 500;
                border-right: 2px solid var(--primary-color);
                padding-right: 5px;
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(typeEffect, 1500);
    }
}