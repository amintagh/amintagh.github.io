document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".site-main section");
    const main = document.querySelector(".site-main");

    // Smooth scrolling
    function scrollToElement(element) {
        if (!element) {
            window.scrollTo({top: 0, behavior: "smooth"});
            return;
        }

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // Load images that use data-src
    function loadImages(container) {
        container.querySelectorAll("img[data-src]").forEach(img => {
            const src = img.dataset.src;

            if (src && src !== "done") {
                img.src = src;
                img.removeAttribute("data-src");
            }
        });
    }

    // Basic fade-in / slide-up animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const element = entry.target;

            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            element.style.opacity = "1";
            element.style.transform = "none";

            observer.unobserve(element);
        });
    }, {
        threshold: 0.1
    });

    function observeAnimations(container) {
        container.querySelectorAll("*").forEach(element => {
            const opacity = element.style.opacity;
            const transform = element.style.transform;

            if (
                opacity === "0" ||
                transform.includes("translateY")
            ) {
                observer.observe(element);
            }
        });
    }

    // Show the selected section
    function showSection(section, scrollTarget = null) {
        if (!section) return;

        sections.forEach(item => {
            const active = item === section;

            item.classList.toggle("active", active);
            item.classList.toggle("inactive", !active);
            item.style.display = active ? "" : "none";
        });

        loadImages(section);
        observeAnimations(section);

        if (section.dataset.title) {
            document.title = `${section.dataset.title} - ${document.title.split(" - ")[0]}`;
        }

        requestAnimationFrame(() => {
            if (scrollTarget) {
                scrollToElement(scrollTarget);
            } else {
                window.scrollTo({top: 0, behavior: "instant"});
            }
        });
    }

    // Handle navigation links and URL hashes
    function navigate(hash) {
        const id = hash.replace(/^#/, "");
        const target = id ? document.getElementById(id) : null;

        // Direct section link, e.g. #bio
        const section = target?.tagName === "SECTION"
            ? target
            : target?.closest("section") ||
            document.getElementById(`${id}-section`) ||
            document.getElementById("home-section");

        if (!section) return;

        const scrollTarget = target && target !== section
            ? target
            : null;

        const currentSection = main.querySelector("section.active");

        if (currentSection !== section) {
            showSection(section, scrollTarget);
        } else if (scrollTarget) {
            scrollToElement(scrollTarget);
        } else {
            scrollToElement(null);
        }
    }

    // Intercept internal links
    document.addEventListener("click", event => {
        const link = event.target.closest("a[href^='#']");

        if (!link) return;

        const hash = link.getAttribute("href");

        if (!hash || hash === "#") return;

        event.preventDefault();

        history.pushState(null, "", hash);
        navigate(hash);
    });

    // Browser back / forward navigation
    window.addEventListener("popstate", () => {
        navigate(location.hash);
    });

    // Initial page setup
    const initialHash = location.hash || "";
    const initialId = initialHash.slice(1);

    const initialTarget = initialId
        ? document.getElementById(initialId)
        : null;

    const initialSection =
        initialTarget?.tagName === "SECTION"
            ? initialTarget
            : initialTarget?.closest("section") ||
            document.getElementById(`${initialId}-section`) ||
            document.getElementById("home-section");

    showSection(
        initialSection,
        initialTarget !== initialSection ? initialTarget : null
    );

    loadImages(initialSection);
    observeAnimations(initialSection);
});

const hero = document.querySelector("#container04");

document.addEventListener("click", (e) => {
    const backArrow = e.target.closest(".back-arrow");

    if (!backArrow) return;

    e.preventDefault();

    const section = document.querySelectorAll(".section");
    section.forEach((el) => {
        el.style.display = "none";
    })
    const container04 = document.querySelector("#container04");
    container04.style.display = "";
    document.querySelector("#bio-section").style.display = "none";
    history.back();
});

document.addEventListener("DOMContentLoaded", () => {
    const overlays = document.querySelectorAll(
        "#sculpt-section, #stones-section, #arch-section"
    );

    const previousDisplay = new Map();

    function openOverlay(id) {
        const section = document.getElementById(id);
        if (!section) return;

        overlays.forEach(item => {
            if (item !== section) {
                item.classList.remove("overlay-open");
            }
        });

        if (!previousDisplay.has(section)) {
            previousDisplay.set(section, section.style.display);
        }


        section.style.display = "block";
        section.classList.add("overlay-open");
        document.body.style.overflow = "hidden";
    }

    function closeOverlay() {
        overlays.forEach(section => {
            section.classList.remove("overlay-open");

            if (previousDisplay.has(section)) {
                section.style.display = previousDisplay.get(section);
                previousDisplay.delete(section);
            }
        });

        document.body.style.overflow = "";
    }

    document.addEventListener("click", event => {
        const learnMore = event.target.closest(".learn-more");
        const backArrow = event.target.closest(".back-arrow");

        if (learnMore) {
            event.preventDefault();
            event.stopPropagation();
            openOverlay(learnMore.dataset.section);
        }

        if (backArrow) {
            event.preventDefault();
            event.stopPropagation();
            closeOverlay();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeOverlay();
    });
});


const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    const button = card.querySelector(".learn-more");

    card.addEventListener("mouseenter", () => {
        button.style.display = "flex";
    });

    card.addEventListener("mouseleave", () => {
        button.style.display = "none";
    });
});

const image07 = document.querySelector("#image07");
image07.addEventListener("click", () => {
    const sculptureSection = document.querySelector(".section-sculpture");
    sculptureSection.style.display = "flex";

})

const container5 = document.querySelector("#container05");
container5.addEventListener("click", () => {
    const stoneSection = document.querySelector(".section-stone");
    stoneSection.style.display = "flex";

})

const container12 = document.querySelector("#container12");
container12.addEventListener("click", () => {
    const stoneSection = document.querySelector(".section-architecture");
    stoneSection.style.display = "flex";

})

const learnMore = document.querySelector(".learn-more-container");
const buttonLearnMore = learnMore.querySelector(".learn-more-painting");

learnMore.addEventListener("mouseenter", () => {
    buttonLearnMore.style.opacity = "0.5";
});

learnMore.addEventListener("mouseleave", () => {
    buttonLearnMore.style.opacity = "0";
});

learnMore.addEventListener("click", () => {
    const stoneSection = document.querySelector(".section-paintings");
    stoneSection.style.display = "flex";
})

const buttons01 = document.querySelectorAll("#buttons01 a");

buttons01.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const container04 = document.querySelector("#container04");

        container04.style.display = "none";
    });
});

/**
 * Hero parallax: the hero is pinned (position: sticky in CSS) while the
 * Biography scrolls over it. Moving the hero up by a fraction of the scroll
 * distance makes it appear to drift up slowly instead of sitting still.
 */
function initHeroParallax() {
    const hero = document.querySelector("#container04");
    if (!hero) return;

    // Respect users who prefer reduced motion: keep the hero static
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Upward drift as a fraction of scroll distance.
    // 0.5 -> hero appears to move at half the page's scroll speed.
    // Keep it below 1, otherwise a gap appears between hero and Biography.
    const PARALLAX_SPEED = 0.5;

    let ticking = false; // throttle updates to one per animation frame

    function update() {
        // Stop moving once the hero is scrolled past (the Biography covers it by then)
        const distance = Math.min(window.scrollY, hero.offsetHeight);

        hero.style.transform = `translateY(${-distance * PARALLAX_SPEED}px)`;
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, {passive: true});

    update(); // set the initial position
}

initHeroParallax();