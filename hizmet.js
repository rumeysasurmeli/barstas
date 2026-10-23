
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const categories = {
    tasduvar: {
      title: "Taş Duvar",
      cover: "images/tasduvar/tasduvarkapak.jpg",
      description: "Doğal taşın dokusunu özenli işçilikle bir araya getiren taş duvar uygulamalarımız.",
      photos: [
        "images/tasduvar/IMG_2798.jpg",
        "images/tasduvar/IMG_2799.jpg",
        "images/tasduvar/IMG_2923.jpg",
        "images/tasduvar/IMG_2925.jpg",
        "images/tasduvar/IMG_2926.jpg",
        "images/tasduvar/IMG_2927.jpg",
        "images/tasduvar/IMG_5067.jpg"
      ]
    },
    tasev: {
      title: "Taş Ev",
      cover: "images/tasev/tasevkapak.jpg",
      description: "Taşın doğal görünümünü ve sağlamlığını öne çıkaran taş ev uygulamalarımız.",
      photos: [
        "images/tasev/IMG_3173.jpg",
        "images/tasev/IMG_3174.jpg",
        "images/tasev/IMG_3176.jpg",
        "images/tasev/IMG_6582.jpg",
        "images/tasev/IMG_6583.jpg",
        "images/tasev/IMG_8220.jpg"
      ]
    },
    duvarkaplama: {
      title: "Duvar Kaplama",
      cover: "images/duvarkaplama/duvarkapak.jpg",
      description: "Farklı mekânlara karakter kazandıran doğal taş duvar kaplama çalışmaları.",
      photos: [
        "images/duvarkaplama/duvarkaplama.JPEG",
        "images/duvarkaplama/duvarkaplama1.JPEG",
        "images/duvarkaplama/duvarkaplama2.JPEG",
        "images/duvarkaplama/duvarkaplama3.JPEG",
        "images/duvarkaplama/duvarkaplama6.JPEG",
        "images/duvarkaplama/kaplama.JPEG"
      ]
    },
    kayrak: {
      title: "Kayrak Taşı",
      cover: "images/kayrak/kayrakkapak.JPG",
      description: "Doğal dokusu ve kendine özgü görünümüyle kayrak taşı uygulamalarımız.",
      photos: [
        "images/kayrak/kayrak.JPEG",
        "images/kayrak/kayrak1.JPEG",
        "images/kayrak/kayrak2.JPEG",
        "images/kayrak/kayrak9.JPEG",
        "images/kayrak/kayraktasi_uygulama.JPEG",
        "images/kayrak/kayraktasi_uygulama1.JPEG",
        "images/kayrak/kayraktasi_uygulama2.JPEG",
        "images/kayrak/kayraktasi_uygulama3.JPEG",
        "images/kayrak/kayraktasi_uygulama4.JPEG",
        "images/kayrak/merdiven.JPEG"
      ]
    },
    mermer: {
      title: "Mermer Uygulamaları",
      cover: "images/mermer/mermerkapak.jpg",
      description: "Mermer basamaklar ve farklı yüzeyler için titiz ölçülendirme ve uygulama.",
      photos: [
        "images/mermer/mermer.JPEG",
        "images/mermer/mermer1.JPEG",
        "images/mermer/mermer2.JPEG",
        "images/mermer/mermer3.JPEG",
        "images/mermer/mermer4.JPEG",
        "images/mermer/mermer5.JPEG",
        "images/mermer/mermer6.JPEG",
        "images/mermer/mermer7.JPEG",
        "images/mermer/mermer8.JPEG",
        "images/mermer/mermer9.JPEG",
        "images/mermer/mermer10.JPEG",
        "images/mermer/mermer11.JPEG",
        "images/mermer/mermeruygulamalri.JPEG"
      ]
    },
    andezit: {
      title: "Andezit Uygulamaları",
      cover: "images/andezit/andezitkapak.JPG",
      description: "Dış mekânlara uygun andezit taşı ve zemin uygulamalarımız.",
      photos: [
        "images/andezit/andezit.JPEG",
        "images/andezit/andezit1.JPEG",
        "images/andezit/andezit2.JPEG",
        "images/andezit/andezitveyuruyus.JPEG",
        "images/andezit/andezityuruyusyolu.JPEG",
        "images/andezit/IMG_3602.jpg",
        "images/andezit/IMG_3603.jpg"
      ]
    },
    yuruyusyolu: {
      title: "Yürüyüş Yolu",
      cover: "images/yuruyusyolu/yuruyusyolukapak.JPG",
      description: "Bahçe ve açık alanlar için kullanışlı, estetik taş yürüyüş yolları.",
      photos: [
        "images/yuruyusyolu/yuruyusyolu.JPEG",
        "images/yuruyusyolu/yuruyusyolu1.JPEG",
        "images/yuruyusyolu/yuruyusyolu2.JPEG",
        "images/yuruyusyolu/yuruyusyolu6.JPEG",
        "images/yuruyusyolu/yuruyusyolukayrak1.JPEG",
        "images/yuruyusyolu/yuruyusyolukayrak2.JPEG",
        "images/yuruyusyolu/IMG_3964.jpg",
        "images/yuruyusyolu/IMG_3965.jpg",
        "images/yuruyusyolu/IMG_7764.jpg"
      ]
    },
    karo: {
      title: "Karo ve Parke Uygulaması",
      cover: "images/karo/karokapak.jpg",
      description: "Açık ve kapalı alanlar için düzenli, dayanıklı karo ve parke zemin uygulamaları.",
      photos: [
        "images/karo/IMG_4858.jpg",
        "images/karo/IMG_5497.JPG",
        "images/karo/IMG_5991.jpg"
      ]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const categoryKey = params.get("kategori") || "tasduvar";
  const category = categories[categoryKey] || categories.tasduvar;

  const title = document.querySelector("#category-title");
  const subtitle = document.querySelector("#category-subtitle");
  const breadcrumb = document.querySelector("#breadcrumb-title");
  const description = document.querySelector("#category-description");
  const heading = document.querySelector("#gallery-heading");
  const cover = document.querySelector("#category-cover");
  const gallery = document.querySelector("#category-gallery");
  const quoteLink = document.querySelector("#category-quote");
  const whatsappLink = document.querySelector("#detail-whatsapp");

  if (title) title.textContent = category.title;
  if (subtitle) subtitle.textContent = category.description;
  if (breadcrumb) breadcrumb.textContent = category.title;
  if (description) description.textContent = category.description;
  if (heading) heading.textContent = category.title + " Çalışmaları";

  if (cover) {
    cover.src = category.cover;
    cover.alt = category.title + " uygulaması";
    cover.onerror = () => {
      cover.onerror = null;
      cover.src = "images/duvarkaplama/baslangickapak.png";
    };
  }

  if (quoteLink) {
    quoteLink.href =
      "index.html?servis=" +
      encodeURIComponent(category.title) +
      "#iletisim";
  }

  if (whatsappLink) {
    const message =
      "Merhaba BarsTaş Yapı, " +
      category.title +
      " hizmetiniz için bilgi ve teklif almak istiyorum.";
    whatsappLink.href =
      "https://wa.me/905300610369?text=" +
      encodeURIComponent(message);
  }

  if (gallery) {
    gallery.replaceChildren();

    const photos = [category.cover, ...category.photos].filter(
      (path, index, all) => all.indexOf(path) === index
    );

    photos.forEach((path, index) => {
      const figure = document.createElement("figure");
      figure.className = "gallery-item";

      const img = document.createElement("img");
      img.src = path;
      img.alt = category.title + " uygulama fotoğrafı " + (index + 1);
      img.loading = index < 3 ? "eager" : "lazy";

      img.onerror = () => {
        figure.remove();
      };

      const caption = document.createElement("figcaption");
      caption.className = "gallery-caption";
      caption.textContent =
        index === 0
          ? category.title + " — kapak fotoğrafı"
          : category.title + " uygulaması";

      figure.append(img, caption);
      gallery.appendChild(figure);
    });
  }
});
