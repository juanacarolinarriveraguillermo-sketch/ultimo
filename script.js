/* =========================================================
   SABOR Y ARTE - SCRIPT.JS
   VERSIÓN ORDENADA Y OPTIMIZADA
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ELEMENTOS GENERALES
       ===================================================== */

    const nav = document.getElementById("nav");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelectorAll(".nav a");

    const backTop = document.getElementById("backTop");

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const toast = document.getElementById("toast");

    const yearElement = document.getElementById("year");


    /* =====================================================
       2. MENÚ MÓVIL
       ===================================================== */

    function closeMobileMenu() {

        if (!nav || !menuToggle) return;

        nav.classList.remove("open");
        document.body.classList.remove("no-scroll");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuToggle.setAttribute("aria-expanded", "false");
    }


    if (nav && menuToggle) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            document.body.classList.toggle("no-scroll", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );
            }

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });

    }


    /* =====================================================
       3. NAVEGACIÓN ACTIVA
       ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    function updateActiveLink() {

        if (!sections.length) return;
        const scrollPosition =
            window.scrollY + 140;
        let current = "inicio";

        sections.forEach(section => {

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                current = section.id;
            }
        });


        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${current}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );
    updateActiveLink();


    /* =====================================================
       4. BOTÓN VOLVER ARRIBA
       ===================================================== */

    if (backTop) {

        function updateBackTop() {

            backTop.classList.toggle(
                "visible",
                window.scrollY > 500
            );

        }


        window.addEventListener(
            "scroll",
            updateBackTop,
            { passive: true }
        );


        updateBackTop();

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


   /* =====================================================
   5. FILTRO DEL MENÚ
   ===================================================== */

const filters = document.querySelectorAll(".filter");
const dishes = document.querySelectorAll(".dish-card");


function aplicarFiltro(category) {

    let contador = 0;


    dishes.forEach(dish => {

        /* =========================================
           BOTÓN "TODOS"
           Mostrar solamente 6 platos
           ========================================= */

        if (category === "todos") {
            if (contador < 6) {

                // Mostrar los primeros 6
                dish.style.setProperty(
                    "display",
                    "",
                    "important"
                );

                contador++;
            } else {

                // Ocultar todos los demás
                dish.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            }

        }


        /* =========================================
           OTROS BOTONES / CATEGORÍAS
           Mostrar TODOS los platos de esa categoría
           ========================================= */

        else {

            if (
                dish.dataset.category === category
            ) {
                dish.style.setProperty(
                    "display",
                    "",
                    "important"
                );

            } else {
                dish.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            }

        }

    });

}


/* =========================================
   CLIC EN LOS BOTONES
   ========================================= */

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        /* Quitar activo de todos */

        filters.forEach(button => {
            button.classList.remove("active");
        });


        /* Activar botón seleccionado */
        filter.classList.add("active");

       /* Obtener categoría */
        const category =
            filter.dataset.category;

        /* Aplicar filtro */
        aplicarFiltro(category);
    });

});


/* =========================================
   INICIAR CON "TODOS"
   ========================================= */

const filtroTodos =
    document.querySelector(
        '.filter[data-category="todos"]'
    );


if (filtroTodos) {
    filtroTodos.classList.add("active");
    aplicarFiltro("todos");

}



    /* =====================================================
   6. FORMULARIO DE COTIZACIÓN
   ===================================================== */

function showToast() {

    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);

}


