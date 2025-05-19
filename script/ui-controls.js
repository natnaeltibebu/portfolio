function enableSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.querySelector('.hamburger').classList.remove('active');
                }
            }
        });
    });
}

function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;
    navbar.appendChild(hamburger);
    
    const style = document.createElement('style');
    style.textContent = `
        .hamburger {
            display: none;
            cursor: pointer;
        }
        
        .bar {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px auto;
            transition: all 0.3s ease-in-out;
            background-color: var(--text-color);
        }
        
        @media (max-width: 768px) {
            .hamburger {
                display: block;
            }
            
            .hamburger.active .bar:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active .bar:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .hamburger.active .bar:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
            
            .navbar {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                gap: 0;
                flex-direction: column;
                background-color: var(--bg-color-alt);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                padding: 20px 0;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-item {
                margin: 16px 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

function setupThemeToggle() {
    const header = document.querySelector('.navbar');
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
    `;
    header.appendChild(themeToggle);
    
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            cursor: pointer;
            margin-left: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: var(--bg-color-alt);
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background-color: var(--primary-color);
            color: white;
        }
        
        .theme-toggle .fa-sun {
            display: none;
        }
        
        body.light-theme {
            --bg-color: #f5f5f5;
            --bg-color-alt: #ffffff;
            --bg-color-dark: #e0e0e0;
            --text-color: #333333;
            --text-color-light: #666666;
            --text-color-dark: #000000;
            --border-color: #dddddd;
        }
        
        body.light-theme .theme-toggle .fa-moon {
            display: none;
        }
        
        body.light-theme .theme-toggle .fa-sun {
            display: block;
        }
        
        body.light-theme .hero-section {
            background-color: var(--bg-color);
        }
        
        body.light-theme .nav-menu {
            background-color: var(--bg-color-alt);
        }
        
        body.light-theme #header {
            background-color: rgba(245, 245, 245, 0.95);
        }
        
        @media (max-width: 768px) {
            .theme-toggle {
                position: absolute;
                right: 70px;
                top: 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else if (!savedTheme && !prefersDarkScheme.matches) {
        document.body.classList.add('light-theme');
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}