/* =========================================================
   KULARAJ SUBEDI — WEBSITE INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector("#menuToggle");
    const mainNav = document.querySelector("#mainNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.querySelector("#backToTop");
    const year = document.querySelector("#year");


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("open");

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });

    }


    /* =========================================
       CLOSE MENU AFTER NAVIGATION
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (mainNav) {
                mainNav.classList.remove("open");
            }

            document.body.classList.remove("menu-open");

            if (menuToggle) {
                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            }

        });

    });


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =========================================
       BACK TO TOP
    ========================================= */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 700) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       REVEAL ANIMATIONS
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".highlight-card, " +
        ".expertise-card, " +
        ".timeline-item, " +
        ".project-card, " +
        ".publication, " +
        ".stat, " +
        ".contact-detail"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* =========================================
       SMOOTH ANCHOR NAVIGATION
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight +
                    5;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });

});
