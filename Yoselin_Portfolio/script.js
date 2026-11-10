
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // SELECCIONAR ELEMENTOS
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");
  const scrollProgress = document.getElementById("scrollProgress");

  // =====================================
  // NAVEGACIÓN
  // =====================================

  function closeMenu() {

    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open menu");

  }

  // Abrir y cerrar menú

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

    });

    // Cerrar menú al seleccionar una sección

    navLinks.addEventListener("click", (event) => {

      const link = event.target.closest("a");

      if (!link) return;

      closeMenu();

      // No utilizar preventDefault().
      // El navegador realiza la navegación normalmente.

    });

    // Cerrar menú al cambiar el tamaño de pantalla

    window.addEventListener("resize", () => {

      if (window.innerWidth > 700) {

        closeMenu();

      }

    });

    // Cerrar menú al presionar Escape

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        closeMenu();

      }

    });

  }

  // =====================================
  // ANIMACIONES DE APARICIÓN
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.10
      }
    );

    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    // Mostrar elementos en navegadores antiguos

    revealElements.forEach((element) => {

      element.classList.add("is-visible");

    });

  }

  // =====================================
  // BARRA DE PROGRESO
  // =====================================

  function updateScroll() {

    const scrollTop = window.scrollY;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    let progress = 0;

    if (scrollHeight > 0) {

      progress = (scrollTop / scrollHeight) * 100;

    }

    if (scrollProgress) {

      scrollProgress.style.width = progress + "%";

    }

    // =====================================
    // BOTÓN VOLVER ARRIBA
    // =====================================

    if (backToTop) {

      if (scrollTop > 400) {

        backToTop.classList.add("visible");

      } else {

        backToTop.classList.remove("visible");

      }

    }

  }

  // Actualizar al desplazarse

  window.addEventListener("scroll", updateScroll, {
    passive: true
  });

  // Actualizar al cargar la página

  updateScroll();

  // =====================================
  // VOLVER ARRIBA
  // =====================================

  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    });

  }

  // =====================================
  // NAVEGACIÓN CON ENLACES INTERNOS
  // =====================================

  // Si se carga una sección mediante un enlace
  // o se utiliza el historial del navegador,
  // mantenemos las animaciones sincronizadas.

  window.addEventListener("hashchange", () => {

    const hash = window.location.hash;

    if (!hash) return;

    const target = document.getElementById(
      decodeURIComponent(hash.substring(1))
    );

    if (target) {

      target.querySelectorAll(".reveal").forEach((element) => {

        element.classList.add("is-visible");

      });

    }

  });

});
