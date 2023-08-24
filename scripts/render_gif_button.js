chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'url_changed_complete') {
        if (request.status === "complete") {
          setTimeout(setGIFButton, 500)
          setTimeout(buttonListenerCallback, 1000)
          setTimeout(submitGIF, 1500)
        }
    }
});

function setGIFButton() {
  if (document.getElementsByClassName('thesis__gif').length === 0) {
    if (document.getElementsByClassName('thesis__attaches')[0] === undefined) {
      console.log('Attaches Node not fount');
    }
    else {
      console.log('Attaches Node found ... button added')
      var commentsNode = document.getElementsByClassName('thesis__attaches')[0]
      // Create DOM element
      const gifButton = document.createElement("div");
      gifButton.innerHTML = ('<svg xmlns:xlink="http://www.w3.org/1999/xlink" class="icon icon--v_gif" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><defs><symbol fill="none" viewBox="0 0 20 20" id="v_gif"><path fill-rule="evenodd" clip-rule="evenodd" d="M.833 6.667a3.332 3.332 0 013.333-3.334c.838 0 1.604.222 2.208.726.604.503.961 1.217 1.112 2.04a.833.833 0 11-1.64.301c-.097-.534-.3-.862-.539-1.06C5.07 5.14 4.71 5 4.167 5 3.244 5 2.5 5.744 2.5 6.667V12.5c0 .818.773 1.667 1.666 1.667.528 0 .936-.159 1.204-.405.256-.236.463-.626.463-1.262v-1.667H5a.833.833 0 010-1.666h1.666c.46 0 .834.373.834.833v2.5c0 1.03-.353 1.89-1.001 2.488-.638.587-1.48.845-2.333.845-1.868 0-3.333-1.651-3.333-3.333V6.667zM10 3.333c.46 0 .833.373.833.834V15a.833.833 0 11-1.667 0V4.167c0-.46.373-.834.834-.834zm2.5.834c0-.46.373-.834.833-.834h5a.833.833 0 010 1.667h-4.167v3.333h2.5a.833.833 0 010 1.667h-2.5v5a.833.833 0 11-1.666 0V4.167z" fill="currentColor"></path></symbol></defs><g fill="#6F77C3"><path fill-rule="evenodd" clip-rule="evenodd" d="M.833 6.667a3.332 3.332 0 013.333-3.334c.838 0 1.604.222 2.208.726.604.503.961 1.217 1.112 2.04a.833.833 0 11-1.64.301c-.097-.534-.3-.862-.539-1.06C5.07 5.14 4.71 5 4.167 5 3.244 5 2.5 5.744 2.5 6.667V12.5c0 .818.773 1.667 1.666 1.667.528 0 .936-.159 1.204-.405.256-.236.463-.626.463-1.262v-1.667H5a.833.833 0 010-1.666h1.666c.46 0 .834.373.834.833v2.5c0 1.03-.353 1.89-1.001 2.488-.638.587-1.48.845-2.333.845-1.868 0-3.333-1.651-3.333-3.333V6.667zM10 3.333c.46 0 .833.373.833.834V15a.833.833 0 11-1.667 0V4.167c0-.46.373-.834.834-.834zm2.5.834c0-.46.373-.834.833-.834h5a.833.833 0 010 1.667h-4.167v3.333h2.5a.833.833 0 010 1.667h-2.5v5a.833.833 0 11-1.666 0V4.167z" fill="currentColor"></path></g></svg>');
      gifButton.classList.add("thesis__gif");
      //Add element to DOM
      commentsNode.appendChild(gifButton);
      setGIFForm()
    }
    }
    else {
      buttonListenerCallback()
      console.log('Element already exist!')
    }
}

function buttonListenerCallback() {
  if (document.getElementsByClassName("thesis__gif")[0]) {
    var gifButton = document.getElementsByClassName("thesis__gif")[0]
    gifButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('click on gifbutton')
      visibleProperty();
    });
  }
}

function submitGIF() {
  if (document.querySelector("#gif-form")) {
    const gifForm = document.querySelector("#gif-form");
    gifForm.addEventListener("submit", fetchGiphs);
  }
}

