document.addEventListener('DOMContentLoaded', () => {
    const typedEl = document.getElementById('typed');
    if (typedEl) {
        const roles = [
            'Backend Developer',
            'Automation Developer',
            'Python Developer',
            'IoT & Automation Engineer',
            'Penetration Tester',
            'Cybersecurity Analyst'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 45;
        const holdDelay = 1500;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typedEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, holdDelay);
                    return;
                }
            } else {
                typedEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeLoop, isDeleting ? deleteSpeed : typeSpeed);
        }

        typeLoop();
    }

    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    function handleScroll() {
        if (!navbar) return;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const scrollPosition = scrollY + 140;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });

        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (scrollY > 350) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    const skillBars = document.querySelectorAll('.skill-progress-bar span');
    if ('IntersectionObserver' in window && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const pct = bar.getAttribute('data-pct');
                    if (pct) {
                        bar.style.width = pct + '%';
                    }
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        skillBars.forEach(bar => skillsObserver.observe(bar));
    } else {
        skillBars.forEach(bar => {
            const pct = bar.getAttribute('data-pct');
            if (pct) bar.style.width = pct + '%';
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    const pipCopyButtons = document.querySelectorAll('.pip-copy-btn');
    pipCopyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cmd = btn.getAttribute('data-copy');
            if (cmd && navigator.clipboard) {
                navigator.clipboard.writeText(cmd).then(() => {
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-check';
                        setTimeout(() => {
                            icon.className = 'far fa-copy';
                        }, 2000);
                    }
                }).catch(() => {});
            }
        });
    });

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', () => {
            formStatus.textContent = 'Opening your email client... Thank you for reaching out!';
            formStatus.className = 'form-status success';

            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }, 5000);
        });
    }

    const githubStats = document.getElementById('githubStats');

    if (githubStats) {
        const setStatText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        const renderLanguages = (languages) => {
            const container = document.getElementById('ghLangs');
            if (!container) return;

            if (!languages.length) {
                container.innerHTML = '<div class="gh-loading">No language data available.</div>';
                return;
            }

            const total = languages.reduce((sum, [, count]) => sum + count, 0) || 1;

            container.innerHTML = languages.map(([name, count]) => {
                const pct = Math.round((count / total) * 100);
                return `<div class="gh-lang-row">
                    <div class="gh-lang-meta"><span>${name}</span><span>${pct}%</span></div>
                    <div class="gh-lang-bar"><span style="width:${pct}%"></span></div>
                </div>`;
            }).join('');
        };

        fetch('https://api.github.com/users/mahadihasan9')
            .then(response => {
                if (!response.ok) throw new Error('stats');
                return response.json();
            })
            .then(user => {
                setStatText('ghRepos', user.public_repos ?? 0);
                setStatText('ghFollowers', user.followers ?? 0);
                setStatText('ghFollowing', user.following ?? 0);
            })
            .catch(() => {
                setStatText('ghRepos', '—');
                setStatText('ghFollowers', '—');
                setStatText('ghFollowing', '—');
            });

        fetch('https://api.github.com/users/mahadihasan9/repos?per_page=100&sort=updated')
            .then(response => {
                if (!response.ok) throw new Error('repos');
                return response.json();
            })
            .then(repos => {
                const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
                setStatText('ghStars', stars);

                const counts = {};
                repos.forEach(repo => {
                    if (repo.language && !repo.fork) {
                        counts[repo.language] = (counts[repo.language] || 0) + 1;
                    }
                });

                const languages = Object.entries(counts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 6);

                renderLanguages(languages);
            })
            .catch(() => {
                setStatText('ghStars', '—');
                const container = document.getElementById('ghLangs');
                if (container) {
                    container.innerHTML = '<div class="gh-loading">Unable to load language data right now.</div>';
                }
            });
    }
});
