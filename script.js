document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .person-card, .company-card, .impact-card, .nav-link, .tag').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .person-card, .company-card, .impact-card').forEach(el => {
        fadeInObserver.observe(el);
    });

    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - scrolled / 700;
        }
    });

    const particles = document.querySelector('.particles');
    if (particles) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 217, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particles.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { 
                    transform: translate(0, 0); 
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                50% { 
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'none';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 10);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    const personCards = document.querySelectorAll('.person-card');
    personCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    const personModal = document.getElementById('person-modal');
    const personModalClose = personModal ? personModal.querySelector('.person-modal-close') : null;
    const personModalImage = document.getElementById('person-modal-image');
    const personModalName = document.getElementById('person-modal-name');
    const personModalRole = document.getElementById('person-modal-role');
    const personModalDescription = document.getElementById('person-modal-description');
    const personModalExtra = document.getElementById('person-modal-extra');

    const personDetails = {
        'steve-jobs': {
            extra: 'Steve Jobs (1955-2011) a fost antreprenor american, co-fondator Apple Inc. și una dintre cele mai influente figuri din industria tehnologică.\nA revenit la Apple în 1997, a restructurat compania și a condus lansarea produselor Macintosh moderne, iPod, iPhone și iPad.\nA impus o filozofie bazată pe simplitate, integrare hardware-software și experiență premium pentru utilizator, transformând Apple într-un reper global al inovației.'
        },
        'bill-gates': {
            extra: 'Bill Gates (n. 1955) este antreprenor, programator și filantrop american, co-fondator Microsoft alături de Paul Allen.\nSub conducerea sa, Microsoft a popularizat sistemul Windows și suita Office, contribuind decisiv la răspândirea calculatorului personal în mediul educațional și de business.\nDupă retragerea din managementul zilnic, s-a concentrat pe proiecte filantropice prin Bill & Melinda Gates Foundation, cu impact major în sănătate publică și educație.'
        },
        'elon-musk': {
            extra: 'Elon Musk (n. 1971) este antreprenor tehnologic cunoscut pentru rolurile de leadership în Tesla, SpaceX, Neuralink și alte companii de frontieră.\nLa Tesla, a accelerat adoptarea vehiculelor electrice la scară globală, iar prin SpaceX a redus costurile lansărilor spațiale folosind rachete reutilizabile.\nViziunea sa se concentrează pe tranziția energetică, explorarea spațiului și dezvoltarea tehnologiilor avansate cu impact pe termen lung.'
        },
        'mark-zuckerberg': {
            extra: 'Mark Zuckerberg (n. 1984) este programator și antreprenor american, fondator al Facebook (astăzi Meta Platforms).\nA construit una dintre cele mai mari platforme sociale din lume, cu miliarde de utilizatori și o influență majoră asupra comunicării digitale.\nÎn ultimii ani, a orientat strategia Meta către realitate virtuală și augmentată, promovând conceptul de metavers ca etapă următoare a internetului.'
        },
        'larry-page': {
            extra: 'Larry Page (n. 1973) este informatician american și co-fondator Google, alături de Sergey Brin, pornind de la proiectul universitar PageRank.\nA fost esențial în transformarea Google din motor de căutare într-un ecosistem complet de produse: Android, Chrome, YouTube, cloud și servicii AI.\nCa lider al Google și ulterior Alphabet, a susținut proiecte de cercetare ambițioase, cu accent pe automatizare și inovație la scară largă.'
        },
        'sergey-brin': {
            extra: 'Sergey Brin (n. 1973) este informatician și antreprenor american, co-fondator Google împreună cu Larry Page.\nA avut un rol central în dezvoltarea timpurie a motorului de căutare și în arhitectura tehnică ce a permis scalarea rapidă a serviciilor Google.\nEste cunoscut pentru interesul față de proiecte experimentale și cercetare avansată, contribuind la cultura de inovație continuă din cadrul companiei.'
        }
    };

    function openPersonModal(card) {
        if (!personModal || !card) return;

        const personKey = card.dataset.person;
        const img = card.querySelector('.person-image img');
        const name = card.querySelector('.person-info h3');
        const role = card.querySelector('.person-role');
        const description = card.querySelector('.person-description');
        const details = personDetails[personKey];

        if (!img || !name || !role || !description || !details) return;

        personModalImage.src = img.src;
        personModalImage.alt = img.alt;
        personModalName.textContent = name.textContent;
        personModalRole.textContent = role.textContent;
        personModalDescription.textContent = description.textContent;
        personModalExtra.textContent = details.extra;

        personModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePersonModal() {
        if (!personModal) return;
        personModal.classList.remove('active');
        if (!document.getElementById('google-modal')?.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }

    personCards.forEach(card => {
        card.addEventListener('click', () => openPersonModal(card));
    });

    if (personModal && personModalClose) {
        personModalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closePersonModal();
        });

        personModal.addEventListener('click', (e) => {
            if (e.target === personModal) {
                closePersonModal();
            }
        });
    }

    const companyCards = document.querySelectorAll('.company-card');
    companyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            const icon = this.querySelector('.company-icon');
            if (icon) {
                icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.15) rotate(5deg)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.company-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 5;
            const moveY = (y - centerY) / 5;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-5px) scale(1.05)`;
        });

        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }

    const impactCards = document.querySelectorAll('.impact-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-item .number');
                stats.forEach(stat => {
                    animateNumber(stat);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    impactCards.forEach(card => {
        cardObserver.observe(card);
    });

    function animateNumber(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasMinus = text.includes('-');
        const hasPercent = text.includes('%');
        const hasDollar = text.includes('$');
        const hasB = text.includes('B');
        const hasM = text.includes('M');
        const hasT = text.includes('T');
        
        let numberStr = text.replace(/[^0-9.]/g, '');
        const number = parseFloat(numberStr);
        
        if (isNaN(number)) return;

        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;

            let displayValue = current.toFixed(1);
            if (number >= 10 && !text.includes('.')) {
                displayValue = Math.floor(current).toString();
            }

            let finalText = '';
            if (hasDollar) finalText += '$';
            if (hasMinus) finalText = '-' + finalText;
            finalText += displayValue;
            if (hasT) finalText += 'T';
            if (hasB) finalText += 'B';
            if (hasM) finalText += 'M';
            if (hasPlus) finalText += '+';
            if (hasPercent) finalText += '%';

            element.textContent = finalText;

            if (step >= steps) {
                element.textContent = text;
                clearInterval(timer);
            }
        }, duration / steps);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchTitle.style.transform = `skew(${Math.random() * 2 - 1}deg)`;
                setTimeout(() => {
                    glitchTitle.style.transform = '';
                }, 100);
            }
        }, 200);
    }

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.particles::before, .particles::after').forEach((el, index) => {
            const speed = index === 0 ? 20 : 30;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
        });
    });

    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    console.log('%c🚀 Silicon Valley - Atestat Informatică', 'font-size: 20px; font-weight: bold; color: #00D9FF;');
    console.log('%cCreat de: Cristian Eduard-Mihai', 'font-size: 14px; color: #A0AEC0;');
    console.log('%cColegiul Național "Vladimir Streinu" Găești', 'font-size: 12px; color: #A0AEC0;');
    console.log('%c\nDesign inspirat de: Apple, Google, Tesla\n⚡ Tehnologii: HTML5, CSS3, Vanilla JavaScript', 'font-size: 11px; color: #667eea;');
    
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    let clickTimer;

    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            
            if (clickCount === 3) {
                const colors = ['#00D9FF', '#7B2FFF', '#FF2E97', '#00f2fe', '#43e97b'];
                let colorIndex = 0;
                
                const interval = setInterval(() => {
                    document.body.style.setProperty('--primary', colors[colorIndex]);
                    colorIndex = (colorIndex + 1) % colors.length;
                }, 200);

                setTimeout(() => {
                    clearInterval(interval);
                    document.body.style.setProperty('--primary', '#00D9FF');
                }, 3000);

                console.log('%c🎉 EASTER EGG ACTIVAT! 🎉', 'font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #00D9FF, #7B2FFF, #FF2E97); -webkit-background-clip: text; color: transparent;');
                
                clickCount = 0;
            }

            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            console.clear();
            console.log('%cDeveloper Mode Activated', 'font-size: 18px; color: #43e97b;');
            console.log('%cBine ai venit în modul dezvoltator!', 'font-size: 14px; color: #00D9FF;');
        }
    });

    // Google HQ Modal Popup 
    const googleCard = document.getElementById('google-card');
    const modal = document.getElementById('google-modal');
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const modalOverlay = modal;
    
    if (googleCard && modal) {
        // Open modal on Google card click
        googleCard.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Console Easter Egg
            setTimeout(() => {
                console.log('%c🎉 SECRET UNLOCKED! 🎉', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #00D9FF, #7B2FFF, #FF2E97); padding: 10px 20px; border-radius: 8px; color: white;');
                console.log('%cAm dat și pe acolo... la Google HQ în Mountain View!', 'font-size: 16px; color: #00D9FF; font-weight: bold;');
                console.log('%cPro tip: Explorează și celelalte company cards!', 'font-size: 14px; color: #7B2FFF;');
            }, 300);
        });
        
        // Close modal on close button click
        if (modalClose) {
            modalClose.addEventListener('click', (e) => {
                e.stopPropagation();
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal on overlay click (but not on container click)
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    modal.classList.remove('active');
                    if (!personModal?.classList.contains('active')) {
                        document.body.style.overflow = '';
                    }
                }
            });
        }
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                if (!personModal?.classList.contains('active')) {
                    document.body.style.overflow = '';
                }
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && personModal?.classList.contains('active')) {
            closePersonModal();
        }
    });

    const companyLinks = {
        'apple-card': 'https://www.apple.com',
        'meta-card': 'https://www.meta.com',
        'tesla-card': 'https://www.tesla.com',
        'nvidia-card': 'https://www.nvidia.com',
        'intel-card': 'https://www.intel.com'
    };

    Object.keys(companyLinks).forEach(cardId => {
        const card = document.getElementById(cardId);
        if (card) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open(companyLinks[cardId], '_blank');
            });
        }
    });
});
