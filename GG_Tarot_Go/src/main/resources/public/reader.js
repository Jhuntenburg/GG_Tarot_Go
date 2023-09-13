const API_URL = `http://localhost:8080`
// const API_URL = `http://192.168.3.39:8080`

function generateRandomNumber() {
  return Math.floor(Math.random() * 78) + 1;

}
function fetchCard(cardid, cardIdNumber) {
  console.log(`fetching ${cardid}`);
  fetch(`${API_URL}/api/cards/${cardid}`)
    .then((res) => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then((data) => {
      showCardDetail(data, cardIdNumber)
    })
    .catch((error) => {
      console.log(`Error Fetching data : ${error}`)
      document.getElementById(cardIdNumber).innerHTML = 'Error Loading Single Card Data'
    })
}

function showCardDetail(post, cardIdNumber) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.
  const ul = document.getElementById(cardIdNumber);
  const detail = document.createDocumentFragment();

  console.log("Card:", post);
  let li = document.createElement('div');
  let title = document.createElement('h2');
  let body = document.createElement('p');
  let imageDivTag = document.createElement('div');
  let image = document.createElement('img');
  title.innerHTML = `${post.name}`;
  body.innerHTML = `${post.description}`;
  image.src = `${post.imageURL}`;
  image.alt = `${post.name}`;
  imageDivTag.style.textAlign='center';
  // image.width = `200`;

  imageDivTag.appendChild(image);
  li.appendChild(title);
  li.appendChild(body);
  li.appendChild(imageDivTag);
  detail.appendChild(li);

  ul.appendChild(detail);
}




function handlePages() {
  const cardOne = generateRandomNumber();
  let cardTwo = generateRandomNumber();
  if (cardOne === cardTwo){
    cardTwo = generateRandomNumber()
  }
  let cardThree = generateRandomNumber();
  if ( cardThree === cardTwo || cardThree === cardOne){
    cardThree = generateRandomNumber();
  }
  // testing to see if the numbers generate correctly
  let one = document.getElementById('one');
  let two = document.getElementById('two');
  let three = document.getElementById('three');
  // let body = document.createElement('p');

  // one.innerHTML = cardOne;
  // two.innerHTML = cardTwo;
  // three.innerHTML = cardThree;

  fetchCard(cardOne, "past");
  fetchCard(cardTwo, "present");
  fetchCard(cardThree, "future");



}

handlePages()
