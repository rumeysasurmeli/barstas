
"use strict";

// Şirketin WhatsApp numarasını ülke koduyla, + işareti olmadan yaz.
// Örnek Türkiye numarası biçimi: 905xxxxxxxxx
const WHATSAPP_NUMBER = "905XXXXXXXXX";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const menuLinks = document.querySelectorAll(".nav-links a");
  const quoteForm = document.querySelector("#quote-form");
  const serviceSelect = document.querySelector("#service");
  const formStatus = document.querySelector("#form-status");

  // Mobil menü
  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menüyü aç");
    menuToggle.textContent = "☰";
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menüyü kapat" : "Menüyü aç"
      );
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) closeMenu();
    });
  }

  // Hizmet kartından teklif formuna hizmet aktarımı
  document.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedService = button.dataset.service;

      if (serviceSelect && selectedService) {
        const matchingOption = Array.from(serviceSelect.options).find(
          (option) =>
            option.value === selectedService ||
            option.textContent.trim() === selectedService
        );

        if (matchingOption) {
          serviceSelect.value = matchingOption.value;
        }
      }
    });
  });

  // Teklif formu: bilgileri WhatsApp mesajı olarak hazırla
  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!quoteForm.reportValidity()) return;

      if (
        !WHATSAPP_NUMBER ||
        WHATSAPP_NUMBER.includes("X") ||
        !/^\d{10,15}$/.test(WHATSAPP_NUMBER)
      ) {
        if (formStatus) {
          formStatus.textContent =
            "Teklif formunu etkinleştirmek için script.js içindeki WhatsApp numarasını güncelleyin.";
        }
        return;
      }

      const name = document.querySelector("#name")?.value.trim() || "";
      const phone = document.querySelector("#phone")?.value.trim() || "";
      const service = serviceSelect?.value || "Belirtilmedi";
      const message =
        document.querySelector("#message")?.value.trim() || "Ek açıklama yok";

      const whatsappMessage = [
        "Merhaba BarsTaş Yapı, web siteniz üzerinden teklif talebi oluşturuyorum.",
        "",
        `Ad Soyad: ${name}`,
        `Telefon: ${phone}`,
        `İlgilenilen hizmet: ${service}`,
        `Proje detayları: ${message}`
      ].join("\n");

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");

      if (formStatus) {
        formStatus.textContent =
          "WhatsApp mesajı açılıyor. Göndermek için WhatsApp ekranında mesajı onaylayın.";
      }
    });
  }

  // Güncel yılı otomatik göster
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
