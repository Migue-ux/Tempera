
  const mobileBtn = document.getElementById("mobile-btn");
  const navLinks = document.querySelector(".nav-links");

  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });


  document.querySelectorAll(".card_box").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = (y / rect.height - 0.5) * -30;
    const ry = (x / rect.width - 0.5) * 25;

    card.style.setProperty("--rx", rx + "deg");
    card.style.setProperty("--ry", ry + "deg");
    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
});


// scroll-animate.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    // 2. Define o limite de visibilidade
    // O elemento será revelado quando 80% dele estiver visível
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% do elemento visível
    };

    // 3. Cria o Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento estiver cruzando o threshold (visível)
            if (entry.isIntersecting) {
                // Adiciona a classe que dispara a animação CSS
                entry.target.classList.add('animate-ready');
                // Para de observar o elemento para que a animação não se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Inicia a observação de cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
