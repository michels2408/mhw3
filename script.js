//creo la section che deve contenere i prodotti
const article = document.querySelector('article');
const block = document.createElement('section');
article.appendChild(block);
block.classList.add('product_grid');

let i = 0;

for(key in CONTENT_MAP){
    //aggiungo la classe info_pref, l'immagine del prodotto e il div con le sue classi properties e hidden 
    let title = CONTENT_MAP[key].title;
    let type = CONTENT_MAP[key].type;
    let img = CONTENT_MAP[key].img;
    let content = CONTENT_MAP[key].content;

    const p_block = document.querySelector('.product_grid');

    const container = document.createElement('div')
    p_block.appendChild(container);
    container.classList.add('container');
    container.dataset.productId = i++;

    const infopref = document.createElement('div');
    const product_img = document.createElement('img');
    const more_info = document.createElement('div');

    container.appendChild(infopref);
    container.appendChild(product_img);
    container.appendChild(more_info);

    infopref.classList.add('info_pref');
    product_img.classList.add('p_img');
    more_info.classList.add('properties');
    more_info.classList.add('hidden');

    //info_pref
    const info = document.createElement('div')
    const checkbox_img = document.createElement('img');

    infopref.appendChild(info);
    infopref.appendChild(checkbox_img);

    info.classList.add('info');
    checkbox_img.classList.add('checkbox');

    //info all'interno di info_pref
    const product_title = document.createElement('h1');
    const product_type = document.createElement('p');

    info.appendChild(product_title);
    info.appendChild(product_type);

    product_title.textContent = title;
    product_type.textContent = type;
    
    //checkbox all'interno di info_pref
    checkbox_img.src = 'images/empty_heart.jpg';

    //product_img
    product_img.src = img;

    //more_info
    const link = document.createElement('h1');
    const description = document.createElement('p');

    more_info.appendChild(link);
    more_info.appendChild(description);

    link.classList.add('learn_more');

    link.textContent = 'Scopri di più:';
    description.textContent = content;
}

//funzione che mostra le proprietà dei prodotti
function ShowContent(event) {
    const opened = event.currentTarget;
    
    opened.classList.remove('learn_more');
    opened.classList.add('learn_less');

    opened.parentNode.classList.remove('hidden');
    opened.parentNode.classList.add('open');

    const link = opened.parentNode.querySelector('h1');
    link.textContent = 'Scopri meno: ';

    opened.removeEventListener("click", ShowContent);
    opened.addEventListener("click", HideContent);
}

const to_open = document.querySelectorAll('.learn_more');
for (let key of to_open) {
    key.addEventListener("click", ShowContent);
}

//funzione che nasconde le proprietà dei prodotti
function HideContent(event) {
    const closed = event.currentTarget;

    closed.classList.remove('learn_less');
    closed.classList.add('learn_more');

    closed.parentNode.classList.remove('open');
    closed.parentNode.classList.add('hidden');

    const link1 = closed.parentNode.querySelector('h1');
    link1.textContent = 'Scopri di più: ';

    closed.removeEventListener("click", HideContent);
    closed.addEventListener("click", ShowContent);
}

//funzione dei preferiti
const fav_elements = {};
let m = 1;

function AddFav(event) {
    const fav_block = document.querySelector("#fav");
    fav_block.classList.remove('hidden');

    const clicked = event.currentTarget;
    const clicked2 = clicked.parentNode;
    const clicked3 = clicked2.parentNode;

    const fav_product = clicked3.dataset.productId;
    const all_products = document.querySelectorAll("div.container");

    for(let product of all_products){
        if (product.dataset.productId === fav_product){
            const fav_block = document.querySelector('#fav_grid');

            const favcontainer = document.createElement('div')
            fav_block.appendChild(favcontainer);
            favcontainer.classList.add('fav_container');
            favcontainer.dataset.productId = fav_product;

            const favinfopref = document.createElement('div');
            const favproduct_img = document.createElement('img');

            favcontainer.appendChild(favinfopref);
            favcontainer.appendChild(favproduct_img);

            favinfopref.classList.add('fav_info_pref');
            favproduct_img.classList.add('fav_img');

            //fav_info_pref
            const favinfo = document.createElement('div')
            const favcheckbox_img = document.createElement('img');

            favinfopref.appendChild(favinfo);
            favinfopref.appendChild(favcheckbox_img);

            favinfo.classList.add('fav_info');
            favcheckbox_img.classList.add('fav_checkbox');

            //fav_info all'interno di fav_info_pref
            const fav_title = document.createElement('h1');
            const fav_type = document.createElement('p');

            favinfo.appendChild(fav_title);
            favinfo.appendChild(fav_type);

            fav_title.textContent = product.querySelector('.info h1').textContent;
            fav_type.textContent = product.querySelector('.info p').textContent;
    
            //fav_checkbox all'interno di fav_info_pref
            favcheckbox_img.src = 'images/full_heart.jpg';

            //favproduct_img
            favproduct_img.src = product.querySelector('.p_img').src;

            fav_elements[m] = product.dataset.productId;
            m++;

            clicked.classList.remove('checkbox');
            favcheckbox_img.addEventListener("click", RemoveFav);
        }
    }
}

const fav = document.querySelectorAll('.checkbox');
for (let key of fav){
    key.addEventListener("click", AddFav);
}

//funzione non preferiti con funzione contatore
function objectLength(obj)
{
    let l = 0;
    for(let key in obj)
    {
        l++;
    }
    return l;
}

function RemoveFav(event) {
    const clicked4 = event.currentTarget;
    const clicked5 = clicked4.parentNode;
    const clicked6 = clicked5.parentNode;
    
    const unfav_product = clicked6.dataset.productId;
    
    clicked6.remove();
    m--;


    if(objectLength(fav_elements) == 1){
        const fav_title = document.querySelector('#fav');
        fav_title.classList.add('hidden');
    }
    
    clicked4.removeEventListener("click", RemoveFav);

    const all_products = document.querySelectorAll("div.container");

    for(let product of all_products){
        if (product.dataset.productId === unfav_product){
            const to_fav = product.querySelector('.info_pref img');
            to_fav.classList.add('checkbox');
        }
    }
}

//barra di ricerca
function FindProduct(event) {
    let searchbar = event.currentTarget;
    let search_input = searchbar.value.toUpperCase();
    let search_products = document.querySelectorAll('.container');

    for(i = 0; i < search_products.length; i++) {
        if(search_products[i].textContent.toUpperCase().indexOf(search_input) > -1) {
            search_products[i].style.display = "";
        } else {
            search_products[i].style.display = "none";
        }
    }
}

const input = document.querySelector('#search');
input.addEventListener('keyup', FindProduct);