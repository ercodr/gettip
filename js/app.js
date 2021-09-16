window.addEventListener('DOMContentLoaded', () => {

    fetchQuote();

    const getQuote = document.getElementById('getQuote');
    const home = document.getElementById('home');
    const bookmark = document.getElementById('bookmark');
    const display = document.getElementById('display');
    const quoteSave = document.getElementById('quote-save');
    let ul = document.getElementById('ul');
    let log = document.getElementById('log');
    const logReport = document.getElementById('report');
    const close_modal = document.getElementById('closeModal');
    const share_button = document.getElementById('share');

    const save = document.getElementById('save');

    const bookmarkView = document.getElementById('bookmarkView');
    const homeView = document.getElementById('homeView');
    const back = document.getElementById('back');
    const clearBookmark = document.getElementById('clearBookmark');
    const badge = document.getElementById('badge');
    const report_bg = document.getElementById('report-bg');
    const form = document.getElementById('form');
    


    // ARRAY FOR BOOKMARKING
    let favorite = new Array();


    const shareData = {
        title: 'Get Tips',
        text: display.innerText,
        url: 'https://ercodr.github.io/gettip/'//document.location.href
      }



    if(localStorage.length != 0){
        JSON.parse(localStorage.getItem('bookmark')).forEach( quote => {
            favorite.push(quote)
        })
    }

    // TOGGLE RELOAD PAGE
    home.addEventListener('click', () => {
        location.reload();
    });

    // TOGGLE BOOKMARK VIEW
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
        netError();
    });

    share_button.addEventListener('click', async () => {
        try {
            await navigator.share(shareData)
            // log.innerText = 'MDN shared successfully'
        } catch(err) {
            log.innerText = 'Error: ' + err
        }
    });

    // BOOKMARK BUTTON TOGGLE
    quoteSave.addEventListener('click', () => {

        if(save.classList.contains('fa-heart-o')){
            save.classList.replace('fa-heart-o', 'fa-heart');
            setBookmark();            
        }else{
            save.classList.replace('fa-heart', 'fa-heart-o');
        }        
    });

    logReport.addEventListener('click', () => {
        report_bg.style.display = 'flex';
    });

    close_modal.addEventListener('click', () => {
        report_bg.style.display = 'none';
    });

    // GET QUOTE FROM THE SERVER
    function fetchQuote(){
        let url = new Request('https://api.adviceslip.com/advice')
        fetch(url)
        .then(res => res.json())
        .then(value => {
            display.innerHTML = `${value.slip.advice}`;
        }).catch( error => console.log(error))
    }

    // ADD QUOTES TO BOOKMARK INTO LOCAL STORAGE
    function setBookmark(){
        favorite.push(display.innerText);
        let uniqueFav = [...new Set(favorite)];
        localStorage.setItem('bookmark', JSON.stringify(uniqueFav));
    }

    // CLEAR/DELETE ALL BOOKMARKS
    clearBookmark.addEventListener('click', () => {
        localStorage.removeItem('bookmark');
        ul.innerHTML = `<div>Bookmark empty</div>`;
    });

    // LOAD BOOKMARK FROM LOCAL STORAGE
    function loadBookmark(){
        ul.innerHTML = '';
        if(localStorage.length == 0){
            ul.innerHTML = '<div>Bookmark empty</div>'
            return
        }
        let array = JSON.parse(localStorage.getItem('bookmark'));
        array.forEach(quote => {
            ul.innerHTML += `<li>${quote}</li>`
        })
    }


    display.addEventListener('click', () => {
        let textCopy = display.innerText;
        navigator.clipboard.writeText(textCopy).then(function() {
        console.log('Copied!');
        log.innerText = 'Copied!';
        setTimeout(() => {
            log.innerText = '';
        }, 2500);
        }, function(err) {
        console.error('Could not copy text: ', err);
        log.innerText = err;
        });
    });


    setInterval(() => {
        badge.innerHTML = favorite.length;
    }, 0);

    function netError(){
        setTimeout(() => {
            if(display.innerText == ''){
                log.innerText = 'net::ERR_INTERNET_DISCONNECTED';
                setTimeout(() => {
                    log.innerText = '';
                }, 2500);
            } else {
                log.innerText = '';
            }    
        }, 1500);
    }

    netError();




});



