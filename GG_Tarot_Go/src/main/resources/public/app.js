const API_URL = `http://localhost:8080`

function fetchCardsData() {
    fetch(`${API_URL}/api/cards`)
        .then((res) => {
            //console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showCardList(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Cards Data'
        })
}


function fetchCard(cardid) {
    fetch(`${API_URL}/api/cards/${cardid}`)
        .then((res) => {
            //console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showCardDetail(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Single Card Data'
        })
}

function parseCardId() {
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var cardid = url.searchParams.get("cardid");
        // var geo = url.searchParams.get("geo");
        // var size = url.searchParams.get("size");
        // console.log(name+ " and "+geo+ " and "+size);
        return cardid
      } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
        return "0"
      }
}
// takes a UNIX integer date, and produces a prettier human string
// function dateOf(date) {
//     const milliseconds = date * 1000 // 1575909015000
//     const dateObject = new Date(milliseconds)
//     const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
//     return humanDateFormat
// }

function showCardList(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('posts');
    const list = document.createDocumentFragment();

    data.map(function(post) {
        console.log("Card:", post);
        let li = document.createElement('li');
        let title = document.createElement('h3');
        // let body = document.createElement('p');

        title.innerHTML = `<a href="/carddetail.html?cardid=${post.id}">${post.name}</a>`;
        // body.innerHTML = `${post.description}`;


        li.appendChild(title);
        // li.appendChild(body);

        list.appendChild(li);
    });

    ul.appendChild(list);
}

function showCardDetail(post) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('post');
    const detail = document.createDocumentFragment();

    console.log("Card:", post);
    let li = document.createElement('div');
    let title = document.createElement('h2');
    let body = document.createElement('p');
    let image = document.createElement('img');
    title.innerHTML = `${post.name}`;
    body.innerHTML = `${post.description}`;
    image.src = `${post.imageURL}`;
    image.alt = `${post.name}`;
    // image.width = `200`;

    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(image);
    detail.appendChild(li);

    ul.appendChild(detail);
}

function handlePages() {
    let cardId = parseCardId()
    console.log("cardid: ",cardId)

    if (cardId != null) {
        console.log("found a cardid")
        fetchCard(cardId)
    } else {
        console.log("load all cards")
        fetchCardsData()
    }
}

handlePages()