if (form) {

    /* =================================================
       CAMPOS
       ================================================= */

    const nombreInput =
        form.querySelector('[name="nombre"]');

    const telefonoInput =
        form.querySelector('[name="telefono"]');

    const invitadosInput =
        form.querySelector('[name="invitados"]');

    const tipoEventoInput =
        form.querySelector('[name="evento"]');

    const presupuestoInput =
        form.querySelector('[name="presupuesto"]');

    const fechaInput =
        form.querySelector('[name="fecha"]');


    /* =================================================
       NOMBRE
       Solo letras, espacios y letras con tilde
       ================================================= */

    if (nombreInput) {

        nombreInput.addEventListener("input", () => {

            nombreInput.value =
                nombreInput.value.replace(
                    /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g,
                    ""
                );

        });

    }


    /* =================================================
       TELÉFONO
       Solo números
       ================================================= */

    if (telefonoInput) {

        telefonoInput.addEventListener("input", () => {

            telefonoInput.value =
                telefonoInput.value.replace(
                    /\D/g,
                    ""
                );

        });

    }


    /* =================================================
       NÚMERO DE INVITADOS
       Solo números
       ================================================= */

    if (invitadosInput) {

        invitadosInput.addEventListener("input", () => {

            invitadosInput.value =
                invitadosInput.value.replace(
                    /\D/g,
                    ""
                );

        });

    }


    /* =================================================
       FECHA
       No permitir fechas anteriores a hoy
       ================================================= */

    if (fechaInput) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        fechaInput.min =
            `${year}-${month}-${day}`;

    }


    /* =================================================
       ENVIAR FORMULARIO
       ================================================= */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /* =========================================
               OBTENER DATOS
               ========================================= */

            const formData =
                new FormData(form);


            const nombre =
                String(
                    formData.get("nombre") || ""
                ).trim();

            const telefono =
                String(
                    formData.get("telefono") || ""
                ).trim();

            const invitados =
                String(
                    formData.get("invitados") || ""
                ).trim();

            const tipoEvento =
                String(
                    formData.get("evento") || ""
                ).trim();

            const presupuesto =
                String(
                    formData.get("presupuesto") || ""
                ).trim();

            const fecha =
                String(
                    formData.get("fecha") || ""
                ).trim();


            /* =========================================
               VALIDAR NOMBRE
               ========================================= */

            const nombreValido =
                /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(
                    nombre
                );


            if (!nombre) {

                alert(
                    "Por favor, ingresa tu nombre completo."
                );
                nombreInput.focus();
                return;

            }


            if (!nombreValido) {

                alert(
                    "El nombre solo puede contener letras y espacios."
                );
                nombreInput.focus();
                return;

            }


            /* =========================================
               VALIDAR TELÉFONO
               ========================================= */

            if (!telefono) {

                alert(
                    "Por favor, ingresa tu número de teléfono."
                );
                telefonoInput.focus();
                return;

            }


            if (!/^\d+$/.test(telefono)) {

                alert(
                    "El teléfono solo puede contener números."
                );
                telefonoInput.focus();
                return;

            }


            /* ========================================= VALIDAR TELÉFONO PERUANO 9 DÍGITOS========================================= */

            if (telefono.length !== 9) {
                alert(
                    "El número de teléfono debe tener 9 dígitos."
                );
                telefonoInput.focus();
                return;

            }


            /* =============================== VALIDAR TIPO DE EVENTO ============================== */

            if (
                !tipoEvento ||
                tipoEvento === "Selecciona una opción"
            ) {

                alert(
                    "Por favor, selecciona el tipo de evento."
                );
                tipoEventoInput.focus();
                return;

            }


            /* =========================================
               VALIDAR INVITADOS
               ========================================= */

            if (!invitados) {

                alert(
                    "Por favor, indica el número de invitados."
                );
                invitadosInput.focus();
                return;

            }


            if (!/^\d+$/.test(invitados)) {
                alert(
                    "El número de invitados solo puede contener números."
                );
                invitadosInput.focus();
                return;

            }


            if (Number(invitados) < 1) {
                alert(
                    "El número de invitados debe ser mayor a 0."
                );
                invitadosInput.focus();
                return;
            }


            /* =========================================
               VALIDAR FECHA
               ========================================= */
            if (!fecha) {
                alert(
                    "Por favor, selecciona la fecha del evento."
                );
                fechaInput.focus();
                return;

            }


            /* =========================================
               VALIDAR PRESUPUESTO
               ========================================= */

            if (
                !presupuesto ||
                presupuesto === "Selecciona"
            ) {
                alert(
                    "Por favor, selecciona un presupuesto aproximado."
                );
                presupuestoInput.focus();
                return;

            }


            /* ========================================= TODO ok ========================================= */
            if (formMessage) {

                formMessage.textContent =
                    `Gracias, ${nombre}. Hemos recibido tu solicitud. Te contactaremos pronto.`;

            }


            showToast();

            /* Limpiar formulario */
            form.reset();

        }
    );

}

    /* =====================================================
   7. VIDEO REAL - REPRODUCTOR PERSONALIZADO
   ===================================================== */