function setGIFForm() {
  var commentsNode = document.getElementsByClassName('comment-form__editor')[0]
  // Create DOM element
  const gifForm = document.createElement("div");
  // gifForm.innerHTML = ('<form id="gif-form"><input type="text" class="gif_search" placeholder="Какую гифку ищем?"><input type="submit" class="gif_submit" value="Поиск"></form><div class="results"></div>')
  gifForm.innerHTML = ('<form id="gif-form"><input type="text" class="gif_search" placeholder="Какую гифку ищем?"><button type="submit" class="gif_submit"></button></form><div class="results"></div>')
  gifForm.classList.add("gif__form");
  //Add element to DOM
  commentsNode.appendChild(gifForm);
}

function visibleProperty() {
  var formNode = document.getElementsByClassName('gif__form')[0]
  if (formNode.style.visibility =='visible' && formNode.style.display == 'flex') {
    formNode.style.visibility = 'hidden';
    formNode.style.display = 'none';
    cleanResultAll()
  }
  else {
    formNode.style.visibility = 'visible';
    formNode.style.display = 'flex';
  }
}

function fetchGiphs(e) {
    e.preventDefault();
    cleanResultAfterSubmin();
    const searchTerm = document.querySelector(".gif_search").value;
    let lmt = 20
    let apikey = 'AIzaSyC0Yoa_3gzo0QDqmMDmq1PXw4gHU9us0ao'
    let clientkey = 'TenorDTF'
    let lang = 'ru'
    let search_url = "https://tenor.googleapis.com/v2/search?q=" + searchTerm + "&key=" +
            apikey +"&client_key=" + clientkey +  "&limit=" + lmt + "&locale=" + lang;
    fetch(search_url)
    .then((response) => {return response.json(); })
    .then((resp => {
        let dataArray = resp.results
        showGiphs(searchTerm, dataArray);
    }))
    .catch(err => console.log(err));

}

function sendShare(search_term,shared_gifs_id)
{
    let apikey = 'AIzaSyC0Yoa_3gzo0QDqmMDmq1PXw4gHU9us0ao'
    let clientkey = 'TenorDTF'
    let lang = 'ru'
    var share_url = "https://tenor.googleapis.com/v2/registershare?id=" + shared_gifs_id + "&key=" + apikey + "&client_key=" + clientkey + "&q=" + search_term + "&locale=" + lang;
    fetch(share_url)
}

function showGiphs(searchTerm, dataArray) {
  const results = document.querySelector(".results");
  let output = document.createElement('div')
  output.classList.add('gif_results_container')
  dataArray.forEach((imgData) => {
    let elem = document.createElement('img')
    elem.classList.add('gif_image_url')
    elem.setAttribute('src', `${imgData.media_formats.nanogif.url}`)
    elem.setAttribute('longdesc', `${imgData.media_formats.gif.url}`)
    elem.setAttribute('alt', `${imgData.id}`)
    elem.addEventListener("click", (event) => {
      addURLToTextBox(event.target.getAttribute('longdesc'))
      sendShare(searchTerm, event.target.getAttribute('alt'))
    })
    output.appendChild(elem);
  });
  document.querySelector('.results').append(output);
}

function cleanResultAll() {
  if (document.querySelector(".gif_results_container") !== null) {
    results = document.querySelector(".results")
    child = document.getElementsByClassName("gif_results_container")[0];
    results.removeChild(child)
    document.querySelector(".gif_search").value = ''
  }
}

function cleanResultAfterSubmin() {
  if (document.querySelector(".gif_results_container") !== null) {
    results = document.querySelector(".results")
    child = document.getElementsByClassName("gif_results_container")[0];
    results.removeChild(child)
  }
}

function addURLToTextBox(gifURL) {
  document.querySelector(".content_editable").textContent = gifURL;
  document.querySelector(".content_editable").focus();
  document.execCommand("InsertHTML", `<p class="content_editable" contenteditable="true">${gifURL}</p>`)
  document.querySelector(".content_editable").textContent = '';
  document.querySelector('.thesis__submit').addEventListener('click', (event) => {
    document.querySelector('.thesis__gif').click()
  });
}


