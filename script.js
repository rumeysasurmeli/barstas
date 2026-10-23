"use strict";

const WHATSAPP_NUMBER = "905300610369";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const quoteForm = document.querySelector("#quote-form");
  const serviceSelect = document.querySelector("#service");
  const formStatus = document.querySelector("#form-status");
  const yearElement = document.querySelector("#current-year");

  // Hizmet kategorilerinin formda kullanılacak karşılıkları
  const categoryServices = {
    tasduvar: "Taş Duvar",
    tasev: "Taş Ev",
    duvarkaplama: "Duvar Kaplama",
    kayrak: "Kayrak Taşı",
    mermer: "Mermer Uygulamaları",
    andezit: "Andezit Uygulamaları",
    yuruyusyolu: "Yürüyüş Yolu",
    karo: "Karo ve Parke Uygulaması"
  };

  // Mobil menüyü kapat
  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menüyü aç");
  }

  // Mobil menüyü açıp kapat
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      document.body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menüyü kapat" : "Menüyü aç"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // URL üzerinden gelen hizmet bilgisini belirle
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("kategori");
  const serviceFromUrl = params.get("servis");

  // Örneğin hizmet.html?kategori=tasduvar
  if (
    serviceSelect &&
    selectedCategory &&
    categoryServices[selectedCategory]
  ) {
    serviceSelect.value = categoryServices[selectedCategory];
  }

  // Örneğin index.html?servis=Taş%20Duvar#iletisim
  if (serviceSelect && serviceFromUrl) {
    const matchingOption = Array.from(serviceSelect.options).find(
      (option) => option.value === serviceFromUrl
    );

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  }

  // data-service özelliği taşıyan bağlantı veya butonlardan hizmet seç
  document.querySelectorAll("[data-service]").forEach((element) => {
    element.addEventListener("click", () => {
      const selectedService = element.dataset.service;

      if (!serviceSelect || !selectedService) return;

      const matchingOption = Array.from(serviceSelect.options).find(
        (option) =>
          option.value === selectedService ||
          option.textContent.trim() === selectedService
      );

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      }
    });
  });

  // Teklif formunu WhatsApp mesajına dönüştür
  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Zorunlu alanların doldurulup doldurulmadığını kontrol et
      if (!quoteForm.reportValidity()) {
        return;
      }

      const name =
        document.querySelector("#name")?.value.trim() || "";

      const phone =
        document.querySelector("#phone")?.value.trim() || "";

      const service =
        serviceSelect?.value || "Belirtilmedi";

      const message =
        document.querySelector("#message")?.value.trim() ||
        "Ek açıklama yok";

      // WhatsApp numarasının doğru biçimde yazıldığını kontrol et
      if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
        if (formStatus) {
          formStatus.textContent =
            "WhatsApp numarası hatalı. Lütfen script.js dosyasındaki numarayı kontrol edin.";
        }
        return;
      }

      // Mesaj içeriğini oluştur
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

      // WhatsApp'ı yeni sekmede aç
      const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      if (formStatus) {
        if (whatsappWindow) {
          formStatus.textContent =
            "WhatsApp açılıyor. Mesajınızı kontrol edip WhatsApp üzerinden gönderin.";
        } else {
          formStatus.textContent =
            "WhatsApp otomatik açılamadı. Aşağıdaki bağlantıyı kullanın: https://wa.me/905300610369";
        }
      }
    });
  }

  // Güncel yılı otomatik göster
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