const video = document.getElementById("cateringVideo");
const videoPlayer = document.getElementById("videoPlayer");
const videoStart = document.getElementById("videoStart");
const startButton = document.getElementById("startButton");

const videoControls = document.getElementById("videoControls");
const videoProgress = document.getElementById("videoProgress");
const videoProgressFilled = document.getElementById("videoProgressFilled");

const playPauseButton = document.getElementById("playPauseButton");
const muteButton = document.getElementById("muteButton");
const volumeControl = document.getElementById("volumeControl");
const videoDuration = document.getElementById("videoDuration");

const speedButton = document.getElementById("speedButton");
const speedOptions = document.getElementById("speedOptions");
const fullscreenButton = document.getElementById("fullscreenButton");


if (video && videoPlayer) {

    /* ================= FORMATO DE TIEMPO ================= */

    function formatTime(seconds) {
        if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }

    function updateIconPlayPause() {
        if (!playPauseButton) return;
        const icon = playPauseButton.querySelector("i");
        if (!icon) return;
        icon.classList.toggle("fa-play", video.paused);
        icon.classList.toggle("fa-pause", !video.paused);
    }

    function updateIconMute() {
        if (!muteButton) return;
        const icon = muteButton.querySelector("i");
        if (!icon) return;
        icon.classList.toggle("fa-volume-high", !video.muted && video.volume > 0);
        icon.classList.toggle("fa-volume-xmark", video.muted || video.volume === 0);
    }


    /* ================= PANTALLA INICIAL ================= */

    function hideStartScreen() {
        if (videoStart) videoStart.classList.add("hidden");
    }

    function showStartScreen() {
        if (videoStart) videoStart.classList.remove("hidden");
    }

    if (startButton) {
        startButton.addEventListener("click", async () => {
            try {
                await video.play();
                hideStartScreen();
            } catch (error) {
                console.error("No se pudo reproducir el video:", error);
                alert("No se pudo reproducir el video. Verifica que el archivo exista y sea compatible.");
            }
        });
    }

    video.addEventListener("play", () => {
        hideStartScreen();
        updateIconPlayPause();
    });

    video.addEventListener("pause", updateIconPlayPause);

    video.addEventListener("ended", () => {
        showStartScreen();
        updateIconPlayPause();
    });

    video.addEventListener("error", () => {
        console.error("Error al cargar el video. Revisa la ruta del archivo (atributo src).");
    });


    /* ================= PLAY / PAUSE (botón de controles) ================= */

    if (playPauseButton) {
        playPauseButton.addEventListener("click", () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }


    /* ================= MUTE ================= */

    if (muteButton) {
        muteButton.addEventListener("click", () => {
            video.muted = !video.muted;
            updateIconMute();
        });
    }


    /* ================= VOLUMEN ================= */

    if (volumeControl) {
        volumeControl.addEventListener("input", () => {
            video.volume = Number(volumeControl.value);
            video.muted = video.volume === 0;
            updateIconMute();
        });
    }


    /* ================= BARRA DE PROGRESO ================= */

    video.addEventListener("timeupdate", () => {
        if (!video.duration) return;

        const percent = (video.currentTime / video.duration) * 100;
        if (videoProgressFilled) videoProgressFilled.style.width = `${percent}%`;

        if (videoDuration) {
            videoDuration.textContent =
                `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
    });

    if (videoProgress) {
        videoProgress.addEventListener("click", (event) => {
            const rect = videoProgress.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const percent = clickX / rect.width;
            video.currentTime = percent * video.duration;
        });
    }


    /* ================= VELOCIDAD ================= */

    if (speedButton && speedOptions) {

        speedButton.addEventListener("click", (event) => {
            event.stopPropagation();
            speedOptions.classList.toggle("active");
        });

        speedOptions.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                const speed = parseFloat(button.dataset.speed);
                video.playbackRate = speed;
                speedButton.textContent = `${speed}x`;

                speedOptions.querySelectorAll("button").forEach(b =>
                    b.classList.remove("selected")
                );
                button.classList.add("selected");

                speedOptions.classList.remove("active");
            });
        });

        document.addEventListener("click", (event) => {
            if (!speedOptions.contains(event.target) && event.target !== speedButton) {
                speedOptions.classList.remove("active");
            }
        });
    }


    /* ================= PANTALLA COMPLETA ================= */

    if (fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                videoPlayer.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });
    }


    /* ================= MOSTRAR CONTROLES AL MOVER EL MOUSE ================= */

    let hideControlsTimeout;

    videoPlayer.addEventListener("mousemove", () => {
        videoPlayer.classList.add("show-controls");
        clearTimeout(hideControlsTimeout);

        hideControlsTimeout = setTimeout(() => {
            if (!video.paused) {
                videoPlayer.classList.remove("show-controls");
            }
        }, 2500);
    });

    updateIconPlayPause();
    updateIconMute();
}


    /* =====================================================
       8. SLIDER PRINCIPAL DEL HERO
       ===================================================== */

    const heroSlides =
        document.querySelectorAll(
            ".hero-slide"
        );

    const heroDots =
        document.querySelectorAll(
            ".slider-dots .dot"
        );

    const heroPrev =
        document.getElementById(
            "prevSlide"
        );

    const heroNext =
        document.getElementById(
            "nextSlide"
        );


    let heroCurrent = 0;

    let heroInterval = null;


    /* =====================================================
       MOSTRAR SLIDE
       ===================================================== */

    function showHeroSlide(index) {

        if (!heroSlides.length) return;


        heroCurrent =
            (index + heroSlides.length) %
            heroSlides.length;


        heroSlides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === heroCurrent
                );

                slide.setAttribute(
                    "aria-hidden",
                    i === heroCurrent
                        ? "false"
                        : "true"
                );

            }
        );


        heroDots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === heroCurrent
                );

            }
        );

    }


    /* =====================================================
       SIGUIENTE SLIDE
       ===================================================== */

    function nextHeroSlide() {

        showHeroSlide(
            heroCurrent + 1
        );

    }


    /* =====================================================
       SLIDE ANTERIOR
       ===================================================== */

    function previousHeroSlide() {

        showHeroSlide(
            heroCurrent - 1
        );

    }


    /* =====================================================
       AUTOPLAY HERO
       ===================================================== */

    function startHeroAutoplay() {

        if (heroSlides.length < 3) {
            return;
        }


        clearInterval(
            heroInterval
        );


        heroInterval =
            setInterval(
                nextHeroSlide,
                6000
            );

    }


    /* =====================================================
       INICIAR HERO
       ===================================================== */

    if (heroSlides.length) {

        showHeroSlide(0);


        /* Botón anterior */

        if (heroPrev) {

            heroPrev.addEventListener(
                "click",
                () => {

                    previousHeroSlide();

                    startHeroAutoplay();

                }
            );

        }


        /* Botón siguiente */

        if (heroNext) {

            heroNext.addEventListener(
                "click",
                () => {

                    nextHeroSlide();

                    startHeroAutoplay();

                }
            );

        }


        /* Indicadores */

        heroDots.forEach(
            (dot, index) => {

                dot.addEventListener(
                    "click",
                    () => {

                        showHeroSlide(index);

                        startHeroAutoplay();

                    }
                );

            }
        );


        /* Iniciar automáticamente */

        startHeroAutoplay();

    }


    /* =====================================================
       9. CARRUSEL NOSOTROS
       ===================================================== */

    const aboutSlides =
        document.querySelectorAll(
            ".about-slide"
        );

    const aboutDots =
        document.querySelectorAll(
            ".about-dot"
        );

    const aboutPrev =
        document.querySelector(
            ".about-prev"
        );

    const aboutNext =
        document.querySelector(
            ".about-next"
        );


    let aboutCurrent = 0;

    let aboutInterval = null;


    /* =====================================================
       MOSTRAR IMAGEN
       ===================================================== */

    function showAboutSlide(index) {

        if (!aboutSlides.length) return;


        aboutCurrent =
            (index + aboutSlides.length) %
            aboutSlides.length;


        aboutSlides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === aboutCurrent
                );

                slide.setAttribute(
                    "aria-hidden",
                    i === aboutCurrent
                        ? "false"
                        : "true"
                );

            }
        );


        aboutDots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === aboutCurrent
                );

            }
        );

    }


    /* =====================================================
       SIGUIENTE
       ===================================================== */

    function nextAboutSlide() {

        showAboutSlide(
            aboutCurrent + 1
        );

    }


    /* =====================================================
       ANTERIOR
       ===================================================== */

    function previousAboutSlide() {

        showAboutSlide(
            aboutCurrent - 1
        );

    }


    /* =====================================================
       AUTOPLAY
       ===================================================== */

    function startAboutCarousel() {

        if (aboutSlides.length < 2) {
            return;
        }


        clearInterval(
            aboutInterval
        );


        aboutInterval =
            setInterval(
                nextAboutSlide,
                5000
            );

    }


    /* =====================================================
       INICIAR CARRUSEL
       ===================================================== */

    if (aboutSlides.length) {

        showAboutSlide(0);


        /* Flecha anterior */

        if (aboutPrev) {

            aboutPrev.addEventListener(
                "click",
                () => {

                    previousAboutSlide();

                    startAboutCarousel();

                }
            );

        }


        /* Flecha siguiente */

        if (aboutNext) {

            aboutNext.addEventListener(
                "click",
                () => {

                    nextAboutSlide();

                    startAboutCarousel();

                }
            );

        }


        /* Indicadores */

        aboutDots.forEach(
            (dot, index) => {

                dot.addEventListener(
                    "click",
                    () => {

                        showAboutSlide(index);

                        startAboutCarousel();

                    }
                );

            }
        );


        startAboutCarousel();

    }


    /* =====================================================
       10. AÑO AUTOMÁTICO
       ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       11. FECHA MÍNIMA DEL FORMULARIO
       ===================================================== */

    const dateInput =
        document.querySelector(
            'input[type="date"]'
        );


    if (dateInput) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        dateInput.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       12. CONTROL DE RUTAS DE IMÁGENES DEL HERO
       ===================================================== */

    heroSlides.forEach(
        slide => {

            const image =
                slide.querySelector("img");


            if (!image) return;


            image.addEventListener(
                "error",
                function () {

                    const currentSrc =
                        image.getAttribute("src") ||
                        "";

                    const fileName =
                        currentSrc
                            .split("/")
                            .pop();


                    if (!fileName) {
                        return;
                    }


                    /* Si está en img/
                       probar imagenes/ */

                    if (
                        currentSrc.startsWith(
                            "img/"
                        )
                    ) {

                        image.src =
                            `imagenes/${fileName}`;

                    }


                    /* Si está en imagenes/
                       probar img/ */

                    else if (
                        currentSrc.startsWith(
                            "imagenes/"
                        )
                    ) {

                        image.src =
                            `img/${fileName}`;

                    }

                }
            );

        });


});