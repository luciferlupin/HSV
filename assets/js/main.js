/**
 * HSV AUTO RECYCLING — HIGH-PERFORMANCE INTERACTIVE MOTION CONTROLLER
 * Apple-inspired Storytelling • 60 FPS Scroll Choreography • Zero Bloat
 */

(function () {
  "use strict";

  const HSV_PHONE = "9896980981";
  const HSV_PHONE_ALT = "9999929019";
  const HSV_WHATSAPP_BASE = "https://wa.me/919896980981";

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
      location_pill: "● भिवानी, हरियाणा एवं दिल्ली",
      hero_title_1: "अधिकृत वाहन स्क्रैपिंग सेवा।",
      hero_title_legal: "सरकारी नियमों के अनुसार।",
      hero_lead: "पारदर्शी स्क्रैप मूल्यांकन, निःशुल्क पिकअप, तत्काल बैंक भुगतान एवं परिवहन VAHAN पोर्टल से RC निरस्तीकरण सहायता (भिवानी, हरियाणा एवं दिल्ली)।",
      btn_get_quote: "मूल्यांकन कोट प्राप्त करें",
      btn_whatsapp: "विशेषज्ञ से व्हाट्सएप करें",
      btn_call: "कॉल करें 9896980981 / 9999929019",
      trust_1: "VAHAN निरस्तीकरण",
      trust_2: "तत्काल IMPS भुगतान",
      trust_3: "डोरस्टेप टोइंग फ्लीट",
      trust_4: "MoRTH अनुपालन",
      quote_title: "स्क्रैप मूल्यांकन कोटेशन",
      quote_sub: "वाहन विवरण साझा करें, HSV टीम संपूर्ण कानूनी प्रक्रिया के साथ तुरंत संपर्क करेगी।"
    },
    en: {
      location_pill: "● Bhiwani, Haryana & Delhi",
      hero_title_1: "Authorized Vehicle Scrapping.",
      hero_title_legal: "The Compliant Standard.",
      hero_lead: "Direct end-of-life vehicle acquisition, auditable scrap valuation, doorstep recovery, and complete Parivahan VAHAN de-registration compliance across Bhiwani, Haryana & Delhi.",
      btn_get_quote: "GET VALUATION QUOTE",
      btn_whatsapp: "WHATSAPP SPECIALIST",
      btn_call: "Call 9896980981 / 9999929019",
      trust_1: "VAHAN De-Registration",
      trust_2: "Instant IMPS Settlement",
      trust_3: "Doorstep Towing Fleet",
      trust_4: "MoRTH Compliance",
      quote_title: "Request Vehicle Scrap Valuation",
      quote_sub: "Submit vehicle details for an auditable scrap value assessment and compliance roadmap."
    }
  };

  function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll(".lang-btn");
    if (!langBtns.length) return;

    function setLanguage(lang) {
      document.documentElement.lang = lang;
      localStorage.setItem("hsv_lang", lang);

      langBtns.forEach((btn) => {
        btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
      });

      const t = translations[lang] || translations.en;
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) {
          el.textContent = t[key];
        }
      });
    }

    langBtns.forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
    });

    const savedLang = localStorage.getItem("hsv_lang") || "en";
    if (savedLang === "hi") setLanguage("hi");
  }

  // ==========================================================================
  // 13. GLOBAL SPOTLIGHT COMMAND PALETTE & SEARCH SYSTEM
  // ==========================================================================
  const SEARCH_DATABASE = [
    // Pages
    {
      title: "Home",
      desc: "Authorized vehicle scrapping facility in Bhiwani, Haryana & Delhi NCR.",
      category: "pages",
      url: "index.html",
      keywords: "home main landing hsv auto recycling vehicle scrap yard bhiwani haryana"
    },
    {
      title: "Our Services",
      desc: "Comprehensive car, two-wheeler, commercial & accidental vehicle dismantling.",
      category: "services",
      url: "services.html",
      keywords: "services scrap car bike truck bus commercial accidental vehicle recycling"
    },
    {
      title: "How It Works",
      desc: "Step-by-step compliant process: Valuation, Doorstep Pickup, IMPS Payment & RC Cancellation.",
      category: "pages",
      url: "how-it-works.html",
      keywords: "process steps timeline procedure how it works valuation towing payment rc"
    },
    {
      title: "Paperwork & RC De-Registration",
      desc: "Parivahan VAHAN de-registration, Certificate of Deposit (COD), Certificate of Vehicle Scrapping (CVS).",
      category: "compliance",
      url: "paperwork.html",
      keywords: "paperwork rc cancellation vahan rto certificate deposit scrapping cod cvs morth transfer aadhaar pan"
    },
    {
      title: "For Businesses & Fleet Disposal",
      desc: "Corporate, logistics, institutional & multi-vehicle scrap solutions with formal auditable invoices.",
      category: "services",
      url: "business.html",
      keywords: "business fleet commercial corporate multi vehicle tender auction bulk scrap logistics transporter"
    },
    {
      title: "Service Areas & Regional Corridors",
      desc: "Doorstep flatbed recovery across Bhiwani, Charkhi Dadri, Hansi, Hisar, Rohtak, Delhi NCR & Haryana.",
      category: "areas",
      url: "service-areas.html",
      keywords: "service areas location bhiwani delhi haryana charkhi dadri hansi hisar rohtak tosham maham 127021"
    },
    {
      title: "Frequently Asked Questions (FAQs)",
      desc: "Factual answers regarding pricing, pickup logistics, legal rules & documentation.",
      category: "faqs",
      url: "faq.html",
      keywords: "faq questions answers doubts help legal price payment documents pickup"
    },
    {
      title: "Contact & Facility Dispatch",
      desc: "Call Vivek Singh directly at 9896980981 / 9999929019 or WhatsApp us anytime.",
      category: "actions",
      url: "contact.html",
      keywords: "contact phone vivek singh mobile whatsapp address location new vidya nagar bhiwani"
    },

    // Specific Services & Features
    {
      title: "End-of-Life Car Scrapping",
      desc: "Scrap 10/15 year old petrol & diesel cars in compliance with MoRTH regulations.",
      category: "services",
      url: "services.html#car-scrapping",
      keywords: "car scrap 15 year 10 year old diesel petrol sedan hatchback suv"
    },
    {
      title: "Two-Wheeler & Bike Scrapping",
      desc: "Safe dismantling and RC record retirement for scrap motorcycles and scooters.",
      category: "services",
      url: "services.html#bike-scrapping",
      keywords: "bike motorcycle scooter scooty two wheeler scrap"
    },
    {
      title: "Commercial & Truck Dismantling",
      desc: "Dismantling heavy trucks, LCVs, tempos, buses, and commercial transport vehicles.",
      category: "services",
      url: "services.html#commercial-scrapping",
      keywords: "truck tempo lcv bus commercial heavy vehicle scrap tata mahindra eicher"
    },
    {
      title: "Accidental & Total Loss Vehicles",
      desc: "Salvage valuation and eco-compliant recycling for non-drivable and damaged vehicles.",
      category: "services",
      url: "services.html#accidental-scrapping",
      keywords: "accidental damage insurance total loss non running burnt flood flooded"
    },

    // Compliance & Paperwork specifics
    {
      title: "Parivahan VAHAN RC Cancellation Guidance",
      desc: "Official guidance to de-register vehicle numbers on the national Parivahan database.",
      category: "compliance",
      url: "paperwork.html#rc-cancellation",
      keywords: "rc cancellation parivahan vahan rto online deregistration legal notice"
    },
    {
      title: "Certificate of Deposit (COD) & New Car Tax Rebate",
      desc: "Receive Certificate of Deposit for motor vehicle tax concessions on your next vehicle purchase.",
      category: "compliance",
      url: "paperwork.html#certificate-deposit",
      keywords: "cod certificate deposit road tax discount rebate concession new car buy"
    },
    {
      title: "Chassis Plate Cutting & Destruction Proof",
      desc: "Complete visual proof and physical chassis number plate handover ensuring vehicle cannot be misused.",
      category: "compliance",
      url: "paperwork.html#chassis-cut",
      keywords: "chassis plate number cut cut-out misuse protection photo video proof safety"
    },

    // Areas & Pincodes
    {
      title: "Bhiwani Facility & Immediate Pickup (127021)",
      desc: "Primary facility base in New Vidya Nagar, Bhiwani. Immediate daily dispatch across the district.",
      category: "areas",
      url: "service-areas.html#bhiwani",
      keywords: "bhiwani 127021 vidya nagar haryana local scrap yard"
    },
    {
      title: "Delhi NCR Flatbed Recovery",
      desc: "Scheduled vehicle collection for 10-year diesel and 15-year petrol vehicles across Delhi NCR.",
      category: "areas",
      url: "service-areas.html#delhi",
      keywords: "delhi ncr south delhi north delhi dwarka rohini gurgaon gurugram noida 110001"
    },
    {
      title: "Charkhi Dadri & Hansi / Hisar Corridor",
      desc: "Regular transit pickups covering Dadri (127306), Hansi (125033), and Hisar (125001).",
      category: "areas",
      url: "service-areas.html#hisar-dadri",
      keywords: "charkhi dadri 127306 hansi 125033 hisar 125001 corridor flatbed"
    },
    {
      title: "Rohtak & Maham Highway Service",
      desc: "Express vehicle pickup along the NH corridor covering Rohtak (124001) and Maham.",
      category: "areas",
      url: "service-areas.html#rohtak",
      keywords: "rohtak 124001 maham meham highway bypass pickup"
    },

    // Direct Action Shortcuts
    {
      title: "Get Instant Scrap Quote Online",
      desc: "Submit your vehicle details online for rapid scrap valuation and callback.",
      category: "actions",
      url: "index.html#quote-enquiry",
      keywords: "quote estimate price rate cost calculate valuation form online"
    },
    {
      title: "Direct Call: Vivek Singh (9896980981)",
      desc: "Speak immediately with HSV Auto Recycling facility management for prompt answers.",
      category: "actions",
      url: "tel:9896980981",
      keywords: "call phone ring speak vivek singh contact number 9896980981"
    },
    {
      title: "Direct WhatsApp: Instant Photo Evaluation",
      desc: "Send vehicle RC & photos on WhatsApp for an immediate valuation offer.",
      category: "actions",
      url: "https://wa.me/919896980981?text=Hi%20HSV%20Auto%20Recycling%2C%20I%20want%20a%20scrap%20valuation%20for%20my%20vehicle.",
      keywords: "whatsapp chat message photo evaluation send rc picture 9896980981"
    }
  ];

  function getCategoryLabel(cat) {
    switch (cat) {
      case "services": return "Service";
      case "compliance": return "RC & Legal";
      case "areas": return "Location";
      case "faqs": return "FAQ";
      case "actions": return "Quick Action";
      case "pages": return "Page";
      default: return "Result";
    }
  }

  function getCategoryIcon(cat) {
    switch (cat) {
      case "services":
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`;
      case "compliance":
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
      case "areas":
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
      case "actions":
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
      default:
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    }
  }

  function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m]));
  }

  function highlightMatch(text, query) {
    if (!query || !text) return escapeHtml(text);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return escapeHtml(text).replace(regex, `<mark class="hsv-search-match-highlight">$1</mark>`);
  }

  function initGlobalSearch() {
    // 1. Inject or locate search trigger button in header
    const navActions = document.querySelector(".nav-actions");
    if (navActions && !document.getElementById("open-search-btn")) {
      const searchBtn = document.createElement("button");
      searchBtn.type = "button";
      searchBtn.className = "header-search-btn";
      searchBtn.id = "open-search-btn";
      searchBtn.setAttribute("aria-label", "Search HSV Auto Recycling");
      searchBtn.setAttribute("title", "Quick Search (Press Cmd+K or /)");
      searchBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span class="search-btn-label">Search...</span>
        <kbd class="search-btn-kbd"><abbr title="Command">⌘</abbr>K</kbd>
      `;
      // Place before language pill or as first action item
      navActions.insertBefore(searchBtn, navActions.firstChild);
    }

    // 2. Inject global modal dialog if not already in DOM
    let overlay = document.getElementById("hsv-search-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "hsv-search-overlay";
      overlay.className = "hsv-search-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Site-wide search");

      overlay.innerHTML = `
        <div class="hsv-search-modal" role="document">
          <div class="hsv-search-header">
            <svg class="hsv-search-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="search" 
              id="hsv-global-search-input" 
              class="hsv-search-input" 
              placeholder="Search services, RC cancellation, locations, or pricing..." 
              autocomplete="off" 
              spellcheck="false"
              aria-autocomplete="list"
              aria-controls="hsv-search-results-list"
            />
            <button type="button" class="hsv-search-clear-btn" id="hsv-search-clear" aria-label="Clear query">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <button type="button" class="hsv-search-close-btn" id="hsv-search-close" aria-label="Close search">ESC</button>
          </div>

          <div class="hsv-search-filter-bar" role="tablist" aria-label="Filter Search Categories">
            <button type="button" class="hsv-filter-chip is-active" data-cat="all" role="tab" aria-selected="true">All</button>
            <button type="button" class="hsv-filter-chip" data-cat="services" role="tab" aria-selected="false">Services</button>
            <button type="button" class="hsv-filter-chip" data-cat="compliance" role="tab" aria-selected="false">RC &amp; Legal</button>
            <button type="button" class="hsv-filter-chip" data-cat="areas" role="tab" aria-selected="false">Locations</button>
            <button type="button" class="hsv-filter-chip" data-cat="faqs" role="tab" aria-selected="false">FAQs</button>
            <button type="button" class="hsv-filter-chip" data-cat="actions" role="tab" aria-selected="false">Direct Action</button>
          </div>

          <div class="hsv-search-body" id="hsv-search-results-list" role="listbox">
            <!-- Dynamic Results Injected Here -->
          </div>

          <div class="hsv-search-footer">
            <div class="hsv-search-shortcuts">
              <span class="hsv-search-shortcut-item"><span class="hsv-search-shortcut-key">↑</span><span class="hsv-search-shortcut-key">↓</span> Navigate</span>
              <span class="hsv-search-shortcut-item"><span class="hsv-search-shortcut-key">↵</span> Select</span>
              <span class="hsv-search-shortcut-item"><span class="hsv-search-shortcut-key">ESC</span> Close</span>
            </div>
            <div>HSV Auto Recycling • Bhiwani, HR</div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    const searchInput = document.getElementById("hsv-global-search-input");
    const resultsContainer = document.getElementById("hsv-search-results-list");
    const clearBtn = document.getElementById("hsv-search-clear");
    const closeBtn = document.getElementById("hsv-search-close");
    const filterChips = overlay.querySelectorAll(".hsv-filter-chip");

    let currentCategory = "all";
    let selectedIndex = -1;
    let visibleItems = [];

    function openSearch(initialQuery = "") {
      overlay.classList.add("is-active");
      document.body.style.overflow = "hidden";
      if (initialQuery && searchInput) {
        searchInput.value = initialQuery;
      }
      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
          if (initialQuery) searchInput.select();
        }
      }, 50);
      renderResults(searchInput ? searchInput.value.trim() : "");
      trackEvent("search_opened");
    }

    function closeSearch() {
      overlay.classList.remove("is-active");
      document.body.style.overflow = "";
      if (searchInput) searchInput.value = "";
      selectedIndex = -1;
    }

    function filterItems(query, category) {
      const q = query.toLowerCase().trim();
      return SEARCH_DATABASE.filter((item) => {
        const matchesCategory = category === "all" || item.category === category;
        if (!matchesCategory) return false;
        if (!q) return true;

        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.desc.toLowerCase().includes(q);
        const inKeywords = item.keywords.toLowerCase().includes(q);
        return inTitle || inDesc || inKeywords;
      });
    }

    function renderResults(query) {
      visibleItems = filterItems(query, currentCategory);
      selectedIndex = visibleItems.length > 0 ? 0 : -1;

      if (clearBtn) {
        clearBtn.classList.toggle("is-visible", Boolean(query));
      }

      if (visibleItems.length === 0) {
        resultsContainer.innerHTML = `
          <div class="hsv-search-empty-state">
            <svg class="hsv-search-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <div class="hsv-search-empty-title">No matching information found</div>
            <p class="hsv-search-empty-text">
              We couldn't find "${escapeHtml(query)}". You can chat directly with our facility team on WhatsApp for prompt help.
            </p>
            <div class="hsv-search-quick-links">
              <a href="${HSV_WHATSAPP_BASE}?text=Hi%20HSV%20Auto%20Recycling%2C%20I%20have%20a%20question%20about%20${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="font-size: 0.85rem; padding: 0.45rem 1rem;">
                Ask Vivek Singh on WhatsApp
              </a>
              <a href="tel:9896980981" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.45rem 1rem;">
                Call 9896980981
              </a>
            </div>
          </div>
        `;
        return;
      }

      // Render items with category labels
      let html = "";
      if (!query && currentCategory === "all") {
        html += `<div class="hsv-search-group-title">Quick Actions &amp; Top Pages</div>`;
      } else {
        html += `<div class="hsv-search-group-title">${visibleItems.length} Result${visibleItems.length === 1 ? "" : "s"} Available</div>`;
      }

      visibleItems.forEach((item, idx) => {
        const isSelected = idx === selectedIndex;
        const iconSvg = getCategoryIcon(item.category);
        const tagLabel = getCategoryLabel(item.category);
        const isExternal = item.url.startsWith("http") || item.url.startsWith("tel:");

        html += `
          <a 
            href="${item.url}" 
            class="hsv-search-item ${isSelected ? "is-selected" : ""}" 
            data-index="${idx}"
            role="option"
            aria-selected="${isSelected ? "true" : "false"}"
            ${isExternal && !item.url.startsWith("tel:") ? 'target="_blank" rel="noopener noreferrer"' : ""}
          >
            <div class="hsv-search-item-left">
              <span class="hsv-search-item-icon">${iconSvg}</span>
              <div class="hsv-search-item-texts">
                <span class="hsv-search-item-title">${highlightMatch(item.title, query)}</span>
                <span class="hsv-search-item-desc">${highlightMatch(item.desc, query)}</span>
              </div>
            </div>
            <span class="hsv-search-item-tag">${tagLabel}</span>
          </a>
        `;
      });

      resultsContainer.innerHTML = html;

      // Click event for items
      resultsContainer.querySelectorAll(".hsv-search-item").forEach((el) => {
        el.addEventListener("click", () => {
          trackEvent("search_item_clicked", {
            query,
            title: el.querySelector(".hsv-search-item-title")?.textContent
          });
          closeSearch();
        });
      });
    }

    function updateSelection(newIndex) {
      if (!visibleItems.length) return;
      selectedIndex = Math.max(0, Math.min(newIndex, visibleItems.length - 1));

      const items = resultsContainer.querySelectorAll(".hsv-search-item");
      items.forEach((item, idx) => {
        const selected = idx === selectedIndex;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", selected ? "true" : "false");
        if (selected) {
          item.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      });
    }

    // Attach search triggers
    document.querySelectorAll("#open-search-btn, .header-search-btn, [data-action='open-search']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openSearch();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderResults(e.target.value.trim());
      });

      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          updateSelection(selectedIndex + 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          updateSelection(selectedIndex - 1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (selectedIndex >= 0 && visibleItems[selectedIndex]) {
            const targetItem = visibleItems[selectedIndex];
            trackEvent("search_item_navigated", { title: targetItem.title });
            if (targetItem.url.startsWith("http") && !targetItem.url.startsWith(window.location.origin)) {
              window.open(targetItem.url, "_blank", "noopener,noreferrer");
            } else {
              window.location.href = targetItem.url;
            }
            closeSearch();
          }
        } else if (e.key === "Escape") {
          closeSearch();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) {
          searchInput.value = "";
          searchInput.focus();
          renderResults("");
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeSearch);
    }

    // Category chips click
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => {
          c.classList.remove("is-active");
          c.setAttribute("aria-selected", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");
        currentCategory = chip.getAttribute("data-cat") || "all";
        renderResults(searchInput ? searchInput.value.trim() : "");
      });
    });

    // Close on overlay backdrop click
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeSearch();
      }
    });

    // Keyboard Shortcuts (Cmd+K / Ctrl+K / Slash key)
    document.addEventListener("keydown", (e) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (overlay.classList.contains("is-active")) {
          closeSearch();
        } else {
          openSearch();
        }
      }

      // Single forward slash '/' when not inside an input/textarea
      if (e.key === "/" && !overlay.classList.contains("is-active")) {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (activeTag !== "input" && activeTag !== "textarea" && !document.activeElement.isContentEditable) {
          e.preventDefault();
          openSearch();
        }
      }

      // Escape to close
      if (e.key === "Escape" && overlay.classList.contains("is-active")) {
        closeSearch();
      }
    });

    // Expose search trigger globally
    window.hsvOpenSearch = openSearch;
  }

  // ==========================================================================
  // 14. DEDICATED FAQ IN-PAGE SEARCH & CATEGORY FILTERING
  // ==========================================================================
  function initFaqSearch() {
    const faqSearchInput = document.getElementById("faq-search-input");
    const faqContainer = document.querySelector(".faq-container");
    const faqItems = document.querySelectorAll(".faq-item");
    const countIndicator = document.getElementById("faq-count-indicator");
    const clearBtn = document.getElementById("faq-search-clear");
    const noResultsBanner = document.getElementById("faq-no-results");
    const filterPills = document.querySelectorAll(".faq-filter-pill");

    if (!faqContainer || !faqItems.length) return;

    let activeFilterCategory = "all";

    function filterFaqs() {
      const query = faqSearchInput ? faqSearchInput.value.toLowerCase().trim() : "";
      let visibleCount = 0;

      if (clearBtn) {
        clearBtn.classList.toggle("is-visible", Boolean(query));
      }

      faqItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category") || "general";
        const questionBtn = item.querySelector(".faq-question-btn span");
        const answerText = item.querySelector(".faq-answer-text");

        const qText = questionBtn ? questionBtn.textContent.toLowerCase() : "";
        const aText = answerText ? answerText.textContent.toLowerCase() : "";

        const matchesCat = activeFilterCategory === "all" || itemCategory === activeFilterCategory;
        const matchesQuery = !query || qText.includes(query) || aText.includes(query);

        if (matchesCat && matchesQuery) {
          item.style.display = "";
          visibleCount++;
          // Open matching item if query is actively typed
          if (query) {
            item.classList.add("is-open");
            const btn = item.querySelector(".faq-question-btn");
            if (btn) btn.setAttribute("aria-expanded", "true");
          }
        } else {
          item.style.display = "none";
        }
      });

      if (countIndicator) {
        countIndicator.textContent = `Showing ${visibleCount} of ${faqItems.length} questions`;
      }

      if (noResultsBanner) {
        noResultsBanner.classList.toggle("is-active", visibleCount === 0);
        const queryDisplay = noResultsBanner.querySelector(".faq-empty-query");
        if (queryDisplay) queryDisplay.textContent = query;
      }
    }

    if (faqSearchInput) {
      faqSearchInput.addEventListener("input", filterFaqs);
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (faqSearchInput) {
          faqSearchInput.value = "";
          faqSearchInput.focus();
          filterFaqs();
        }
      });
    }

    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");
        activeFilterCategory = pill.getAttribute("data-category") || "all";
        filterFaqs();
      });
    });

    // Check for URL hash search param
    const hash = window.location.hash;
    if (hash && hash.startsWith("#search=")) {
      const q = decodeURIComponent(hash.replace("#search=", ""));
      if (faqSearchInput) {
        faqSearchInput.value = q;
        filterFaqs();
      }
    }
  }

  // ==========================================================================
  // 15. DEDICATED SERVICE AREA PINCODE & DISTRICT LOOKUP
  // ==========================================================================
  const SERVICE_COVERAGE_ZONES = [
    { name: "Bhiwani & Suburbs", pincodes: ["127021", "127022", "127027", "127031", "127032", "127035"], speed: "Immediate Daily Dispatch", note: "Primary yard location in New Vidya Nagar. Same-day hydraulic flatbed recovery." },
    { name: "Charkhi Dadri Belt", pincodes: ["127306", "127307", "127308", "127310", "127026"], speed: "Scheduled Daily Route", note: "Dedicated transit corridor with same-day or next-day flatbed towing." },
    { name: "Hansi & Hisar Corridor", pincodes: ["125001", "125004", "125005", "125033", "125042"], speed: "Daily Regional Transit", note: "Direct highway collection with on-site evaluation and IMPS payment." },
    { name: "Rohtak & Maham Belt", pincodes: ["124001", "124021", "124112", "124111"], speed: "Regular Route Coverage", note: "Regular highway dispatch for passenger & commercial vehicles." },
    { name: "Tosham, Bawani Khera & Loharu", pincodes: ["127040", "127032", "127201", "127028"], speed: "District Rapid Pickup", note: "Agricultural, commercial, and domestic end-of-life recovery." },
    { name: "Delhi NCR & Gurugram", pincodes: ["110001", "110002", "110012", "110015", "110020", "110025", "110030", "110045", "110075", "110085", "122001", "122002", "122018", "121001"], speed: "Dedicated Flatbed Dispatch", note: "Specialized collection for 10-year diesel & 15-year petrol vehicles." }
  ];

  function initLocationSearch() {
    const locationInput = document.getElementById("location-checker-input");
    const locationStatus = document.getElementById("location-coverage-status");
    const corridorCards = document.querySelectorAll(".bento-card[data-area]");

    if (!locationInput) return;

    function checkLocation() {
      const val = locationInput.value.trim().toLowerCase();
      if (!val) {
        if (locationStatus) locationStatus.classList.remove("is-active");
        corridorCards.forEach((c) => (c.style.display = ""));
        return;
      }

      // Match pincode or district name
      const matched = SERVICE_COVERAGE_ZONES.find((zone) => {
        const matchName = zone.name.toLowerCase().includes(val);
        const matchPin = zone.pincodes.some((pin) => pin.startsWith(val) || val.startsWith(pin));
        return matchName || matchPin;
      });

      if (matched && locationStatus) {
        locationStatus.classList.add("is-active");
        locationStatus.innerHTML = `
          <svg class="location-status-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <strong style="color: var(--color-forest); font-size: 0.98rem;">✅ Doorstep Vehicle Pickup Available in ${matched.name}</strong>
            <p style="margin: 0.25rem 0 0.5rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.45;">
              ${matched.note} • <strong>Dispatch Window: ${matched.speed}</strong>
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
              <a href="tel:9896980981" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.35rem 0.8rem;">Call Dispatch (9896980981)</a>
              <a href="https://wa.me/919896980981?text=Hi%20HSV%20Auto%20Recycling%2C%20I%20want%20to%20confirm%20pickup%20for%20location%3A%20${encodeURIComponent(val)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="font-size: 0.8rem; padding: 0.35rem 0.8rem;">WhatsApp Location</a>
            </div>
          </div>
        `;
      } else if (locationStatus) {
        locationStatus.classList.add("is-active");
        locationStatus.innerHTML = `
          <svg class="location-status-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>
            <strong style="color: #92400E; font-size: 0.95rem;">Regional Route Evaluation: "${escapeHtml(val)}"</strong>
            <p style="margin: 0.25rem 0 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              HSV fleet coordinates pickups across all Haryana & Delhi NCR districts upon request. Contact Vivek Singh to confirm flatbed availability for this specific sector.
            </p>
            <a href="https://wa.me/919896980981?text=Hi%20HSV%20Auto%20Recycling%2C%20can%20you%20pickup%20from%3A%20${encodeURIComponent(val)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="font-size: 0.8rem; padding: 0.35rem 0.8rem;">
              Confirm Pickup on WhatsApp
            </a>
          </div>
        `;
      }

      // Filter corridor cards
      if (corridorCards.length) {
        corridorCards.forEach((card) => {
          const cardText = card.textContent.toLowerCase();
          card.style.display = !val || cardText.includes(val) ? "" : "none";
        });
      }
    }

    locationInput.addEventListener("input", checkLocation);
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
    initGlobalSearch();
    initFaqSearch();
    initLocationSearch();
  });
})();

