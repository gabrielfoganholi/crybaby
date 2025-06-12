document.addEventListener('DOMContentLoaded', function() {
    // --- Controle de Áudio ---
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');

    // Tenta tocar a música automaticamente (pode ser bloqueado)
    backgroundMusic.play().catch(e => {
        console.log("Reprodução automática de áudio bloqueada. O usuário precisará interagir.");
    });

    playPauseButton.addEventListener('click', function() {
        const icon = playPauseButton.querySelector('i');
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            playPauseButton.textContent = ' Pausar Música'; // Mude o texto
            playPauseButton.prepend(icon); // Reinsere o ícone
        } else {
            backgroundMusic.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            playPauseButton.textContent = ' Tocar Música'; // Mude o texto
            playPauseButton.prepend(icon); // Reinsere o ícone
        }
    });

    backgroundMusic.addEventListener('playing', () => {
        const icon = playPauseButton.querySelector('i');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        playPauseButton.textContent = ' Pausar Música';
        playPauseButton.prepend(icon);
    });

    backgroundMusic.addEventListener('pause', () => {
        const icon = playPauseButton.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        playPauseButton.textContent = ' Tocar Música';
        playPauseButton.prepend(icon);
    });

    // --- Carrossel de Fotos ---
    document.querySelectorAll('.carousel-container').forEach(container => {
        const carouselSlide = container.querySelector('.carousel-slide');
        const images = carouselSlide.querySelectorAll('img');
        const prevBtn = container.querySelector('.carousel-nav.prev');
        const nextBtn = container.querySelector('.carousel-nav.next');

        let currentIndex = 0;
        const totalImages = images.length;

        // Função para atualizar a posição do slide
        function updateCarousel() {
            const imageWidth = images[0].clientWidth; // Largura de uma imagem
            carouselSlide.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
        }

        // Navegação
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });

        // Adapta o carrossel ao redimensionar a janela
        window.addEventListener('resize', updateCarousel);

        // Inicializa o carrossel (garante que a largura esteja correta no carregamento)
        updateCarousel();
    });

    // --- Animação de Rolagem (Reveal Effect) ---
    const revealElements = document.querySelectorAll('.story-chapter, .final-message-section');

    const observerOptions = {
        root: null, // viewport como root
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível para disparar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // --- Animação da Caixinha de Presente no Clique ---
    const giftBoxButton = document.getElementById('giftBoxButton');

    if (giftBoxButton) { // Garante que o elemento existe
        giftBoxButton.addEventListener('click', function() {
            giftBoxButton.classList.add('opened'); // Adiciona a classe para disparar a animação
            // Opcional: remover a instrução de clique depois de abrir
            const clickInstruction = document.querySelector('.click-instruction');
            if (clickInstruction) {
                clickInstruction.style.display = 'none';
            }
        });
    }
});