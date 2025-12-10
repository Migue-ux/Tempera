
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




document.addEventListener('mousemove', (e) => {
    const card = document.getElementById('card-parallax');
    if (!card) return; // Sai se o cartão não for encontrado

    const { x, y, width, height } = card.getBoundingClientRect();
    
    // Calcula o centro do cartão
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    
    // Calcula a posição do mouse em relação ao centro do cartão (de -1 a 1)
    const mouseX = (e.clientX - centerX) / (width / 2);
    const mouseY = (e.clientY - centerY) / (height / 2);
    
    // Limita o ângulo máximo de inclinação (tilt)
   const maxTilt = 3; // Agora o ângulo máximo é 5 graus
    
    // Calcula os ângulos de rotação
    // Nota: O Y é invertido para que o topo do cartão siga o mouse (efeito mais natural)
    const tiltX = -mouseY * maxTilt; 
    const tiltY = mouseX * maxTilt; 

    // Aplica a transformação 3D e elevação
    card.style.transform = `perspective(1000px) 
                            rotateX(${tiltX}deg) 
                            rotateY(${tiltY}deg) 
                            scale(1.05)`;
});

// Reseta o efeito quando o mouse sai do cartão
document.getElementById('card-parallax').addEventListener('mouseleave', () => {
    const card = document.getElementById('card-parallax');
    if (card) {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    }
});




// --- Exemplo de Como Lidar com o Stagger (Assumindo que você tem uma função de observação) ---

// 1. Seleciona todos os elementos que devem ser animados (local-info e local-map-container)
const elementsToAnimate = document.querySelectorAll('.local-wrapper > [data-animate]');

// 2. Define o tempo de atraso entre cada item (em milissegundos)
const staggerDelay = 150; 

// 3. Função principal que observa e anima os elementos
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Encontra o índice do elemento dentro da lista de elementos a serem animados
            // Isso define a ordem de entrada (1º, 2º, 3º, etc.)
            const index = Array.from(elementsToAnimate).indexOf(element);

            // Calcula o atraso total
            const totalDelay = index * staggerDelay;

            // Aplica o atraso usando setTimeout
            setTimeout(() => {
                element.classList.add('animate-ready');
                observer.unobserve(element); // Para de observar após animar
            }, totalDelay);
        }
    });
}, {
    // A animação é acionada quando 10% do elemento está visível
    threshold: 0.1 
});

// 4. Inicia a observação para cada elemento
elementsToAnimate.forEach(element => {
    observer.observe(element);
});



// avaliacao

document.addEventListener('DOMContentLoaded', () => {
    const reviewsTrack = document.querySelector('.reviews-track');
    
    if (!reviewsTrack) return;

    // 1. Duplica os cartões para criar o loop infinito
    const originalContent = reviewsTrack.innerHTML;
    // Adiciona o conteúdo original novamente. Agora a trilha tem 2x o conteúdo.
    reviewsTrack.innerHTML = originalContent + originalContent;

    // Opcional: Pausa no scroll para dispositivos móveis para economizar bateria/CPU
    let isScrolling;
    const scrollStopHandler = () => {
        reviewsTrack.style.animationPlayState = 'paused';
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            reviewsTrack.style.animationPlayState = 'running';
        }, 1500); // 1.5 segundos após parar de scrollar, a animação volta
    };

    window.addEventListener('scroll', scrollStopHandler, false);
});




// Função para carregar o mapa específico (chamada pelo clique)
function loadMap(placeholder) {
    if (placeholder.dataset.mapLoaded === 'true') return;

    const iframe = placeholder.parentElement.querySelector('.branch-map');
    const mapSrc = iframe.dataset.src;

    if (mapSrc) {
        iframe.src = mapSrc;
        placeholder.dataset.mapLoaded = 'true';
        // Remove o placeholder após um pequeno atraso para a transição
        setTimeout(() => {
            placeholder.style.display = 'none';
        }, 500);
    }
}

