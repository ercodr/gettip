window.addEventListener('DOMContentLoaded', () => {

    fetchQuote();

    let strArray2 = JSON.parse(localStorage.getItem('bookmark'));

    const getQuote = document.getElementById('getQuote');
    const home = document.getElementById('home');
    const bookmark = document.getElementById('bookmark');
    const display = document.getElementById('display');
    const quoteSave = document.getElementById('quote-save');
    const ul = document.getElementById('ul');

    const save = document.getElementById('save');

    const bookmarkView = document.getElementById('bookmarkView');
    const homeView = document.getElementById('homeView');
    const back = document.getElementById('back');
    const clearBookmark = document.getElementById('clearBookmark');


    // ARRAY FOR BOOKMARKING
    let favorite = Array()

    // TOGGLE VIEWS
    home.addEventListener('click', () => {
        location.reload();
    });

    bookmark.addEventListener('click', () => {
        bookmarkView.style.display = 'block';
        homeView.style.display = 'none';
        loadBookmark();
    });

    back.addEventListener('click', () => {
        bookmarkView.style.display = 'none';
        homeView.style.display = 'block';
    });
    
    getQuote.addEventListener('click', () => {
        
        fetchQuote();

        save.classList.replace('fa-heart', 'fa-heart-o');
        
    });

    let initial = JSON.parse(localStorage.getItem('bookmark'));

    // BOOKMARK BUTTON  TOGGLE
    quoteSave.addEventListener('click', () => {

        if(display.innerText == ''){
            log.innerText = 'BookmarkError: Failed to bookmark';
            setTimeout(() => {
                log.innerText = '';
            }, 2500);
            return
        }

        if(save.classList.contains('fa-heart-o')){
            save.classList.replace('fa-heart-o', 'fa-heart');

            setBookmark();
            
        } else{
            save.classList.replace('fa-heart', 'fa-heart-o');
        }


        
    });


    // GET QUOTE FROM THE SERVER
    function fetchQuote(){
        let url = new Request('https://api.adviceslip.com/advice')
        fetch(url)
        .then(res => res.json())
        .then(value => {
            display.innerHTML = `${value.slip.advice}`;

            // bookmarkValidation();

        }).catch((error) => {
            console.log(error)
        })
    }


    // ADD QUOTES TO BOOKMARK INTO LOCAL STORAGE
    function setBookmark(){
    
        if(!localStorage == null){
            favorite = JSON.parse(localStorage.getItem('bookmark'));
            favorite.push(display.innerText)
            // CONVERTING ARRAY TO STRING
            let strArray = JSON.stringify(favorite);
            localStorage.setItem('bookmark', strArray);
            
        } else {
            favorite.push(display.innerText)
            // CONVERTING ARRAY TO STRING
            let strArray = JSON.stringify(favorite);
            // ACCESSING LOCAL STORAGE
            localStorage.setItem('bookmark', strArray);
        }        
    }

    // CLEAR/DELETE ALL BOOKMARKS
    clearBookmark.addEventListener('click', () => {
        localStorage.removeItem('bookmark');
        ul.innerHTML = `<div>No quote bookmarked</div>`;
    });

    // LOAD BOOKMARK FROM LOCAL STORAGE
    function loadBookmark(){
        ul.innerHTML = '';

        if(window.localStorage.length == 0){
            ul.innerHTML = `<div>No quote bookmarked</div>`;
        } else {
            strArray2.forEach(quote => {
                ul.innerHTML += `
                    <li id="li">
                        <span>${quote}</span>
                        <i class="fa fa-window-close"></i>        
                    </li>
                    `;
            })
        }
    }

    function bookmarkValidation(){

        favorite
        if(display.innerText == value){
            save.classList.replace('fa-heart-o', 'fa-heart');
        }
    }
    
});



