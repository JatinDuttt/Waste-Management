document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const header = document.querySelector('header');
    const sectionLinks = document.querySelectorAll('.nav-links a');
    const revealItems = document.querySelectorAll('.reveal');
    const counterItems = document.querySelectorAll('[data-target]');

    if (burger && nav && authButtons) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('nav-active');
            authButtons.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            burger.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const closeMobileMenu = () => {
        if (!nav || !authButtons || !burger) {
            return;
        }

        nav.classList.remove('nav-active');
        authButtons.classList.remove('nav-active');
        burger.classList.remove('toggle');
        burger.setAttribute('aria-expanded', 'false');
    };

    const setActiveLink = () => {
        const scrollPosition = window.scrollY + 140;

        sectionLinks.forEach((link) => {
            const section = document.querySelector(link.getAttribute('href'));
            if (!section) {
                return;
            }

            const inView = scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight;
            link.classList.toggle('active', inView);
        });
    };

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }
        setActiveLink();
    });

    setActiveLink();

    document.querySelectorAll('.nav-links a, .footer-links a, .hero-buttons a, .logo').forEach((link) => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            const targetSection = document.querySelector(href);
            if (!targetSection) {
                return;
            }

            e.preventDefault();
            closeMobileMenu();

            window.scrollTo({
                top: targetSection.offsetTop - 110,
                behavior: 'smooth'
            });
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.15
    });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
        revealObserver.observe(item);
    });

    const animateCounter = (element) => {
        const target = Number(element.dataset.target || 0);
        const suffix = element.dataset.suffix || '+';
        const duration = 1400;
        const startTime = performance.now();

        const updateValue = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(target * easedProgress);
            element.textContent = `${currentValue}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        requestAnimationFrame(updateValue);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            animateCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.4
    });

    counterItems.forEach((item) => counterObserver.observe(item));

    const wasteReportForm = document.getElementById('waste-report-form');
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');

    if (wasteReportForm) {
        wasteReportForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const wasteType = document.getElementById('waste-type').value;
            const location = document.getElementById('location').value.trim();
            const description = document.getElementById('description').value.trim();

            if (!name || !email || !phone || !wasteType || !location || !description) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            if (!/^\d{10,15}$/.test(phone.replace(/[-\s]/g, ''))) {
                showAlert('Please enter a valid phone number.', 'error');
                return;
            }

            simulateFormSubmission(wasteReportForm, 'Your waste report has been submitted successfully!');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            simulateFormSubmission(contactForm, 'Your message has been sent successfully!');
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            emailInput.value = '';
            showAlert('Thank you for subscribing to our newsletter!', 'success');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('login');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('signup');
        });
    }

    function showAlert(message, type = 'success') {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertEl = document.createElement('div');
        alertEl.className = `alert alert-${type}`;
        alertEl.textContent = message;
        document.body.appendChild(alertEl);

        requestAnimationFrame(() => alertEl.classList.add('show'));

        setTimeout(() => {
            alertEl.classList.remove('show');
            setTimeout(() => alertEl.remove(), 250);
        }, 2800);
    }

    function simulateFormSubmission(form, successMessage) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showAlert(successMessage, 'success');
        }, 1300);
    }

    function showModal(type) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        modalContent.innerHTML = `
            <button class="close-btn" aria-label="Close modal">&times;</button>
            <span class="modal-badge">${type === 'login' ? 'Welcome back' : 'Create account'}</span>
            <h2>${type === 'login' ? 'Login' : 'Sign Up'}</h2>
            <p class="modal-copy">${type === 'login' ? 'Access your waste management dashboard and report history.' : 'Join WasteWise to start reporting and tracking waste issues.'}</p>
            <form>
                ${type === 'signup' ? `
                    <div class="form-group">
                        <label for="signup-name">Full Name</label>
                        <input type="text" id="signup-name" required>
                    </div>
                ` : ''}
                <div class="form-group">
                    <label for="${type}-email">Email</label>
                    <input type="email" id="${type}-email" required>
                </div>
                <div class="form-group">
                    <label for="${type}-password">Password</label>
                    <input type="password" id="${type}-password" required>
                </div>
                ${type === 'signup' ? `
                    <div class="form-group">
                        <label for="signup-confirm-password">Confirm Password</label>
                        <input type="password" id="signup-confirm-password" required>
                    </div>
                ` : ''}
                <button type="submit" class="submit-btn">${type === 'login' ? 'Login' : 'Create Account'}</button>
            </form>
            <p class="toggle-link">
                ${type === 'login'
                    ? 'Don\'t have an account? <a href="#" class="toggle-form">Sign Up</a>'
                    : 'Already have an account? <a href="#" class="toggle-form">Login</a>'}
            </p>
        `;

        modalContainer.appendChild(modalContent);
        document.body.appendChild(modalContainer);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalContainer.classList.add('show');
            modalContent.classList.add('show');
        });

        const closeBtn = modalContent.querySelector('.close-btn');
        const toggleFormLink = modalContent.querySelector('.toggle-form');
        const form = modalContent.querySelector('form');
        const submitBtn = form.querySelector('button[type="submit"]');

        const closeModal = () => {
            modalContent.classList.remove('show');
            modalContainer.classList.remove('show');

            setTimeout(() => {
                modalContainer.remove();
                document.body.style.overflow = '';
            }, 250);
        };

        closeBtn.addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                closeModal();
            }
        });

        toggleFormLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            setTimeout(() => showModal(type === 'login' ? 'signup' : 'login'), 260);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                closeModal();
                showAlert(`${type === 'login' ? 'Login' : 'Registration'} successful!`, 'success');
            }, 1100);
        });
    }

    const dynamicStyle = document.createElement('style');
    dynamicStyle.textContent = `
        .alert {
            position: fixed;
            top: 24px;
            right: 24px;
            max-width: 360px;
            padding: 1rem 1.2rem;
            border-radius: 18px;
            color: #fff;
            font-weight: 800;
            z-index: 3000;
            transform: translateY(-18px);
            opacity: 0;
            transition: opacity 0.25s ease, transform 0.25s ease;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
        }

        .alert.show {
            transform: translateY(0);
            opacity: 1;
        }

        .alert-success {
            background: linear-gradient(135deg, #2d8f60, #4bc07c);
        }

        .alert-error {
            background: linear-gradient(135deg, #cc3f4a, #ff6d62);
        }

        .modal-container {
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            background: rgba(8, 22, 16, 0.55);
            backdrop-filter: blur(10px);
            z-index: 2500;
            opacity: 0;
            transition: opacity 0.25s ease;
        }

        .modal-container.show {
            opacity: 1;
        }

        .modal-content {
            width: min(100%, 460px);
            padding: 2rem;
            border-radius: 28px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(245, 252, 247, 0.95));
            border: 1px solid rgba(19, 49, 38, 0.08);
            box-shadow: 0 30px 70px rgba(12, 33, 24, 0.2);
            position: relative;
            transform: translateY(24px) scale(0.98);
            opacity: 0;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .modal-content.show {
            transform: translateY(0) scale(1);
            opacity: 1;
        }

        .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(19, 49, 38, 0.06);
            color: #133126;
            font-size: 1.4rem;
        }

        .modal-badge {
            display: inline-flex;
            margin-bottom: 1rem;
            padding: 0.45rem 0.8rem;
            border-radius: 999px;
            background: rgba(45, 143, 96, 0.1);
            color: #14553c;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .modal-content h2 {
            margin-bottom: 0.5rem;
            font-family: 'Sora', sans-serif;
            font-size: 2rem;
            color: #133126;
        }

        .modal-copy,
        .toggle-link {
            color: #5f776d;
        }

        .modal-copy {
            margin-bottom: 1.2rem;
        }

        .toggle-link {
            margin-top: 1rem;
            text-align: center;
        }

        .toggle-link a {
            color: #14553c;
            font-weight: 800;
        }

        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .burger.toggle .line2 {
            opacity: 0;
        }

        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }

        @media (max-width: 560px) {
            .alert {
                left: 16px;
                right: 16px;
                top: 16px;
                max-width: none;
            }

            .modal-content {
                padding: 1.35rem;
            }
        }
    `;

    document.head.appendChild(dynamicStyle);
});
