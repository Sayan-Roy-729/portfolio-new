/*===== SHOW MENU =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show-menu");
        });
    }
};
showMenu("nav-toggle", "nav-menu");

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active-link");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active-link");
        }
    });
}
window.addEventListener("scroll", scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const header = document.getElementById("header");
    if (this.scrollY >= 200) {
        header.classList.add("scroll-header");
    } else {
        header.classList.remove("scroll-header");
    }
}
window.addEventListener("scroll", scrollHeader);

/*===== SHOW SCROLL TOP =====*/
function scrollTop() {
    const scrollTop = document.getElementById("scroll-top");
    if (this.scrollY >= 560) {
        scrollTop.classList.add("show-scroll");
    } else {
        scrollTop.classList.remove("show-scroll");
    }
}
window.addEventListener("scroll", scrollTop);

/*===== MIXITUP FILTER PORTFOLIO =====*/
const mixer = mixitup(".portfolio__container", {
    selectors: {
        target: ".portfolio__content",
    },
    animation: {
        duration: 400,
    },
});

/* Link active portfolio */
const linkPortfolio = document.querySelectorAll(".portfolio__item");

function activePortfolio() {
    if (linkPortfolio) {
        linkPortfolio.forEach((l) => l.classList.remove("active-portfolio"));
        this.classList.add("active-portfolio");
    }
}
linkPortfolio.forEach((l) => l.addEventListener("click", activePortfolio));

/*===== SWIPER CAROUSEL =====*/
const mySwiper = new Swiper(".testimonial__container", {
    spaceBetween: 16,
    loop: true,
    grabCursor: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

/*===== GSAP ANIMATION =====*/
gsap.from(".home__img", { opacity: 0, duration: 2, delay: 0.5, x: 60 });
gsap.from(".home__data", { opacity: 0, duration: 2, delay: 0.8, y: 25 });
gsap.from(".home__greeting, .home__name, .home__profession, .home__button", {
    opacity: 0,
    duration: 2,
    delay: 1,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});

gsap.from(".nav__logo, .nav__toggle", {
    opacity: 0,
    duration: 2,
    delay: 1.5,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});
gsap.from(".nav__item", {
    opacity: 0,
    duration: 2,
    delay: 1.8,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});
gsap.from(".home__social-icon", {
    opacity: 0,
    duration: 2,
    delay: 2.3,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});

// ***** Contact Form *****
const showAlertMessage = (text, background) => {
    Toastify({
        text: text,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: background,
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
};


const form = document.getElementById("contact-form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const number = document.getElementById("number").value;
    const message = document.getElementById("message").value;

    const submitButton = document.querySelector('#submit-button');
    submitButton.value = 'Loading...';
    submitButton.disabled = true;

    if (
        !name ||
        name.trim() === "" ||
        !email ||
        email.trim() === "" ||
        !email.includes("@") ||
        !subject ||
        subject.trim() === "" ||
        !message ||
        message.trim() === ""
    ) {
        showAlertMessage('😔 All fields are required except number', "linear-gradient(to right, #ed213a, #93291e)")
        // alert("All fields are required except number");
        return;
    }

    try {
        const response = await fetch("https://portfolio-restapi.herokuapp.com/api/v1/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
                number: number,
            }),
        });
        if(!response.ok) {
            throw new Error("Can't send ");
        }
        showAlertMessage('😃 Email send successfully', "linear-gradient(to right, #00f260, #0575e6)");
        document.querySelector('#submit-button').value = 'Send Message';
        submitButton.disabled = false;
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("subject").value = '';
        document.getElementById("number").value = '';
        document.getElementById("message").value = '';
    } catch (error) {
        document.querySelector('#submit-button').value = 'Send Message';
        submitButton.disabled = false;
        showAlertMessage('😔 Unable to deliver the message! Try again.', "linear-gradient(to right, #8a2387, #e94057, #f27121)");
    }
});
