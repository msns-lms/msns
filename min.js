
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const sidebar = document.getElementById('sidebar');
        const menuOverlay = document.getElementById('menuOverlay');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            menuOverlay.classList.add('active');
        });

        const hideMenuHub = () => {
            sidebar.classList.remove('active');
            menuOverlay.classList.remove('active');
        };

        closeMenu.addEventListener('click', hideMenuHub);
        menuOverlay.addEventListener('click', hideMenuHub);

        document.querySelectorAll('.menu-item[href^="#"]').forEach(link => {
            link.addEventListener('click', hideMenuHub);
        });
              // Governing Body Auto Slider Logic
        const track = document.getElementById('governingTrack');
        const dotsContainer = document.getElementById('sliderDots');

        if (track && dotsContainer) {
            const cards = track.querySelectorAll('.people-card');
            let currentIndex = 0;

            // Dynamically create dots
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');

            function goToSlide(index) {
                currentIndex = index;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }

            function autoSlide() {
                currentIndex = (currentIndex + 1) % cards.length;
                goToSlide(currentIndex);
            }

            // Change slide every 3.5 seconds
            let slideInterval = setInterval(autoSlide, 3500);

            // Pause auto sliding on hover
            const sliderElem = document.querySelector('.governing-slider');
            if (sliderElem) {
                sliderElem.addEventListener('mouseenter', () => clearInterval(slideInterval));
                sliderElem.addEventListener('mouseleave', () => {
                    slideInterval = setInterval(autoSlide, 3500);
                });
            }
        };
document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Toggle Logic ---
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle && sidebar && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            menuOverlay.classList.add('active');
        });

        const hideSidebar = () => {
            sidebar.classList.remove('active');
            menuOverlay.classList.remove('active');
        };

        if (closeMenu) closeMenu.addEventListener('click', hideSidebar);
        menuOverlay.addEventListener('click', hideSidebar);

        document.querySelectorAll('.menu-item[href^="#"]').forEach(link => {
            link.addEventListener('click', hideSidebar);
        });
    }

    // --- Back to Top Logic ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        };

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Donut Chart Animation Logic (78% Pass Rate) ---
    const passCircle = document.getElementById('passCircle');
    const counterValue = document.getElementById('counterValue');
    const targetPassRate = 78; // 78% Pass Rate

    let hasAnimated = false;

    function animateChart() {
        if (hasAnimated) return;
        hasAnimated = true;

        // 1. SVG Circle Fill Animation
        setTimeout(() => {
            if (passCircle) {
                passCircle.style.strokeDasharray = `${targetPassRate}, 100`;
            }
        }, 200);

        // 2. Percentage Counter Animation (0% to 78%)
        let startVal = 0;
        const duration = 2000; // 2 Seconds
        const intervalTime = Math.floor(duration / targetPassRate);

        const counterInterval = setInterval(() => {
            startVal++;
            if (counterValue) {
                counterValue.textContent = startVal;
            }
            if (startVal >= targetPassRate) {
                clearInterval(counterInterval);
            }
        }, intervalTime);
    }

    // Intersection Observer to trigger chart animation when visible on screen
    const chartCard = document.querySelector('.chart-card');
    if (chartCard && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateChart();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(chartCard);
    } else {
        // Fallback for older browsers
        animateChart();
    }
});
        document.addEventListener("DOMContentLoaded", () => {
            const counter = document.getElementById("counterValue");
            if (counter) {
                let count = 0;
                const target = 78;
                const duration = 2000; // 2 seconds (Animation එකට සමානයි)
                const stepTime = Math.floor(duration / target);

                const timer = setInterval(() => {
                    count += 1;
                    counter.textContent = count;
                    if (count >= target) {
                        clearInterval(timer);
                    }
                }, stepTime);
            }
        });
// Desktop Mouse Drag-to-Scroll Support for News Section
const newsSlider = document.querySelector('.news-slider-container');

if (newsSlider) {
    let isMouseDown = false;
    let startX;
    let scrollLeftPos;

    newsSlider.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        newsSlider.style.cursor = 'grabbing';
        startX = e.pageX - newsSlider.offsetLeft;
        scrollLeftPos = newsSlider.scrollLeft;
    });

    newsSlider.addEventListener('mouseleave', () => {
        isMouseDown = false;
        newsSlider.style.cursor = 'default';
    });

    newsSlider.addEventListener('mouseup', () => {
        isMouseDown = false;
        newsSlider.style.cursor = 'default';
    });

    newsSlider.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - newsSlider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        newsSlider.scrollLeft = scrollLeftPos - walk;
    });
}
