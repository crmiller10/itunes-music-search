/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play



// 1. First select and store the elements you'll be working with
//Global variables
let results = document.querySelector('.results');
let audio = document.querySelector('audio');
let searchButton= document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');
let preview = '';

// 2. Create your `submit` event for getting the user's search term
//Event listener to fetch iTunes data
searchButton.addEventListener('click', function() {
  let artist = searchBox.value;

  // 3. Create your `fetch` request that is called after a submission
  //Fetch the data from the iTunes API
  fetch('https://itunes.apple.com/search?term=' + artist + '&limit=24')
    .then(convertData)
    .then(printData);
});

// 4. Create a way to append the fetch results to your page
//convert the JSON data
function convertData(data){
  return data.json();
}

function printData(data){
  for( let i = 0; i < data.results.length; i++){
    const song = data.results[i];
    const resultsWrapper = document.createElement('article');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');

    img.src = song.artworkUrl100;
    h2.textContent = `${song.trackName}`;
    h3.textContent = `${song.artistName}`;
    resultsWrapper.setAttribute('data_src', `${song.previewUrl}`);

    results.appendChild(resultsWrapper);
    resultsWrapper.appendChild(img);
    resultsWrapper.appendChild(h2);
    resultsWrapper.appendChild(h3);
  };

  console.log(data); //View results:Array in console
}

// 5. Create a way to listen for a click that will play the song in the audio play
function findContainingDiv(e) {
  let original = e.target;
  while (original !== null) {
    if (original.tagName === 'ARTICLE') {
      return original;
    }
    original = original.parentElement;
  }
  return null;
}

results.addEventListener('click', function(e) {
  let div = findContainingDiv(e);
  if (div !== null) {
    let songPreview = div.getAttribute('data_src');
    audio.src = songPreview;
    let artistName = div.querySelector('h3').textContent;
    let songName = div.querySelector('h2').textContent;
    let nowPlaying = document.querySelector('.now-playing');
    nowPlaying.textContent = `Now playing: ${artistName} - ${songName}`;
  }
});

