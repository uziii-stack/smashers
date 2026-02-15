document.addEventListener('DOMContentLoaded', () => {
    const mobileSearchTrigger = document.querySelector('.mobile-search-trigger');
    const mobileSearchBar = document.getElementById('mobile-search-bar');
    const mobileSearchClose = document.getElementById('mobile-search-close');

    if (mobileSearchTrigger && mobileSearchBar && mobileSearchClose) {
        mobileSearchTrigger.addEventListener('click', () => {
            mobileSearchBar.classList.toggle('active');
            if (mobileSearchBar.classList.contains('active')) {
                mobileSearchBar.querySelector('input').focus();
            }
        });

        mobileSearchClose.addEventListener('click', () => {
            mobileSearchBar.classList.remove('active');
        });

        // Close search bar when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileSearchBar.contains(e.target) && !mobileSearchTrigger.contains(e.target)) {
                mobileSearchBar.classList.remove('active');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }



    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Sidebar Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    function openSidebar() {
        mobileSidebar.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openSidebar);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeSidebar);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeSidebar);
    }

    // Hero Slider Functionality
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Auto-play slider (optional - every 5 seconds)
    // Auto-play slider (optional - every 5 seconds)
    if (slides.length > 1) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // === Product Showcase Tab Functionality ===
    const tabButtons = document.querySelectorAll('.tab-btn');
    const showcaseImage = document.getElementById('showcase-dynamic-image');

    // Define tab images (customize these URLs for each tab)
    const tabImages = {
        havoc: 'https://smashersports.co.uk/wp-content/uploads/2023/01/2.png',
        imperia: 'https://smashersports.co.uk/wp-content/uploads/2023/01/2.png',
        neocore: 'https://smashersports.co.uk/wp-content/uploads/2023/01/3.png',
        gem: 'https://smashersports.co.uk/wp-content/uploads/2023/01/4.png',
        classic: 'https://smashersports.co.uk/wp-content/uploads/2023/01/5.png',
        legend: 'https://smashersports.co.uk/wp-content/uploads/2023/01/6.png'
    };

    if (tabButtons.length > 0 && showcaseImage) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked tab
                button.classList.add('active');

                // Get the tab name
                const tabName = button.getAttribute('data-tab');

                // Fade out image
                showcaseImage.classList.add('fade-out');

                // Change image after fade out
                setTimeout(() => {
                    showcaseImage.src = tabImages[tabName];
                    showcaseImage.classList.remove('fade-out');
                }, 200);
            });
        });
    }

    // === Trending Products Premium Slider Logic (Infinite) ===
    const trendingSlider = document.getElementById('trending-slider');
    const trendingPrevBtn = document.querySelector('.prev-trending');
    const trendingNextBtn = document.querySelector('.next-trending');

    if (trendingSlider && trendingPrevBtn && trendingNextBtn) {
        const items = Array.from(trendingSlider.children);
        if (items.length > 0) {
            // Clone items for infinite effect
            const cloneCount = 4; // Number of items to clone on each side

            // Append clones
            for (let i = 0; i < cloneCount; i++) {
                const clone = items[i % items.length].cloneNode(true);
                trendingSlider.appendChild(clone);
            }

            // Prepend clones
            for (let i = 0; i < cloneCount; i++) {
                const clone = items[(items.length - 1 - i) % items.length].cloneNode(true);
                trendingSlider.prepend(clone);
            }

            // Function to get accurate item width including gap
            const getItemWidth = () => {
                const card = trendingSlider.querySelector('.premium-card');
                const style = window.getComputedStyle(trendingSlider);
                const gap = parseInt(style.gap) || 0;
                return (card.offsetWidth + gap) || 300;
            };

            // Set initial position to skip prepended clones
            const initialScroll = () => {
                trendingSlider.scrollLeft = cloneCount * getItemWidth();
            };

            // Initialize
            initialScroll();
            window.addEventListener('resize', initialScroll);

            // Handle Navigation Buttons
            trendingNextBtn.addEventListener('click', () => {
                trendingSlider.scrollBy({
                    left: getItemWidth(),
                    behavior: 'smooth'
                });
            });

            trendingPrevBtn.addEventListener('click', () => {
                trendingSlider.scrollBy({
                    left: -getItemWidth(),
                    behavior: 'smooth'
                });
            });

            // Handle Infinite Jump
            trendingSlider.addEventListener('scroll', () => {
                const itemWidth = getItemWidth();
                const totalItems = items.length;
                const scrollPos = trendingSlider.scrollLeft;

                // Thresholds for jumping
                const leftThreshold = (cloneCount - 1) * itemWidth;
                const rightThreshold = (totalItems + cloneCount - 1) * itemWidth;

                if (scrollPos < leftThreshold) {
                    // Temporarily disable smooth scroll and snap for instant jump
                    trendingSlider.style.scrollBehavior = 'auto';
                    trendingSlider.style.scrollSnapType = 'none';
                    trendingSlider.scrollLeft = scrollPos + (totalItems * itemWidth);
                    // Force reflow
                    trendingSlider.offsetHeight;
                    trendingSlider.style.scrollBehavior = 'smooth';
                    trendingSlider.style.scrollSnapType = 'x mandatory';
                }
                else if (scrollPos > rightThreshold) {
                    trendingSlider.style.scrollBehavior = 'auto';
                    trendingSlider.style.scrollSnapType = 'none';
                    trendingSlider.scrollLeft = scrollPos - (totalItems * itemWidth);
                    trendingSlider.offsetHeight;
                    trendingSlider.style.scrollBehavior = 'smooth';
                    trendingSlider.style.scrollSnapType = 'x mandatory';
                }
            });
        }
    }

    // === Mobile Footer Accordion ===
    const footerAccordionHeaders = document.querySelectorAll('.footer-accordion-header');

    footerAccordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Only toggle on mobile screens (< 1024px)
            if (window.innerWidth >= 1024) return;

            const parentNode = header.parentElement;
            const toggleIcon = header.querySelector('.footer-toggle');

            // Toggle active class
            parentNode.classList.toggle('footer-active');

            // Toggle Icon
            if (parentNode.classList.contains('footer-active')) {
                toggleIcon.classList.remove('fa-plus');
                toggleIcon.classList.add('fa-minus');
            } else {
                toggleIcon.classList.remove('fa-minus');
                toggleIcon.classList.add('fa-plus');
            }
        });
    });

    // === Showcase Slider Navigation ===
    const showcaseSlider = document.querySelector('.showcase-products-scroll');
    const showcasePrevBtns = document.querySelectorAll('.prev-showcase');
    const showcaseNextBtns = document.querySelectorAll('.next-showcase');

    if (showcaseSlider) {
        const scrollAmount = 300;

        showcasePrevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                showcaseSlider.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        });

        showcaseNextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                showcaseSlider.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        });
    }

    // === Trust Section Swipe Gesture ===
    const trustGrid = document.querySelector('.trust-grid');
    if (trustGrid) {
        let isDown = false;
        let startX;
        let scrollLeft;

        trustGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            trustGrid.classList.add('active');
            startX = e.pageX - trustGrid.offsetLeft;
            scrollLeft = trustGrid.scrollLeft;
        });
        trustGrid.addEventListener('mouseleave', () => {
            isDown = false;
            trustGrid.classList.remove('active');
        });
        trustGrid.addEventListener('mouseup', () => {
            isDown = false;
            trustGrid.classList.remove('active');
        });
        trustGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - trustGrid.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            trustGrid.scrollLeft = scrollLeft - walk;
        });
        // Touch events for mobile
        trustGrid.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - trustGrid.offsetLeft;
            scrollLeft = trustGrid.scrollLeft;
        }, { passive: true });

        trustGrid.addEventListener('touchend', () => {
            isDown = false;
        });

        trustGrid.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - trustGrid.offsetLeft;
            const walk = (x - startX) * 1.5;
            trustGrid.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    }

    // === Best Sellers Premium Slider Logic (Helmets) ===
    const bestSellersSlider = document.getElementById('helmet-slider');
    const bestSellersPrevBtn = document.querySelector('.prev-best');
    const bestSellersNextBtn = document.querySelector('.next-best');

    if (bestSellersSlider && bestSellersPrevBtn && bestSellersNextBtn) {
        const getScrollAmount = () => {
            const card = bestSellersSlider.querySelector('.premium-card');
            const style = window.getComputedStyle(bestSellersSlider);
            const gap = parseInt(style.gap) || 0;
            return (card.offsetWidth + gap) || 300;
        };

        bestSellersNextBtn.addEventListener('click', () => {
            bestSellersSlider.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        bestSellersPrevBtn.addEventListener('click', () => {
            bestSellersSlider.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // --- Progress Bar Sync ---
        const progressBar = document.querySelector('.helmet-progress');
        if (progressBar) {
            bestSellersSlider.addEventListener('scroll', () => {
                const scrollLeft = bestSellersSlider.scrollLeft;
                const scrollWidth = bestSellersSlider.scrollWidth;
                const clientWidth = bestSellersSlider.clientWidth;
                const maxScroll = scrollWidth - clientWidth;

                if (maxScroll > 0) {
                    const scrollPercent = (scrollLeft / maxScroll) * 100;
                    const indicatorWidthPercent = parseFloat(window.getComputedStyle(progressBar).width) / parseFloat(window.getComputedStyle(progressBar.parentElement).width) * 100;
                    const moveRange = 100 - indicatorWidthPercent;
                    const translateX = (scrollPercent / 100) * moveRange;

                    progressBar.style.transform = `translateX(${translateX}%)`;
                }
            });
        }
    }

    // === Cricket Insights (Blog) Slider Logic ===
    const blogSlider = document.getElementById('blog-slider');
    const blogPrevBtn = document.querySelector('.prev-blog');
    const blogNextBtn = document.querySelector('.next-blog');

    if (blogSlider && blogPrevBtn && blogNextBtn) {
        const getBlogScrollAmount = () => {
            const card = blogSlider.querySelector('.premium-blog-card');
            const style = window.getComputedStyle(blogSlider);
            const gap = parseInt(style.gap) || 0;
            return (card.offsetWidth + gap) || 300;
        };

        blogNextBtn.addEventListener('click', () => {
            blogSlider.scrollBy({
                left: getBlogScrollAmount(),
                behavior: 'smooth'
            });
        });

        blogPrevBtn.addEventListener('click', () => {
            blogSlider.scrollBy({
                left: -getBlogScrollAmount(),
                behavior: 'smooth'
            });
        });

        // --- Blog Progress Bar Sync ---
        const blogProgressBar = document.querySelector('.blog-progress');
        if (blogProgressBar) {
            blogSlider.addEventListener('scroll', () => {
                const scrollLeft = blogSlider.scrollLeft;
                const scrollWidth = blogSlider.scrollWidth;
                const clientWidth = blogSlider.clientWidth;
                const maxScroll = scrollWidth - clientWidth;

                if (maxScroll > 0) {
                    const scrollPercent = (scrollLeft / maxScroll) * 100;
                    const indicatorWidthPercent = parseFloat(window.getComputedStyle(blogProgressBar).width) / parseFloat(window.getComputedStyle(blogProgressBar.parentElement).width) * 100;
                    const moveRange = 100 - indicatorWidthPercent;
                    const translateX = (scrollPercent / 100) * moveRange;

                    blogProgressBar.style.transform = `translateX(${translateX}%)`;
                }
            });
        }
    }

    // === Shop By Category Slider Logic (Enhanced with Drag-Scroll) ===
    const categorySlider = document.getElementById('category-slider');
    const categoryPrevBtn = document.querySelector('.prev-cat');
    const categoryNextBtn = document.querySelector('.next-cat');
    const catProgressBar = document.getElementById('category-progress');

    if (categorySlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        const getCatScrollAmount = () => {
            const item = categorySlider.querySelector('.category-item');
            const style = window.getComputedStyle(categorySlider);
            const gap = parseInt(style.gap) || 0;
            return (item.offsetWidth + gap) || 250;
        };

        // Arrow Navigation
        if (categoryNextBtn) {
            categoryNextBtn.addEventListener('click', () => {
                categorySlider.scrollBy({ left: getCatScrollAmount(), behavior: 'smooth' });
            });
        }
        if (categoryPrevBtn) {
            categoryPrevBtn.addEventListener('click', () => {
                categorySlider.scrollBy({ left: -getCatScrollAmount(), behavior: 'smooth' });
            });
        }

        // Mouse Drag Interaction
        categorySlider.addEventListener('mousedown', (e) => {
            isDown = true;
            categorySlider.classList.add('active');
            startX = e.pageX - categorySlider.offsetLeft;
            scrollLeft = categorySlider.scrollLeft;
            categorySlider.style.scrollBehavior = 'auto'; // Disable smooth scroll during drag
        });

        categorySlider.addEventListener('mouseleave', () => {
            isDown = false;
            categorySlider.style.scrollBehavior = 'smooth';
        });

        categorySlider.addEventListener('mouseup', () => {
            isDown = false;
            categorySlider.style.scrollBehavior = 'smooth';
        });

        categorySlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - categorySlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            categorySlider.scrollLeft = scrollLeft - walk;
        });

        // Touch Drag Interaction
        categorySlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - categorySlider.offsetLeft;
            scrollLeft = categorySlider.scrollLeft;
            categorySlider.style.scrollBehavior = 'auto';
        }, { passive: true });

        categorySlider.addEventListener('touchend', () => {
            isDown = false;
            categorySlider.style.scrollBehavior = 'smooth';
        });

        categorySlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - categorySlider.offsetLeft;
            const walk = (x - startX) * 1.5;
            categorySlider.scrollLeft = scrollLeft - walk;
        }, { passive: true });

        // Progress Bar Sync
        if (catProgressBar) {
            categorySlider.addEventListener('scroll', () => {
                const sl = categorySlider.scrollLeft;
                const sw = categorySlider.scrollWidth;
                const cw = categorySlider.clientWidth;
                const max = sw - cw;

                if (max > 0) {
                    const pct = (sl / max) * 100;
                    const indicatorWidthPct = (cw / sw) * 100; // Correct width based on view/total ratio
                    const moveRange = 100 - indicatorWidthPct;
                    const translateX = (pct / 100) * moveRange;

                    catProgressBar.style.width = `${indicatorWidthPct}%`;
                    catProgressBar.style.transform = `translateX(${translateX}%)`;
                }
            });
        }
    }

    // === Modern Product Slider (Best Sellers) Logic ===
    const modernSlider = document.querySelector('.modern-product-grid');
    const modernPrevBtn = document.querySelector('.prev-modern');
    const modernNextBtn = document.querySelector('.next-modern');

    if (modernSlider && modernPrevBtn && modernNextBtn) {
        const getModernScrollAmount = () => {
            const card = modernSlider.querySelector('.modern-product-card');
            if (!card) return 300;
            const style = window.getComputedStyle(modernSlider);
            const gap = parseInt(style.gap) || 0;
            return (card.offsetWidth + gap) || 300;
        };

        modernNextBtn.addEventListener('click', () => {
            modernSlider.scrollBy({
                left: getModernScrollAmount(),
                behavior: 'smooth'
            });
        });

        modernPrevBtn.addEventListener('click', () => {
            modernSlider.scrollBy({
                left: -getModernScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

});
