document.addEventListener('DOMContentLoaded', () => {
    // 🌟 Yumshoq parallax effekt (sekin harakat)
    const hero = document.querySelector('.hero');
    let currentX = 50;
    let currentY = 50;
    let targetX = 50;
    let targetY = 50;
  
    document.addEventListener('mousemove', (e) => {
      targetX = 50 + (e.clientX / window.innerWidth - 0.5) * 15;
      targetY = 50 + (e.clientY / window.innerHeight - 0.5) * 15;
    });
  
    function smoothParallax() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      hero.style.backgroundPosition = `${currentX}% ${currentY}%`;
      requestAnimationFrame(smoothParallax);
    }
    smoothParallax();
  
    // 🔄 Scroll animatsiyasi: fade + slide + scale
    const scrollElements = document.querySelectorAll('.step, .feature-card, .hero h1, .hero p, .cta-button');
    
    const elementInView = (el, dividend = 1.25) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };
    
    const displayScrollElement = (element) => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) scale(1)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    };
  
    const hideScrollElement = (element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px) scale(0.95)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    };
  
    const handleScrollAnimation = () => {
      scrollElements.forEach(el => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else {
          hideScrollElement(el);
        }
      });
    };
  
    // Dastlab elementlarni yashirish
    scrollElements.forEach(el => hideScrollElement(el));
  
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
  
    // 🎨 Navbar animatsiyasi - silliq rang o'zgarish va soyalar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.style.background = 'rgba(20, 20, 40, 0.95)';
        navbar.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.transition = 'all 0.4s ease';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'none';
        navbar.style.transition = 'all 0.4s ease';
      }
    });
  
    // 🖱️ Zamonaviy kursor efekti - yumaloq, blurlangan va hoverda kengaygan
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
  
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
  
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  
    function animateCursor() {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  
    // Hover effekti
    const hoverTargets = document.querySelectorAll('a, button, .step, .feature-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hovered');
      });
    });
  
    // Qo'shimcha CSS qo'shish
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .custom-cursor {
        width: 24px;
        height: 24px;
        border: 2.5px solid rgba(0, 123, 255, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        backdrop-filter: blur(4px);
        transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease;
        transform: translate3d(0,0,0);
        will-change: transform;
        background-color: transparent;
      }
      .custom-cursor.cursor-hovered {
        width: 40px;
        height: 40px;
        border-color: rgba(0, 123, 255, 0.9);
        background-color: rgba(0, 123, 255, 0.15);
        backdrop-filter: blur(6px);
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(styleTag);
  });
  