// 🌐 Carregamento Lazy Automático (Usando Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    const mapIframes = document.querySelectorAll('.branch-map');

    if ('IntersectionObserver' in window) {
        
        const mapObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const iframe = entry.target;
                const placeholder = iframe.previousElementSibling; // O placeholder está antes do iframe

                if (entry.isIntersecting && placeholder.dataset.mapLoaded === 'false') {
                    // Carrega o mapa quando o cartão está visível
                    loadMap(placeholder);
                    observer.unobserve(iframe); // Para de observar
                }
            });
        }, {
            // Carrega 200px antes de entrar na tela (rootMargin)
            rootMargin: '0px 0px 200px 0px', 
            threshold: 0.01
        });

        mapIframes.forEach(iframe => {
            mapObserver.observe(iframe);
        });
    } else {
        // Fallback: Carrega todos os mapas se o Intersection Observer não for suportado
        mapIframes.forEach(iframe => {
            loadMap(iframe.previousElementSibling);
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------
    // 1. FUNCIONALIDADE DO BOTÃO MOBILE (Hamburger Menu)
    // ---------------------------------------------
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            // Alterna a classe 'active' para mostrar/esconder o menu
            navLinks.classList.toggle('active');
            
            // Alterna o ícone (opcional, se você mudar o '☰' para um 'X' com CSS ou JS)
            const isMenuOpen = navLinks.classList.contains('active');
            mobileBtn.textContent = isMenuOpen ? '✕' : '☰'; 
            mobileBtn.setAttribute('aria-expanded', isMenuOpen);
        });
    }


    // ---------------------------------------------
    // 2. FUNCIONALIDADE DO DROPDOWN (Cardápio)
    // ---------------------------------------------
    const dropdown = document.querySelector('.dropdown');
    const dropBtn = document.querySelector('.drop-btn');

    if (dropdown && dropBtn) {
        // Quando o botão 'Cardápio' é clicado
        dropBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique feche imediatamente
            dropdown.classList.toggle('open');
            
            // Acessibilidade: atualiza o estado ARIA
            const isMenuOpen = dropdown.classList.contains('open');
            dropBtn.setAttribute('aria-expanded', isMenuOpen);
        });

        // Fechar o dropdown se o usuário clicar fora dele
        document.addEventListener('click', (e) => {
            if (dropdown.classList.contains('open') && !dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                dropBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // ---------------------------------------------
    // 3. CARREGAMENTO LAZY DOS MAPAS (Opcional, para melhorar o desempenho)
    // ---------------------------------------------
    const mapPlaceholders = document.querySelectorAll('.map-placeholder');
    
    // Função para carregar o mapa
    window.loadMap = function(placeholder) {
        const branchCard = placeholder.closest('.branch-card');
        const iframe = branchCard.querySelector('.branch-map');
        
        // Verifica se o mapa ainda não foi carregado
        if (placeholder.getAttribute('data-map-loaded') === 'false') {
            const mapSrc = iframe.getAttribute('data-src');
            
            // Define o src real do iframe (inicia o carregamento)
            iframe.src = mapSrc; 
            
            // Esconde o placeholder e mostra o mapa
            placeholder.style.display = 'none';
            iframe.style.display = 'block'; 
            
            // Marca como carregado para não tentar carregar novamente
            placeholder.setAttribute('data-map-loaded', 'true');
        }
    }
    
    // Configura os iframes para não serem visíveis por padrão
    document.querySelectorAll('.branch-map').forEach(iframe => {
        iframe.style.display = 'none';
        
        // Adiciona um evento para carregar o primeiro mapa ao passar o mouse (pré-carregamento)
        const placeholder = iframe.closest('.branch-card').querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.addEventListener('mouseover', () => loadMap(placeholder), { once: true });
        }
    });
    
    // Carregar o primeiro mapa automaticamente (se desejar)
    // if(mapPlaceholders.length > 0) {
    //     loadMap(mapPlaceholders[0]); 
    // }
});