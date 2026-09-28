/**
 * HSV AUTO RECYCLING — HIGH-PERFORMANCE INTERACTIVE MOTION CONTROLLER
 * Apple-inspired Storytelling • 60 FPS Scroll Choreography • Zero Bloat
 */

(function () {
  "use strict";

  const HSV_PHONE = "9896226697";
  const HSV_WHATSAPP_BASE = "https://wa.me/919896226697";

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Analytics Event Dispatcher
  function trackEvent(eventName, payload = {}) {
    try {
      const eventDetail = { eventName, payload, timestamp: new Date().toISOString() };
      window.dispatchEvent(new CustomEvent("hsv_analytics", { detail: eventDetail }));
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: eventName, ...payload });
      }
    } catch (e) {}
  }

  // Toast System
  function showToast(message, duration = 4000) {
    let toast = document.getElementById("hsv-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "hsv-toast";
      toast.className = "toast-notification";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add("is-visible");
    setTimeout(() => {
      toast.classList.remove("is-visible");
    }, duration);
  }

  // 1. Sticky Navigation & Scroll Direction Control
  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    onScroll();
  }

  // 2. Word-by-Word Scroll Reveal & Illumination
  function initHeadingWordIllumination() {
    if (prefersReducedMotion) return;

    const headings = document.querySelectorAll(".reveal-words");
    headings.forEach((h) => {
      const words = h.textContent.trim().split(/\s+/);
      h.innerHTML = words.map((w) => `<span class="reveal-word">${w}</span> `).join("");
    });

    const allWordSpans = document.querySelectorAll(".reveal-word");
    if (!allWordSpans.length) return;

    function checkWords() {
      const vh = window.innerHeight;
      allWordSpans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        // Illuminate when word enters bottom 85% of viewport
        if (rect.top < vh * 0.85) {
          span.classList.add("is-illuminated");
        } else {
          span.classList.remove("is-illuminated");
        }
      });
    }

    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(checkWords);
    }, { passive: true });

    checkWords();
  }

  // 3. General Scroll Reveal via IntersectionObserver
  function initScrollReveals() {
    const revealEls = document.querySelectorAll(".scroll-reveal");
    if (!revealEls.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // 4. Sticky Storytelling & Animated Timeline Progress
  function initStickyStorytelling() {
    const storyteller = document.querySelector(".sticky-storyteller-grid");
    if (!storyteller) return;

    const steps = storyteller.querySelectorAll(".timeline-step-item");
    const previewImg = storyteller.querySelector(".sticky-preview-img");
    const fillBar = storyteller.querySelector(".timeline-fill-bar");
    const previewCaption = storyteller.querySelector(".sticky-preview-caption");

    if (!steps.length) return;

    function updateTimeline() {
      const vh = window.innerHeight;
      let activeIndex = 0;

      steps.forEach((step, idx) => {
        const rect = step.getBoundingClientRect();
        // Check if middle of step is near middle of viewport
        if (rect.top <= vh * 0.55) {
          activeIndex = idx;
        }
      });

      steps.forEach((step, idx) => {
        step.classList.toggle("is-active", idx === activeIndex);
      });

      // Update fill bar height (percentage of progress)
      if (fillBar) {
        const progressPercent = (activeIndex / (steps.length - 1)) * 100;
        fillBar.style.height = `${Math.max(10, Math.min(100, progressPercent))}%`;
      }

      // Update sticky image based on active step data-img attribute
      const activeStep = steps[activeIndex];
      if (activeStep && previewImg) {
        const targetImg = activeStep.getAttribute("data-preview-img");
        const targetCaption = activeStep.getAttribute("data-preview-caption");
        if (targetImg && previewImg.getAttribute("data-current") !== targetImg) {
          previewImg.style.opacity = "0.2";
          previewImg.style.transform = "scale(0.98)";
          setTimeout(() => {
            previewImg.src = targetImg;
            previewImg.setAttribute("data-current", targetImg);
            previewImg.style.opacity = "1";
            previewImg.style.transform = "scale(1)";
            if (previewCaption && targetCaption) {
              previewCaption.textContent = targetCaption;
            }
          }, 150);
        }
      }
    }

    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateTimeline);
    }, { passive: true });

    updateTimeline();
  }

  // 5. Scroll-driven Light -> Dark Transition Observation
  function initThemeTransitions() {
    const darkSections = document.querySelectorAll(".theme-dark-transition-wrapper");
    if (!darkSections.length) return;

    const header = document.querySelector(".site-header");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add("in-dark-section");
            if (header) {
              header.style.backgroundColor = "rgba(8, 13, 11, 0.85)";
              header.style.borderBottomColor = "#1C2E24";
            }
          } else {
            document.body.classList.remove("in-dark-section");
            if (header) {
              header.style.backgroundColor = "";
              header.style.borderBottomColor = "";
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    darkSections.forEach((sec) => observer.observe(sec));
  }

  // 6. Mobile Navigation Sheet
  function initMobileNav() {
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const mobileSheet = document.querySelector(".mobile-nav-sheet");
    if (!hamburgerBtn || !mobileSheet) return;

    function toggleMenu(open) {
      const isOpen = open !== undefined ? open : !mobileSheet.classList.contains("is-open");
      mobileSheet.classList.toggle("is-open", isOpen);
      hamburgerBtn.classList.toggle("is-active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    }

    hamburgerBtn.addEventListener("click", () => toggleMenu());

    mobileSheet.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileSheet.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  }

  // 7. Interactive Chip Selectors
  function initChipSelectors() {
    document.querySelectorAll(".chip-group").forEach((group) => {
      const hiddenInput = group.querySelector("input[type='hidden']");
      const chips = group.querySelectorAll(".choice-chip");

      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => {
            c.classList.remove("is-selected");
            c.setAttribute("aria-pressed", "false");
          });
          chip.classList.add("is-selected");
          chip.setAttribute("aria-pressed", "true");
          if (hiddenInput) {
            hiddenInput.value = chip.getAttribute("data-value") || chip.textContent.trim();
          }
        });
      });
    });
  }

  // 8. Auto-Uppercase & Registration Formatter
  function initVehicleNumberInputs() {
    document.querySelectorAll(".uppercase-input").forEach((input) => {
      input.addEventListener("input", (e) => {
        let val = e.target.value.toUpperCase();
        val = val.replace(/[^A-Z0-9 ]/g, "");
        e.target.value = val;
      });
    });
  }

  // 9. WhatsApp Quote URL Builder
  function buildWhatsAppQuoteUrl(formData = {}) {
    const parts = ["Hi HSV Auto Recycling, I want to get a quote for scrapping my vehicle."];
    if (formData.name) parts.push(`• Name: ${formData.name}`);
    if (formData.phone) parts.push(`• Mobile: ${formData.phone}`);
    if (formData.vehicleNumber) parts.push(`• Vehicle No: ${formData.vehicleNumber}`);
    if (formData.vehicleType) parts.push(`• Type: ${formData.vehicleType}`);
    if (formData.condition) parts.push(`• Condition: ${formData.condition}`);
    if (formData.location) parts.push(`• Location: ${formData.location}`);
    if (formData.message) parts.push(`• Note: ${formData.message}`);

    return `${HSV_WHATSAPP_BASE}?text=${encodeURIComponent(parts.join("\n"))}`;
  }

  function isValidIndianPhone(phone) {
    const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
    return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(cleaned);
  }

  // 10. Quote Form Submission & Validation
  function initQuoteForms() {
    document.querySelectorAll(".quote-form").forEach((form) => {
      const vehicleNumInput = form.querySelector("[name='vehicle_number']");
      const phoneInput = form.querySelector("[name='mobile_number']");
      const nameInput = form.querySelector("[name='name']");
      const typeInput = form.querySelector("[name='vehicle_type']");
      const conditionInput = form.querySelector("[name='vehicle_condition']");
      const locationInput = form.querySelector("[name='pickup_location']");
      const submitBtn = form.querySelector("button[type='submit']");
      const askWaBtn = form.querySelector(".ask-whatsapp-btn");
      const successBanner = form.parentElement.querySelector(".form-success-banner");

      let hasInteracted = false;
      form.addEventListener("focusin", () => {
        if (!hasInteracted) {
          hasInteracted = true;
          trackEvent("quote_form_started");
        }
      });

      if (askWaBtn) {
        askWaBtn.addEventListener("click", (e) => {
          e.preventDefault();
          trackEvent("whatsapp_clicked", { source: "quote_form_ask" });
          const currentData = {
            name: nameInput ? nameInput.value.trim() : "",
            phone: phoneInput ? phoneInput.value.trim() : "",
            vehicleNumber: vehicleNumInput ? vehicleNumInput.value.trim() : "",
            vehicleType: typeInput ? typeInput.value : "",
            condition: conditionInput ? conditionInput.value : "",
            location: locationInput ? locationInput.value.trim() : ""
          };
          window.open(buildWhatsAppQuoteUrl(currentData), "_blank", "noopener,noreferrer");
        });
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));

        if (phoneInput && !isValidIndianPhone(phoneInput.value.trim())) {
          phoneInput.classList.add("is-invalid");
          isValid = false;
        }

        if (vehicleNumInput && vehicleNumInput.value.trim().length < 4) {
          vehicleNumInput.classList.add("is-invalid");
          isValid = false;
        }

        if (!isValid) {
          showToast("Please check the highlighted fields.");
          return;
        }

        const enquiryData = {
          name: nameInput ? nameInput.value.trim() : "Vehicle Owner",
          phone: phoneInput ? phoneInput.value.trim() : "",
          vehicleNumber: vehicleNumInput ? vehicleNumInput.value.trim() : "",
          vehicleType: typeInput ? typeInput.value : "Car",
          condition: conditionInput ? conditionInput.value : "Running",
          location: locationInput ? locationInput.value.trim() : "Bhiwani"
        };

        trackEvent("quote_form_submitted", enquiryData);

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Submitting...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          if (successBanner) {
            form.style.display = "none";
            successBanner.classList.add("is-active");

            const waBtnInSuccess = successBanner.querySelector(".success-wa-btn");
            if (waBtnInSuccess) {
              waBtnInSuccess.href = buildWhatsAppQuoteUrl(enquiryData);
            }
          }

          showToast("Thanks! HSV Auto Recycling has received your enquiry.");
        }, 650);
      });
    });
  }

  // 11. FAQ Accordion (Apple Style)
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const btn = item.querySelector(".faq-question-btn");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherBtn = other.querySelector(".faq-question-btn");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("is-open", !isOpen);
        btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
      });
    });
  }

  // 12. Bilingual Toggle Architecture (EN | हिंदी)
  const translations = {
    hi: {
      location_pill: "● भिवानी, हरियाणा",
      hero_title_1: "अपनी पुरानी गाड़ी स्क्रैप करें।",
      hero_title_legal: "कानूनी व सही तरीके से।",
      hero_lead: "उचित स्क्रैप मूल्य, गाड़ी उठाने में सहायता, तुरंत भुगतान और सरकारी नियमों के अनुसार RC कैंसलेशन सहायता प्राप्त करें।",
      btn_get_quote: "स्क्रैप कोट प्राप्त करें",
      btn_whatsapp: "व्हाट्सएप करें",
      btn_call: "कॉल करें",
      trust_1: "स्क्रैप वाहन",
      trust_2: "तुरंत भुगतान",
      trust_3: "RC कैंसलेशन",
      trust_4: "पिकअप सहायता",
      quote_title: "स्क्रैप कोट प्राप्त करें",
      quote_sub: "गाड़ी की जानकारी दें। HSV टीम आपसे संपर्क करेगी।"
    },
    en: {
      location_pill: "● Bhiwani, Haryana",
      hero_title_1: "Scrap your old vehicle.",
      hero_title_legal: "The legal way.",
      hero_lead: "Get a fair scrap quote, vehicle pickup assistance, instant payment and RC cancellation support — handled according to applicable government norms.",
      btn_get_quote: "GET MY SCRAP QUOTE",
      btn_whatsapp: "WHATSAPP US",
      btn_call: "Call 9896226697",
      trust_1: "Scrap Vehicles",
      trust_2: "Instant Payment",
      trust_3: "RC Cancellation",
      trust_4: "Pickup Assistance",
      quote_title: "Get your scrap quote",
      quote_sub: "Tell us about your vehicle. We'll contact you with the next steps."
    }
  };

  function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll(".lang-btn");
    if (!langBtns.length) return;

    function setLanguage(lang) {
      localStorage.setItem("hsv_lang", lang);
      langBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-lang") === lang));

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
    }

    langBtns.forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
    });

    const savedLang = localStorage.getItem("hsv_lang") || "en";
    if (savedLang === "hi") setLanguage("hi");
  }

  // DOM Ready Initialization
  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initHeadingWordIllumination();
    initScrollReveals();
    initStickyStorytelling();
    initThemeTransitions();
    initMobileNav();
    initChipSelectors();
    initVehicleNumberInputs();
    initQuoteForms();
    initFAQ();
    initLanguageSwitcher();
  });
})();
