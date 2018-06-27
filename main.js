const galleryItems = [
    {
      preview: "img/preview-1.jpeg",
      fullview: "img/fullview-1.jpeg",
      alt: "alt text 1"
    },
    {
      preview: "img/preview-2.jpeg",
      fullview: "img/fullview-2.jpeg",
      alt: "alt text 2"
    },
    {
      preview: "img/preview-3.jpeg",
      fullview: "img/fullview-3.jpeg",
      alt: "alt text 3"
    },
    {
      preview: "img/preview-4.jpeg",
      fullview: "img/fullview-4.jpeg",
      alt: "alt text 4"
    },
    {
      preview: "img/preview-5.jpeg",
      fullview: "img/fullview-5.jpeg",
      alt: "alt text 5"
    },
    {
      preview: "img/preview-6.jpeg",
      fullview: "img/fullview-6.jpeg",
      alt: "alt text 6"
    }
  ];
  
  class Gallery {
    constructor({ items, parentNode, defaultActiveItem }) {
      this.items = items;
      this.parentNode = parentNode;
      this.defaultActiveItem = defaultActiveItem;
      this.fullviewElement = document.createElement("img");
      this.creatItems = this.createGallery();
    }
  
    createGallery() {
      const fullview = document.createElement("div");
      fullview.classList.add("fullview");
      fullview.appendChild(this.fullviewElement);
      const preview = document.createElement("ul");
      preview.classList.add("preview");
      this.parentNode.append(fullview, preview);
      this.elementListener(preview);
    }
  
    elementListener(preview) {
      const myArray = [];
      this.items.forEach(elem => {
        const img = this.createLiImgEl(elem, preview);
        myArray.push(img);
        img.addEventListener("click", clickListener);
      });
  
      function clickListener(event) {
        const dataAtr = event.target.getAttribute("data-fullview");
        const altAtr = event.target.getAttribute("alt");
        const fullviewEl = document.querySelector(".fullview");
        fullviewEl.firstElementChild.setAttribute("src", dataAtr);
        fullviewEl.firstElementChild.setAttribute("alt", altAtr);
        toggle();
      }
  
      function toggle() {
        myArray.forEach(target => {
          if (target !== event.target) {
            target.classList.remove("active");
          } else {
            target.classList.add("active");
          }
        });
      }
    }
  
    createLiImgEl(elem, preview) {
      const liElement = document.createElement("li");
      preview.append(liElement);
      const imgElement = document.createElement("img");
      liElement.appendChild(imgElement).setAttribute("src", elem.preview);
      imgElement.setAttribute("data-fullview", elem.fullview);
      imgElement.setAttribute("alt", elem.alt);
      if (
        imgElement.getAttribute("alt") === `alt text ${this.defaultActiveItem}`
      ) {
        imgElement.classList.add("active");
        this.fullviewElement.setAttribute("src", elem.fullview);
        this.fullviewElement.setAttribute("alt", elem.alt);
      }
      return imgElement;
    }
  }
  
  const myGallery = new Gallery({
    items: galleryItems,
    parentNode: document.querySelector(".image-gallery"),
    defaultActiveItem: 1
  });