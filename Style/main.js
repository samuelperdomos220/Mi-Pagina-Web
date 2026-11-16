
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos del DOM
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');
    const skillBars = document.querySelectorAll('.skill-level');
    const scrollElements = document.querySelectorAll(
        '.service-card, .project-card, .skill'
    );

    // Alternar el menú móvil
    function toggleMobileMenu() {
        if (!mobileMenuToggle || !nav) return;

        const isActive = mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active', isActive);

        mobileMenuToggle.setAttribute('aria-expanded', isActive);
    }

    // Evento para abrir y cerrar el menú móvil
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Cerrar el menú móvil al seleccionar un enlace
    function closeMenuOnClick() {
        if (
            window.innerWidth <= 768 &&
            mobileMenuToggle &&
            nav
        ) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', closeMenuOnClick);
    });

    // Animar las barras de habilidades
    function animateSkillBars() {
        skillBars.forEach(bar => {
            // Obtener el ancho original
            const width = bar.style.width;

            // Evitar animar si no hay un ancho definido
            if (!width) return;

            bar.style.width = '0';

            // Forzar la actualización del diseño
            void bar.offsetWidth;

            // Aplicar el ancho original
            bar.style.width = width;
        });
    }

    // Animar elementos cuando entran en pantalla
    function checkScrollAnimation() {
        const triggerBottom = window.innerHeight * 0.8;

        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
    }

    // Desplazamiento suave entre secciones
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');

                // Ignorar enlaces vacíos
                if (!targetId || targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                // Solo interceptar enlaces a elementos existentes
                if (targetElement) {
                    e.preventDefault();

                    const targetPosition =
                        targetElement.getBoundingClientRect().top +
                        window.scrollY - 100;

                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Ejecutar funciones al cargar la página
    animateSkillBars();
    checkScrollAnimation();
    smoothScroll();

    // Comprobar animaciones durante el desplazamiento
    window.addEventListener('scroll', checkScrollAnimation);

    // Agregar estilos CSS para las animaciones
    const style = document.createElement('style');

    style.textContent = `
        .service-card,
        .project-card,
        .skill {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease,
                        transform 0.6s ease;
        }

        .service-card.animate,
        .project-card.animate,
        .skill.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }

        @media (prefers-reduced-motion: reduce) {
            .service-card,
            .project-card,
            .skill {
                transition: none;
            }

            html {
                scroll-behavior: auto;
            }
        }
    `;

    document.head.appendChild(style);

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Aquí debes agregar la lógica para enviar los datos
            // a un servidor o servicio de formularios.
            alert('El formulario es válido y está listo para enviarse.');
        });
    }
});
