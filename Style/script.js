// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Menú responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
   
    if (menuToggle) {
    menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    });
    }
   
    // Cerrar el menú cuando se hace clic en un enlace (en modo móvil)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
    link.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    }
    });
    });
   
    // Animación de scroll suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    e.preventDefault();
   
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
   
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
    window.scrollTo({
    top: targetElement.offsetTop - 100,
    behavior: 'smooth'
    });
    }
    });
    });
   
    // Animación para las barras de progreso de habilidades
    const progressBars = document.querySelectorAll('.progress');
   
    // Función para animar las barras de progreso cuando son visibles
    function animateProgressBars() {
    progressBars.forEach(bar => {
    const barPosition = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
   
    if (barPosition < screenPosition) {
    bar.style.width = bar.parentElement.getAttribute('dataprogress') + '%';
    }
    });
    }
   
    // Llamar a la función cuando la página carga
    animateProgressBars();
   
    // Y también cuando se hace scroll
    window.addEventListener('scroll', animateProgressBars);
   
    // Efecto de aparición gradual para elementos
    const fadeElements = document.querySelectorAll('.fade-in');
   
    function checkFade() {
    fadeElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
   
    if (elementPosition < screenPosition) {
    element.classList.add('visible');
    }
    });
    }
   
    // Añadir clase 'fade-in' a los elementos que quieres animar
    document.querySelectorAll('.card, .skill, .hero h2, .hero p, .ctabuttons').forEach(element => {
    element.classList.add('fade-in');
    });
   
    window.addEventListener('scroll', checkFade);
    checkFade(); // Comprobar cuando la página carga
   
    // Modo oscuro
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.title = 'Cambiar modo oscuro/claro';
    document.body.appendChild(darkModeToggle);
   
    // Comprobar la preferencia del usuario o la configuración guardada
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
   
    if (savedMode === 'dark' || (savedMode === null && prefersDarkMode)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
    }
   
    darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
   
    if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'dark');
    darkModeToggle.innerHTML = '☀️';
    } else {
    localStorage.setItem('darkMode', 'light');
    darkModeToggle.innerHTML = '🌙';
    }
    });
   
    // Añadir estilos CSS para el botón y el modo oscuro
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
    .dark-mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #333;
    color: #fff;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 999;
    transition: all 0.3s ease;
    }
   
    .dark-mode-toggle:hover {
    transform: scale(1.1);
    }
   
    .dark-mode {
    background-color: #222;
    color: #f5f5f5;
    }
   
    .dark-mode header,
    .dark-mode .card,
    .dark-mode .destacados {
    background-color: #333;
    color: #f5f5f5;
    }
   
    .dark-mode .hero {
    background: linear-gradient(to right, #222, #333);
    }
   
    .dark-mode .placeholder-img {
    background-color: #444;
    color: #ddd;
    }
   
    .dark-mode .habilidades {
    background-color: #2a2a2a;
    }
   
    .dark-mode footer {
    background-color: #111;
    }
   
    .dark-mode .progress-bar {
    background-color: #444;
    }
   
    .dark-mode nav a:hover {
    background-color: #444;
    }
   
    .dark-mode .card h3 {
    color: #f5f5f5;
    }
   
    .dark-mode .card p {
    color: #ccc;
    }
   
    .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    }
   
    .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
    }
    `;
    document.head.appendChild(darkModeStyles);
   });