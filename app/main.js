window.addEventListener("load", () => {
    cargaGaleria();
    cargaGaleriaMenu();
    initIsotope();
    galeriaMenu();
    filtroEventos();
    cargaSlider();
    initSlider();
    initVentana();
});

let iso = null;
let isOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    let targets = document.getElementById('caja');
    let cajaStyle = caja.style;
    let button = document.getElementById('button');
    button.addEventListener('click', () => {
      if (isOpen) {
        anime({
          targets,
          height: 0,
          opacity: [1, 0],
          duration: 500,
          easing: 'easeOutQuad',
          complete() {
            isOpen = false;
            cajaStyle.display = '';
          }
        });
      } else {
        isOpen = true;
        cajaStyle.display = 'block';
        cajaStyle.height = '0px';
        anime({
          targets,
          height: el => el.scrollHeight,
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutCubic'
        });
      }
    }, false);
  }, false);

const cargaGaleria = () => {
    const gridList = document.querySelector(".grid_list");
    let htmlString = "";
    if (gridList) {
        data.forEach(item => {
            htmlString += `
            <div class="grid_content grid_content_${item.index} ${createCategories(item.categories)}" data-index="${item.index}" data-categories="${item.categories}">
                <div class="grid_items">
                    <div class="grid_item">
                        <img src="${item.picture}" style="height: 225px">
                            <div class="grid_item_content">
                                <img class="user" src="${item.author}" alt="work">
                                <div class="title">${shortenTitle(item.title)}</div>
                                <div class="like_button">
                                   <i><img style="height:15px; width:15px;" src="/assets/img/heart.png" alt="">&nbsp${item.likes}</i>
                                </div>
                                <div class="views_button">
                                    <i><img style="height:15px; width:15px;" src="/assets/img/estrella.svg" alt="">&nbsp${item.views}</i>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            `;
        });

        gridList.innerHTML = htmlString;
    }
};

const cargaGaleriaMenu = () => {
    const filters = document.querySelector('.filtros');
    let htmlString = "";
    const categories = getSingleCategories();
    categories.unshift("all");

    categories.forEach(category => {
        htmlString += `
        <div class="filtro_item ${category == "all" ? "active" : ""}" data-category="${category}">${category}</div>
        `;
    });

    filters.innerHTML = htmlString;
};

const galeriaMenu = () => {
    const filters = document.querySelectorAll(".filtros .filtro_item");
    const gridContents = document.querySelectorAll(".grid_content");
    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            const category = filter.dataset.category;

            if (category == "all") {
                iso.arrange({ filter: "*" })
            } else {
                iso.arrange({ filter: "." + category })
            }

            filters.forEach(filter_ => {
                filter_.classList.remove("active");
            });
            filter.classList.add("active")
        });
    });
};

const initIsotope = () => {
    const elem = document.querySelector('.grid_list');
    iso = new Isotope(elem, {
        percentPosition: true,
        layoutMode: 'masonry'
    });
};

const shortenTitle = (title) => {
    const titleArr = title.split(" ").slice(0, 2).join(" ") + "...";
    return titleArr;
};

const createCategories = (categories) => {
    return categories.join(" ");
};

const getSingleCategories = () => {
    const categories = data.map(dataItem => dataItem.categories);
    const uniqueCategories = [];

    categories.forEach(categoryArr => {
        categoryArr.forEach(category => {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category);
            }
        });
    });

    uniqueCategories.sort();
    return uniqueCategories;
};



const filtroEventos = () => {
    const input = document.querySelector(".filtro_group input");
    const gridContents = document.querySelectorAll(".grid_content");

    input.addEventListener("change", () => {
        const value = input.value;

        gridContents.forEach(gridContent => {
            const title = gridContent.querySelector(".title");

            if (title.innerHTML.includes(value)) {
                gridContent.classList.remove("hidden");
            } else {
                gridContent.classList.add("hidden");
            }
        });

    });
};

const initVentana = () => {
    const extToggle = document.querySelector(".ext_toggle");
    const extNavi = document.querySelector(".ext_navi");
    const header = document.querySelector('.header');

    window.addEventListener("load", () => {
        extNavi.classList.remove("opened");
    });

    extToggle.addEventListener("click", () => {
        extNavi.classList.toggle("opened");
    });

    window.addEventListener("scroll", () => {
        extNavi.classList.remove("opened");
    });

    window.addEventListener("click", (ev) => {
        if (!ev.path.includes(extToggle) && !ev.path.includes(extNavi)) {
            extNavi.classList.remove("opened");
        }
    });

};

const cargaSlider = () => {
    const swiperContainer = document.querySelector(".swiper-wrapper");
    let htmlString = "";
    if (swiperContainer) {
        dataSlider.forEach(item => {
            htmlString += `
            <div class="swiper-slide">
                <div class="slider">
                    <div class="slider_holder">
                        <div class="slider_content">
                            <h1>${item.h1}</h1>
                            <h2>${item.h2}</h2>
                            <div class="slider_cta">
                                <button>Sign up</button>
                            </div>
                        </div>
                        <div class="slider_picture">
                            <img src="${item.picture}">
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        swiperContainer.innerHTML = htmlString;
    }
};

const initSlider = () => {
    const swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
};

const button = document.querySelector('#boton');
const tooltip = document.querySelector('#tooltip');

const popperInstance = Popper.createPopper(boton, tooltip, {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        },
    ],
});

function show() {
    tooltip.setAttribute('data-show', '');
    popperInstance.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: true }],
    });
    popperInstance.update();
}

function hide() {
    tooltip.removeAttribute('data-show');
    popperInstance.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: false }],
    });
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach(event => {
    button.addEventListener(event, show);
});

hideEvents.forEach(event => {
    button.addEventListener(event, hide);
});

