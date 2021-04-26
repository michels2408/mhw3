let i = 0;

for(key in SERVICE_MAP){
    let title = SERVICE_MAP[key].title;
    let image = SERVICE_MAP[key].image;
    let servizio1 = SERVICE_MAP[key].servizio1;
    let servizio2 = SERVICE_MAP[key].servizio2;
    let servizio3 = SERVICE_MAP[key].servizio3;

    const article = document.querySelector('article');

    const d_block = document.createElement('div');
    article.appendChild(d_block);
    d_block.classList.add('department');
    d_block.dataset.departmendId = i++;

    const d_name = document.createElement('h1');
    const s_block = document.createElement('div');

    d_block.appendChild(d_name);
    d_block.appendChild(s_block);

    s_block.classList.add('services');

    //titolo
    d_name.textContent = title;

    //blocco servizi
    const block_image = document.createElement('img');
    const list = document.createElement('div');

    s_block.appendChild(block_image);
    s_block.appendChild(list);

    block_image.classList.add('block_image');
    list.classList.add('list');

    //immagine dentro il blocco servizi
    block_image.src = image;

    //listino dentro blocco servizi
    const s_1 = document.createElement('p');
    const s_2 = document.createElement('p');
    const s_3 = document.createElement('p');

    list.appendChild(s_1);
    list.appendChild(s_2);
    list.appendChild(s_3);

    s_1.textContent = servizio1;
    s_2.textContent = servizio2;
    s_3.textContent = servizio3;
}

//keys, token e endpoint OAUTH
const key_img = 'HR9Lrg3RvhXsy8yf2ejE_JPdMXsmq7YRXKYxnfydyN4'
const secret_img = 'bb6bmU1BtpapFxU5Dr9HUGKJKV-SlrD-39Vwqnug6R0'
const img_oauth_endpoint = 'https://api.unsplash.com/search/photos'
const img_oauth_endpoint_token = 'https://unsplash.com/oauth/token'

//funzione con API Oauth
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function getToken(json)
{
	token = json;
	console.log(json);
}

function onTokenResponse(response) {
  return response.json();
}

let token;
fetch(img_oauth_endpoint_token,
    {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key_img + '&client_secret=' + secret_img,
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
).then(onTokenResponse).then(getToken);

function search(event) {
    event.preventDefault();
    
    const type = document.querySelector('#select').value;
    
    if(type === "pixie") {
        fetch(img_oauth_endpoint + '?query=short+hair&per_page=2&client_id=' + key_img, 
			{
				headers: {
					'Authorization': token.token_type + ' ' + token.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(onResponse).then(onJson_img);
    } else if(type === "bob") {
        fetch(img_oauth_endpoint + '?query=medium+hair+woman&per_page=3&orientation=portrait&client_id=' + key_img, 
        {
            headers: {
                'Authorization': token.token_type + ' ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(onResponse).then(onJson_img);

    } else if(type === "long") {
        fetch(img_oauth_endpoint + '?query=long+hair&per_page=3&orientation=portrait&client_id=' + key_img, 
        {
            headers: {
                'Authorization': token.token_type + ' ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(onResponse).then(onJson_img);

    } else if(type === "bangs"){
        fetch(img_oauth_endpoint + '?query=bangs+girl&per_page=3&orientation=portrait&client_id=' + key_img, 
        {
            headers: {
                'Authorization': token.token_type + ' ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(onResponse).then(onJson_img);
    }
}

function onJson_img(json) {
    console.log('JSON Img ricevuto');

    console.log(json);

    const gallery = document.querySelector('#gallery');
    gallery.innerHTML = '';

    const results = json.results;
    for(result of results) {
        console.log(result+' questo e un result');
    }

    if(results.length == 0) {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      board.appendChild(errore);
    }

    for(result of results) {
        const image = document.createElement('img');
        gallery.appendChild(image);
        image.classList.add('image');

        image.src = result.urls.full;

        image.addEventListener('click', OpenModal);
    }
}

function OpenModal(event) {
    const modal = document.querySelector('#modal');
    modal.classList.remove('hidden');

    const image = document.createElement('img');
    modal.appendChild(image);
    image.id = 'view_image';

	image.src = event.currentTarget.src;

    document.body.classList.add('no-scroll');
}

function CloseModal(event) {
    const modal = event.currentTarget;
    modal.classList.add('hidden');

    modal.innerHTML = '';

    document.body.classList.remove('no-scroll');
}

const modal = document.querySelector('#modal');
modal.addEventListener('click', CloseModal);

const send_button = document.querySelector('#send');
send_button.addEventListener('click', search);

