window.addEventListener('load', init);

//global variables
let backgroundURL = 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjE3Mjg4OTUx&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600'
// Variables for Divs
const cardsContainer = document.querySelector("#cards")
let getSeries;
let mainDiv;
let descriptionDiv;
let genreDiv;
let quoteDiv;

//Array of Favorite Animes
let favoriteAnimes = []

// To Add and Remove class from Favorite Button
let cardsclass = document.getElementsByClassName("card")
let temp = document.getElementsByClassName("button favorite")

//Anime search name and number
let animenumber;
let animename;

//URL for fetch all Animes
const webserviceURL = './webservice/index.php';
let detailsUrl;

//URL for fetching Quotes by Anime Name
let quoteURL = 'https://animechan.vercel.app/api/quotes/anime?title='
let allQuotes;

// starting function
function init(){
    //Check if LocalStorage is available in the browser
    if (typeof window.localStorage === "undefined") {
        console.error('Local storage is not available in your browser');
        return;
    }

    //Fetch all Animes
    getAnime();

    //Get the Background
    document.body.style.backgroundImage = `url(${backgroundURL})`;
}

//Fetch the Anime by the WebserviceURL
function getAnime()
{
    fetch(webserviceURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(getAnimeSuccessHandler)
        .catch(getAnimeErrorHandler);
}

function getAnimeSuccessHandler(data){
    //fetched series to object
    getSeries = data;
    //fill the cards with the series
    addCards();

    // event Listener only works vor first
    mainDiv = document.getElementById("main")
    mainDiv.addEventListener("click", detailsDiv);
    mainDiv.addEventListener("click", favoriteButton);

    // Get Stored Favorites
    let storedString = localStorage.getItem('favorites');

    //If there is an item in the LocalStorage add Class and edit innerHTML
    if(storedString) {
        let storedData = JSON.parse(storedString);
        favoriteAnimes = storedData
        for (let i = 0; i < storedData.length; i++){
            // Find the index number of Anime in the Anime object
            let index = getSeries.findIndex(item => item.name === storedData[i]);

            // Get the Div of the Animes in localstorage by using the index
            let favoriteClass = document.getElementById("cards").getElementsByClassName("card")[index]

            // Add the Class of favoriteAnime and Changing the value of the button to different text
            favoriteClass.classList.add("favoriteAnime");
            temp[index].innerHTML = 'Delete from Favorite';
        }
    }

}

function addCards() {
    //Call the function addCard to create the cards
    for (let i = 0; i < getSeries.length; i++){
        addCard(getSeries[i], i)
    }
}

function getAnimeErrorHandler(data){
    //Log the error when Anime can't be fetched
    console.log(data);
}

//function to create cards
function addCard(serie, index){
    //Making the div and adding it to the CardsContainer
    const cardDive = document.createElement("div");
    //Add card to the class list
    cardDive.classList.add("card");
    //Add a dataset with value from the FOR Loop
    cardDive.dataset.index = index;
    //Append cardDive to the cardsDiv
    cardsContainer.appendChild(cardDive);

    //Get the image and putting it in the CardDive
    const img = document.createElement("img");
    // Get the image source
    img.src = serie.image
    //Append image to the cardsDiv
    cardDive.appendChild(img);

    // Adding the title of the Anime to the CardDive
    const nameDiv = document.createElement("div");
    // nameDiv.innerHTML = serie.name.substring(0,20);  // Title is only 20 characters
    nameDiv.innerText = serie.name                      // Title is fully displayed
    //Append nameDiv to the cardsDiv
    cardDive.appendChild(nameDiv)

    // Creating the Detail Button for each Anime
    const detailButton = document.createElement("button");
    //Add button and details to the class list
    detailButton.classList.add("button");
    detailButton.classList.add("details");
    //Add a dataset with value from the FOR Loop +1 to get the right anime for my array
    detailButton.dataset.index = index +1;
    //Add an inner value to the button
    detailButton.innerHTML = "Show Details";
    //Append button to the cardsDiv
    cardDive.appendChild(detailButton);

    // Creating the Favorite Button for each Anime
    const favoriteButton = document.createElement("button");
    //Add button and favorite to the class list
    favoriteButton.classList.add("button");
    favoriteButton.classList.add("favorite");
    //Add a dataset with value from the FOR Loop
    favoriteButton.dataset.index = index;
    //Add an inner value to the button
    favoriteButton.innerHTML = "Add to Favorite";
    //Append button to the cardsDiv
    cardDive.appendChild(favoriteButton);

}

function favoriteButton(e) {
    // Checking of the Click is from the button Favorite
    if (e.target.className == "button favorite") {
        // get name of Anime by id
        let animeName = getSeries[e.target.dataset.index].name
        //Search by ID for cardsDiv
        const cardDive = document.getElementById("cards");
        //Get the right cardDiv
        let cardclass = cardsclass[e.target.dataset.index]
        let changeValue = temp[e.target.dataset.index];

        console.log(changeValue)
        //Delete from Favorites
        if (favoriteAnimes.includes(animeName)) {
            //Search for anime index by name
            let indexofAnime = favoriteAnimes.indexOf(animeName);
            //Delete anime from array by index
            let deleteAnime = favoriteAnimes.splice(indexofAnime, 1);
            //Resubmit the localstorage as string without the anime just deleted
            localStorage.setItem('favorites', JSON.stringify(favoriteAnimes));
            //Remove the Class from the Anime
            cardclass.classList.remove("favoriteAnime");
            //Change value of button
            changeValue.innerHTML = 'Add to Favorite';
            console.log("Deleted to Favorite")
        } else {
            //Add to Favorites Array
            favoriteAnimes.push(animeName);
            //Resubmit the localstorage as string with the anime just added
            localStorage.setItem('favorites', JSON.stringify(favoriteAnimes))
            //Add the Class for the Anime
            cardclass.classList.add("favoriteAnime");
            //Change value of button
            changeValue.innerHTML = 'Delete from Favorite';
            console.log("Added to Favorite")
        }
    }
}

function detailsDiv(e) {
    // Checking of the Click is from the button Details
    if (e.target.className == "button details"){
        //Make a temp number to search the array
        animenumber = e.target.dataset.index
        console.log("details is Clicked!!")
        //Add the ID of the anime to the url
        detailsUrl = webserviceURL + "?id=" + animenumber;

        //Get the anime name -1 to correct because it was 1 of
        animename = getSeries[animenumber - 1].name
        //get the quote by adding the Anime Name to the URL
        quoteURL = quoteURL + animename

        //Calling the function to get the Quote and to add the Details
        fetchQuote();
        getAnimeDetails();

        //Reset the URL link so it can be used again
        quoteURL = 'https://animechan.vercel.app/api/quotes/anime?title='
    }
}


function getAnimeDetails()
{
    fetch(detailsUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(inputAnimeDetails)
        .catch(getAnimeErrorHandler);
}


function inputAnimeDetails(data){
    // Finding the description paragraph
    descriptionDiv = document.getElementById("description")
    // Adding description to the paragraph
    descriptionDiv.innerText = data.description
    // Finding the genre paragraph
    genreDiv = document.getElementById("genre")
    // Adding genre to the paragraph
    genreDiv.innerText = data.genre
}

//Fetch the Quote of the Anime by the quoteURL
function fetchQuote(){
    fetch(quoteURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(quotesSuccesHandler)
        .catch(getQuoteErrorHandler);

}

function quotesSuccesHandler(data){
    //Push All Quotes into 1 array
    allQuotes = data
    //Get one random Quote from the array
    let randomQuotes = shuffleArray(allQuotes)
    // Finding the Quote paragraph
    quoteDiv = document.getElementById("quote")
    // Adding the first Quote from the array to the paragraph
    quoteDiv.innerHTML = randomQuotes[1].quote +`\nand ~ ${randomQuotes[1].character}`

}

function getQuoteErrorHandler(){
    console.log("Something went wrong")
}

//Shuffle function for an array to get random order of an array
function shuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}