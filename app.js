document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. HEADER SCROLL & MOBILE MENU
       ========================================== */
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll background change
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle hamburger animation state
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            const bars = menuToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.style.transform = 'none');
            bars[1].style.opacity = '1';
        });
    });

    // Highlight menu link on scroll
    const sections = document.querySelectorAll('section, footer');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 120) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================
       2. SCROLL ANIMATED STATS
       ========================================== */
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    let counted = false;

    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000; // milliseconds
        const step = 20; // refresh rate
        const increment = target / (duration / step);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target.toLocaleString('tr-TR');
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current).toLocaleString('tr-TR');
            }
        }, step);
    };

    if (statsSection && stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    stats.forEach(stat => countUp(stat));
                    counted = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }


    /* ==========================================
       3. INTERACTIVE COST CALCULATOR
       ========================================== */
    const furnitureType = document.getElementById('furniture-type');
    const sizeFactor = document.getElementById('size-factor');
    const sliderLabelsContainer = document.getElementById('slider-labels');
    const sizeFactorGroup = document.getElementById('size-factor-group');
    
    const chkDisassemble = document.getElementById('chk-disassemble');
    const chkWallMount = document.getElementById('chk-wall-mount');
    const chkLed = document.getElementById('chk-led');
    
    const calcPrice = document.getElementById('calc-price');
    const sendQuoteWa = document.getElementById('send-quote-wa');

    // Dynamic slider labels for each furniture type
    const sliderLabelsData = {
        wardrobe: [
            "2 Kapaklı",
            "3 Kapaklı",
            "4 Kapaklı",
            "5 Kapaklı",
            "6+ Kapaklı / Raylı"
        ],
        'tv-unit': [
            "Kompakt (<120cm)",
            "Standart (160cm)",
            "Geniş (200cm)",
            "Duvar Panelli",
            "Büyük Ünite + Kitaplık"
        ],
        bed: [
            "Tek Kişilik",
            "Çift Kişilik / Bazasız",
            "Çift Kişilik + Bazalı",
            "Ranza / Katlı Karyola",
            "Çocuk Odası Karyola Seti"
        ],
        table: [
            "Masa Tek",
            "Masa + 2 Sandalye",
            "Masa + 4 Sandalye",
            "Masa + 6 Sandalye",
            "Masa + 8+ Sandalye"
        ],
        'kitchen-cabinet': [
            "1 Modül / Evye",
            "2-3 Modül Dolap",
            "4-5 Modül Yarım Mutfak",
            "Komple Alt/Üst Set",
            "De-Luxe Ada/Kiler Mutfak"
        ],
        'wall-shelf': [
            "1 Adet Asma",
            "2 Adet Asma",
            "3 Adet Asma",
            "4 Adet Asma",
            "5+ Adet / Korniş Seti"
        ],
        'chest-drawers': [
            "2-3 Çekmeceli",
            "4 Çekmeceli",
            "5 Çekmeceli",
            "6+ Çekmeceli Şifonyer",
            "Komple Set Şifonyer + Ayna"
        ]
    };

    const activeSliderVal = document.getElementById('active-slider-val');

    const updateActiveValue = () => {
        if (!sizeFactor || !furnitureType) return;
        const selectedType = furnitureType.value;
        const labels = sliderLabelsData[selectedType] || [];
        const currentVal = parseInt(sizeFactor.value, 10);
        const labelText = labels[currentVal - 1] || `${currentVal}. Kademe`;
        
        if (activeSliderVal) {
            activeSliderVal.textContent = labelText;
        }

        const spans = sliderLabelsContainer.querySelectorAll('span');
        spans.forEach((span, idx) => {
            if (idx === currentVal - 1) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });
    };

    const updateSliderLabels = () => {
        const selectedType = furnitureType.value;
        const labels = sliderLabelsData[selectedType] || sliderLabelsData['wardrobe'];
        
        sliderLabelsContainer.innerHTML = '';
        labels.forEach(label => {
            const span = document.createElement('span');
            span.textContent = label;
            sliderLabelsContainer.appendChild(span);
        });

        sizeFactor.min = 1;
        sizeFactor.max = 5;
        updateActiveValue();
    };

    // Listeners for Calculator inputs
    if (furnitureType && sizeFactor) {
        furnitureType.addEventListener('change', updateSliderLabels);
        sizeFactor.addEventListener('input', updateActiveValue);
        
        // Initial trigger
        updateSliderLabels();
    }

    // Send quote details to WhatsApp
    if (sendQuoteWa) {
        sendQuoteWa.addEventListener('click', () => {
            const mobilyaLabel = furnitureType.options[furnitureType.selectedIndex].text;
            const currentVal = parseInt(sizeFactor.value, 10);
            const labels = sliderLabelsData[furnitureType.value] || [];
            const sizeLabel = labels[currentVal - 1] || `${currentVal}. Kademe`;
            
            let extras = [];
            if (chkDisassemble.checked) extras.push("Söküm");
            if (chkWallMount.checked) extras.push("Duvara Sabitleme");
            if (chkLed.checked) extras.push("LED Işıklandırma");
            const extrasText = extras.length > 0 ? extras.join(', ') : 'Yok';

            const phone = "905310800300";
            const text = `Merhaba! Web sitenizdeki teklif formundan ulaşıyorum:
            
🔮 *Mobilya Türü:* ${mobilyaLabel} (${sizeLabel})
🛠️ *Ekstra İstekler:* ${extrasText}

Bu montaj kurulum işi için fiyat teklifi alabilir miyim?`;

            const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
            window.open(waLink, '_blank');
        });
    }


    /* ==========================================
       4. DISTRICT SERVICE GATEWAY (REGION SEARCH & FILTER)
       ========================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const regionSearch = document.getElementById('region-search');
    const regionItems = document.querySelectorAll('.region-item');
    const regionStatusText = document.getElementById('region-status-text');
    const regionStatusBox = document.getElementById('region-status-box');

    let currentFilter = 'all';
    let searchQuery = '';

    const filterRegions = () => {
        regionItems.forEach(item => {
            const side = item.getAttribute('data-side');
            const name = item.textContent.toLowerCase();
            
            const matchesTab = (currentFilter === 'all') || (side === currentFilter);
            const matchesSearch = name.includes(searchQuery.toLowerCase());

            if (matchesTab && matchesSearch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    // Filter tabs click handler
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterRegions();
        });
    });

    // Search input change handler
    if (regionSearch) {
        regionSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterRegions();
        });
    }

    // Region item click handler
    regionItems.forEach(item => {
        item.addEventListener('click', () => {
            regionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const regionName = item.textContent;
            
            // Randomly simulate usta counts for visual magic (between 2 and 4)
            const activeUsta = Math.floor(Math.random() * 3) + 2;
            const minDuration = 30 + Math.floor(Math.random() * 20); // 30-50 min
            
            regionStatusText.innerHTML = `Harika! <strong>${regionName}</strong> bölgesinde şu an <strong>${activeUsta} aktif usta</strong> hazır bekliyor. Ekspres ulaşım süremiz yaklaşık <strong>${minDuration} dakikadır</strong>!`;
            
            // Glow border effect on status box
            regionStatusBox.style.borderColor = 'var(--color-cyan)';
            regionStatusBox.style.boxShadow = 'var(--glow-cyan)';
            
            setTimeout(() => {
                regionStatusBox.style.borderColor = 'var(--border-glass)';
                regionStatusBox.style.boxShadow = 'none';
            }, 1000);
        });
    });


    /* ==========================================
       5. CLIENT REVIEWS TESTIMONIAL SLIDER
       ========================================== */
    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('#slider-dots .dot');
    let currentIndex = 0;
    const slidesCount = dots.length;

    const updateSlider = (index) => {
        currentIndex = index;
        
        // Handle transform transition
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Update active dots
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Dot click listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Auto loop slide
    let autoSlideInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slidesCount;
        updateSlider(nextIndex);
    }, 6000);

    // Stop auto slider when user clicks dot
    const resetInterval = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slidesCount;
            updateSlider(nextIndex);
        }, 6000);
    };

    dots.forEach(dot => dot.addEventListener('click', resetInterval));


    /* ==========================================
       6. ACCORDION (FAQ CONTROLLER)
       ========================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-body').style.maxHeight = '0';
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Toggle item
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = `${body.scrollHeight}px`;
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

});
