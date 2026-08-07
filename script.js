"use strict";


/* =========================
   SERVER SETTINGS
========================= */

const SERVER_IP =
    "GamerXD_GZ.aternos.me";


/* =========================
   ELEMENTS
========================= */

const statusElement =
    document.getElementById(
        "server-status"
    );


const playerCountElement =
    document.getElementById(
        "player-count"
    );


const ipElement =
    document.getElementById(
        "ip-text"
    );


const toastElement =
    document.getElementById(
        "toast"
    );


const copyButtons =
    document.querySelectorAll(
        "[data-copy-ip]"
    );


/* =========================
   COPY IP
========================= */

async function copyServerIP() {

    try {

        await navigator.clipboard.writeText(
            SERVER_IP
        );

        showToast(
            "Server IP copied!"
        );

    }

    catch (error) {

        const textArea =
            document.createElement(
                "textarea"
            );

        textArea.value =
            SERVER_IP;

        textArea.style.position =
            "fixed";

        textArea.style.opacity =
            "0";

        document.body.appendChild(
            textArea
        );

        textArea.focus();

        textArea.select();


        try {

            document.execCommand(
                "copy"
            );

            showToast(
                "Server IP copied!"
            );

        }

        catch {

            showToast(
                SERVER_IP
            );

        }


        textArea.remove();

    }

}


copyButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            copyServerIP
        );

    }
);


/* =========================
   TOAST
========================= */

let toastTimeout;


function showToast(message) {

    if (!toastElement) {
        return;
    }


    const text =
        toastElement.querySelector(
            "p"
        );


    if (text) {

        text.textContent =
            message;

    }


    toastElement.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toastElement.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================
   SERVER STATUS
========================= */

/*
    The website currently uses a safe
    placeholder status.

    Aternos does not provide a simple
    public browser API that should be
    called directly from this webpage.

    When you have a status API,
    replace this function with the
    API request.
*/


function setServerStatus(
    online,
    players = 0,
    maxPlayers = 0
) {

    if (!statusElement) {
        return;
    }


    if (online) {

        statusElement.className =
            "status online";


        statusElement.innerHTML =
            `
                <span></span>
                Online
            `;


        if (playerCountElement) {

            playerCountElement.textContent =
                `${players} / ${maxPlayers}`;

        }

    }

    else {

        statusElement.className =
            "status offline";


        statusElement.innerHTML =
            `
                <span></span>
                Offline
            `;


        if (playerCountElement) {

            playerCountElement.textContent =
                "0 / --";

        }

    }

}


/* =========================
   INITIAL STATUS
========================= */

setTimeout(
    () => {

        setServerStatus(false);

    },
    500
);


/* =========================
   IP DISPLAY
========================= */

if (ipElement) {

    ipElement.textContent =
        SERVER_IP;

}


/* =========================
   SCROLL ANIMATIONS
========================= */

const animatedElements =
    document.querySelectorAll(
        ".status-card, .quick-card, .feature-card, .large-card, .join-section"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(
    element => {

        element.classList.add(
            "animate-on-scroll"
        );

        observer.observe(
            element
        );

    }
);


/* =========================
   DYNAMIC SCROLL CSS
========================= */

const animationStyle =
    document.createElement(
        "style"
    );


animationStyle.textContent = `

    .animate-on-scroll {

        opacity: 0;

        transform:
            translateY(20px);

        transition:
            opacity .6s ease,
            transform .6s ease;

    }


    .animate-on-scroll.visible {

        opacity: 1;

        transform:
            translateY(0);

    }

`;


document.head.appendChild(
    animationStyle
);
