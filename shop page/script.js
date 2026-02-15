document.addEventListener('DOMContentLoaded', () => {
    // 1. Sort Dropdown Toggle
    const sortToggle = document.getElementById('sortToggle');
    const sortOptions = document.getElementById('sortOptions');

    if (sortToggle && sortOptions) {
        sortToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sortOptions.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            sortOptions.classList.remove('active');
        });

        // Update active sort option (visual only)
        sortOptions.querySelectorAll('a').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                sortToggle.innerHTML = `${e.target.innerText} <span class="arrow">▼</span>`;
                sortOptions.classList.remove('active');
            });
        });
    }

    // 2. Category Filter (Visual State)
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Faking a filter delay
            const grid = document.getElementById('productGrid');
            grid.style.opacity = '0.5';
            setTimeout(() => {
                grid.style.opacity = '1';
                console.log(`Filtering by: ${link.dataset.category}`);
            }, 300);
        });
    });

    // 3. Price Slider UI Update
    const priceSlider = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceSlider && priceValue) {
        priceSlider.addEventListener('input', (e) => {
            priceValue.textContent = e.target.value;
        });
    }

    // 4. Pagination (Visual State)
    const pageLinks = document.querySelectorAll('.page-num');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            pageLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Scroll to shop top smoothly
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 5. Add to Cart (Mock notification)
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Product added to cart!');
        });
    });

    // 6. Hero Carousel Logic
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        if (index >= carouselItems.length) currentSlide = 0;
        else if (index < 0) currentSlide = carouselItems.length - 1;
        else currentSlide = index;

        carouselItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        carouselItems[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(carouselInterval);
        startAutoPlay();
    }

    if (carouselItems.length > 0) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoPlay();
            });
        });

        startAutoPlay();
    }
});
