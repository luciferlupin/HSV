/**
 * HSV AUTO RECYCLING — CORE CLIENT JAVASCRIPT
 * Bhiwani, Haryana, India
 * Fast, lightweight, accessible, zero third-party dependencies
 */

(function () {
  "use strict";

  // Configuration & Constants
  const HSV_PHONE = "9896226697";
  const HSV_PHONE_INTL = "+919896226697";
  const HSV_WHATSAPP_BASE = "https://wa.me/919896226697";
  const DEFAULT_WA_MESSAGE = "Hi HSV Auto Recycling, I want to get a quote for scrapping my vehicle.";

  // Analytics Event Tracker
  function trackEvent(eventName, payload = {}) {
    try {
      const eventDetail = { eventName, payload, timestamp: new Date().toISOString() };
      window.dispatchEvent(new CustomEvent("hsv_analytics", { detail: eventDetail }));
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: eventName, ...payload });
      }
      // console.log("[HSV Analytics]", eventName, payload);
    } catch (e) {
      // safe fallback
    }
  }

  // Toast Notification
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

  // Sticky Header Scroll State
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile Navigation Sheet
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

    // Close on navigation link click
    mobileSheet.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileSheet.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  }

  // Chip Group Selectors
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

  // Uppercase Vehicle Number Formatter
  function initVehicleNumberInputs() {
    document.querySelectorAll(".uppercase-input").forEach((input) => {
      input.addEventListener("input", (e) => {
        let val = e.target.value.toUpperCase();
        // Keep alphanumeric and single spaces
        val = val.replace(/[^A-Z0-9 ]/g, "");
        e.target.value = val;
      });
    });
  }

  // Build dynamic WhatsApp enquiry text
  function buildWhatsAppQuoteUrl(formData = {}) {
    const parts = ["Hi HSV Auto Recycling, I want to get a quote for scrapping my vehicle."];
    if (formData.name) parts.push(`• Name: ${formData.name}`);
    if (formData.phone) parts.push(`• Mobile: ${formData.phone}`);
    if (formData.vehicleNumber) parts.push(`• Vehicle No: ${formData.vehicleNumber}`);
    if (formData.vehicleType) parts.push(`• Type: ${formData.vehicleType}`);
    if (formData.condition) parts.push(`• Condition: ${formData.condition}`);
    if (formData.location) parts.push(`• Location: ${formData.location}`);
    if (formData.message) parts.push(`• Note: ${formData.message}`);

    const message = parts.join("\n");
    return `${HSV_WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
  }

  // Indian Phone Validation Helper
  function isValidIndianPhone(phone) {
    const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
    // Standard 10 digit Indian mobile starting with 6, 7, 8, 9, or with 91 prefix
    return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(cleaned);
  }

  // Quote Enquiry Form
  function initQuoteForms() {
    const quoteForms = document.querySelectorAll(".quote-form");

    quoteForms.forEach((form) => {
      const vehicleNumInput = form.querySelector("[name='vehicle_number']");
      const phoneInput = form.querySelector("[name='mobile_number']");
      const nameInput = form.querySelector("[name='name']");
      const typeInput = form.querySelector("[name='vehicle_type']");
      const conditionInput = form.querySelector("[name='vehicle_condition']");
      const locationInput = form.querySelector("[name='pickup_location']");
      const submitBtn = form.querySelector("button[type='submit']");
      const askWaBtn = form.querySelector(".ask-whatsapp-btn");
      const successBanner = form.parentElement.querySelector(".form-success-banner");

      // Track first interaction
      let hasInteracted = false;
      form.addEventListener("focusin", () => {
        if (!hasInteracted) {
          hasInteracted = true;
          trackEvent("quote_form_started");
        }
      });

      // Quick Ask on WhatsApp with current form fields
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

        // Clear errors
        form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));

        // Validate Phone
        if (phoneInput) {
          const phoneVal = phoneInput.value.trim();
          if (!isValidIndianPhone(phoneVal)) {
            phoneInput.classList.add("is-invalid");
            isValid = false;
          }
        }

        // Validate Vehicle Number (at least 4 chars)
        if (vehicleNumInput) {
          const vehVal = vehicleNumInput.value.trim();
          if (vehVal.length < 4) {
            vehicleNumInput.classList.add("is-invalid");
            isValid = false;
          }
        }

        if (!isValid) {
          showToast("Please check the highlighted fields.");
          return;
        }

        // Simulate fast enquiry dispatch & store locally
        const enquiryData = {
          name: nameInput ? nameInput.value.trim() : "Vehicle Owner",
          phone: phoneInput ? phoneInput.value.trim() : "",
          vehicleNumber: vehicleNumInput ? vehicleNumInput.value.trim() : "",
          vehicleType: typeInput ? typeInput.value : "Car",
          condition: conditionInput ? conditionInput.value : "Running",
          location: locationInput ? locationInput.value.trim() : "Bhiwani"
        };

        trackEvent("quote_form_submitted", enquiryData);

        // UI Loading
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          Submitting...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          if (successBanner) {
            form.style.display = "none";
            successBanner.classList.add("is-active");

            // Update success banner buttons with exact dynamic link
            const waBtnInSuccess = successBanner.querySelector(".success-wa-btn");
            if (waBtnInSuccess) {
              waBtnInSuccess.href = buildWhatsAppQuoteUrl(enquiryData);
            }
          }

          showToast("Thanks! HSV Auto Recycling has received your enquiry.");
        }, 700);
      });
    });
  }

  // Business Enquiry Form
  function initBusinessForm() {
    const bizForm = document.querySelector("#business-enquiry-form");
    if (!bizForm) return;

    bizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneInput = bizForm.querySelector("[name='phone']");
      const companyInput = bizForm.querySelector("[name='company_name']");

      if (phoneInput && !isValidIndianPhone(phoneInput.value.trim())) {
        phoneInput.classList.add("is-invalid");
        showToast("Please enter a valid 10-digit mobile number.");
        return;
      }

      trackEvent("business_enquiry_submitted", {
        company: companyInput ? companyInput.value.trim() : ""
      });

      const submitBtn = bizForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting Enquiry...";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enquiry Submitted Successfully";
        bizForm.reset();
        showToast("HSV Auto Recycling will review your bulk vehicle request.");
      }, 700);
    });
  }

  // FAQ Accordion
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const btn = item.querySelector(".faq-question-btn");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Close other items for crisp accordion feel
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

  // Track Direct Contact Clicks
  function initClickTracking() {
    document.querySelectorAll("a[href^='tel:']").forEach((link) => {
      link.addEventListener("click", () => trackEvent("phone_clicked", { href: link.href }));
    });

    document.querySelectorAll("a[href*='wa.me'], a[href*='whatsapp.com']").forEach((link) => {
      link.addEventListener("click", () => trackEvent("whatsapp_clicked", { href: link.href }));
    });

    document.querySelectorAll("a[href^='mailto:']").forEach((link) => {
      link.addEventListener("click", () => trackEvent("email_clicked", { href: link.href }));
    });

    document.querySelectorAll("a[href*='maps']").forEach((link) => {
      link.addEventListener("click", () => trackEvent("directions_clicked", { href: link.href }));
    });
  }

  // Smooth Anchor Navigation Offset
  function initSmoothScroll() {
    document.querySelectorAll("a[href^='#']").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#" || targetId.length < 2) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }

  // High-Quality Bilingual Architecture (EN | हिंदी)
  const translations = {
    hi: {
      location_pill: "● भिवानी, हरियाणा",
      hero_title_1: "अपनी पुरानी गाड़ी स्क्रैप करें।",
      hero_title_legal: "कानूनी व सही तरीके से।",
      hero_lead: "उचित स्क्रैप मूल्य, गाड़ी उठाने में सहायता, तुरंत भुगतान और सरकारी नियमों के अनुसार RC कैंसलेशन सहायता प्राप्त करें।",
      btn_get_quote: "स्क्रैप कोट प्राप्त करें",
      btn_whatsapp: "व्हाट्सएप करें",
      btn_call: "कॉल करें",
      trust_1: "✓ स्क्रैप वाहन",
      trust_2: "✓ तुरंत भुगतान",
      trust_3: "✓ RC कैंसलेशन सहायता",
      trust_4: "✓ वाहन पिकअप सहायता",
      quote_title: "स्क्रैप कोट प्राप्त करें",
      quote_sub: "गाड़ी की जानकारी दें। HSV टीम आपसे संपर्क करेगी।",
      label_veh_no: "गाड़ी नंबर",
      label_veh_type: "वाहन प्रकार",
      label_veh_cond: "वाहन की स्थिति",
      label_pickup_loc: "पिकअप स्थान",
      label_name: "नाम",
      label_phone: "मोबाइल नंबर",
      tagline_footer: "“हम स्क्रैप वाहनों में डील करते हैं”"
    },
    en: {
      location_pill: "● Bhiwani, Haryana",
      hero_title_1: "Scrap your old vehicle.",
      hero_title_legal: "The legal way.",
      hero_lead: "Get a fair scrap quote, vehicle pickup assistance, instant payment and RC cancellation support — handled according to applicable government norms.",
      btn_get_quote: "GET MY SCRAP QUOTE",
      btn_whatsapp: "WHATSAPP US",
      btn_call: "Call 9896226697",
      trust_1: "✓ Scrap Vehicles",
      trust_2: "✓ Instant Payment",
      trust_3: "✓ RC Cancellation",
      trust_4: "✓ Pickup Assistance",
      quote_title: "Get your scrap quote",
      quote_sub: "Tell us about your vehicle. We'll contact you with the next steps.",
      label_veh_no: "Vehicle Number",
      label_veh_type: "Vehicle Type",
      label_veh_cond: "Vehicle Condition",
      label_pickup_loc: "Pickup Location",
      label_name: "Name",
      label_phone: "Mobile Number",
      tagline_footer: "“We Deal In Scrap Vehicles”"
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
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        setLanguage(lang);
      });
    });

    // Check saved language preference
    const savedLang = localStorage.getItem("hsv_lang") || "en";
    if (savedLang === "hi") {
      setLanguage("hi");
    }
  }

  // Initialize all components once DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileNav();
    initChipSelectors();
    initVehicleNumberInputs();
    initQuoteForms();
    initBusinessForm();
    initFAQ();
    initClickTracking();
    initSmoothScroll();
    initLanguageSwitcher();
  });
})();
