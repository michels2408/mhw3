const key_news = '4b6c56e5af81e62b6d1f20722e507600'
const news_api_endpoint = 'http://api.mediastack.com/v1/news'

//funzioni fetch
function onJson_news(json) {
    console.log('JSON Img ricevuto');

    console.log(json);

    const board = document.querySelector('#board');
    board.innerHTML = '';

    const results = json.data;
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
        const board = document.querySelector('#board');
        
        const news_block = document.createElement('div');
        board.appendChild(news_block);
        news_block.classList.add('news_block')

        const title = document.createElement('h1');
        const author = document.createElement('p');
        const article = document.createElement('p');
        const button = document.createElement('a');

        news_block.appendChild(title);
        news_block.appendChild(author);
        news_block.appendChild(article);
        news_block.appendChild(button);

        button.classList.add('view');

        title.textContent = result.title;
        author.textContent = result.author;
        article.textContent = result.description;
        button.href = result.url;
        button.textContent = "Continua a leggere";
    }
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

//funzione cerca generale che rimanda alle fetchs
function search(event) {
    event.preventDefault();

    const type = document.querySelector('#select').value;

    if(type === "hair_removal") {
        news_request1 = news_api_endpoint + '?access_key=' + key_news + '&languages=it&keywords=depilazione -calciatori&limit=5';
        console.log('URL: ' +news_request1);
        fetch(news_request1).then(onResponse).then(onJson_news);
    } else if(type === "face_mask") {
        news_request2 = news_api_endpoint + '?access_key=' + key_news + '&languages=it&keywords=maschera+viso&limit=5';
        console.log('URL: ' +news_request2);
        fetch(news_request2).then(onResponse).then(onJson_news);
    } else if(type === "face_cleaning") {
        news_request3 = news_api_endpoint + '?access_key=' + key_news + '&languages=it&keywords=pulizia+del+viso+skincare&limit=5';
        console.log('URL: ' +news_request3);
        fetch(news_request3).then(onResponse).then(onJson_news);
    } else {
        const board = document.querySelector('#board');
        board.innerHTML = '';
	}
}

const send_button = document.querySelector('#send');
send_button.addEventListener('click', search);