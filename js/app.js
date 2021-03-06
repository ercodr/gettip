window.addEventListener('DOMContentLoaded', () => {

    let quotes = new Array();

    console.log(quotes);

    fetchQuote();

    const getQuote = document.getElementById('getQuote');
    const home = document.getElementById('home');
    const bookmark = document.getElementById('bookmark');
    const display = document.getElementById('display');
    const quoteSave = document.getElementById('quote-save');
    let ul = document.getElementById('ul');
    let log = document.getElementById('log');
    const close_modal = document.getElementById('closeModal');
    const share_button = document.getElementById('share');
    const handBurger = document.getElementById('hand-burger');

    const previous = document.getElementById('previous');
    const forward = document.getElementById('forward');

    const save = document.getElementById('save');

    const bookmarkView = document.getElementById('bookmarkView');
    const homeView = document.getElementById('homeView');
    const back = document.getElementById('back');
    const clearBookmark = document.getElementById('clearBookmark');
    const badge = document.getElementById('badge');
    const report_bg = document.getElementById('report-bg');
    const form = document.getElementById('form');
    const menu_bg = document.getElementById('menu-bg');
    const menu_list = document.getElementById('menu-list');
    


    // ARRAY FOR BOOKMARKING
    let favorite = new Array();


    if(localStorage.length != 0){
        JSON.parse(localStorage.getItem('bookmark')).forEach( quote => {
            favorite.push(quote)
        })
    }

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
        // netError();
    });

    handBurger.addEventListener('click', () => {
        menu_list.style.left = '0';
        menu_bg.style.left = '0';
    });

    
    menu_bg.addEventListener('click', () => {
        menu_list.style.left = '-80%';
        menu_bg.style.left = '-100%';
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


    share_button.addEventListener('click', async () => {
        const shareData = {
            title: 'Get Tips',
            text: display.textContent + '\n\n' + 'Shared from...' + '\n',
            url: 'https://ercodr.github.io/gettip/'
          }
          
        try {
          await navigator.share(shareData)
        } catch(err) {
          resultPara.textContent = console.log(err)
        }
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        send_mail();
    })

    close_modal.addEventListener('click', () => {
        report_bg.style.display = 'none';
    });

    let quote_head = '';

    // GET QUOTE FROM THE SERVER
    function fetchQuote(){
        let url = new Request('https://api.adviceslip.com/advice')
        fetch(url)
        .then(res => res.json())
        .then(value => {
            display.innerHTML = `${value.slip.advice}`;
            quotes.push(display.textContent);
            quote_head++;
            log.innerText = '';
            console.log(quotes)

            navCheck();

        }).catch( error => log.innerText = error)
    }


    function navCheck() {
        if(quotes.length > 1){
            previous.style.background = '';
            previous.style.pointerEvents = '';
        }
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



    previous.addEventListener('click', () => {
        if(!quote_head == 0){
            quote_head--;
            display.innerText = quotes[quote_head];
        } else {
            quote_head = 0;
            previous.style.pointerEvents = 'none';
            previous.style.background = '#a1a1a1';    
        }

        if(quote_head < quotes.length-1){
            forward.style.pointerEvents = '';
            forward.style.background = '';   
        } 
        
    });
    
    forward.addEventListener('click', () => {
        if(quote_head < quotes.length-1){
            quote_head++;
            display.innerText = quotes[quote_head];
        } else {
            quote_head = quotes.length-1;
            forward.style.pointerEvents = 'none';
            forward.style.background = '#a1a1a1';    
        }

        if(quotes.length > 0){
            previous.style.pointerEvents = '';
            previous.style.background = '';   
        }
    });



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

    // function netError(){
    //     setTimeout(() => {
    //         if(display.innerText == ''){
    //             log.innerText = 'net::ERR_INTERNET_DISCONNECTED';
    //             setTimeout(() => {
    //                 log.innerText = '';
    //             }, 2500);
    //         } else {
    //             log.innerText = '';
    //         }    
    //     }, 1500);
    // }

    // netError();


    
    // MENU SECTION MENU SECTION MENU SECTION

    // APP CLOSE // BROWSER CLOSE
    document.getElementById('exit').addEventListener('click', () => {
        window.close();
    });


    // CONTACT US  // SEND US E_MAIL
    document.getElementById('contact').addEventListener('click', () => {
        report_bg.style.display = 'flex';
    });


    // SHARE APP
    document.getElementById('share-app').addEventListener('click', async () => {

        const install = 
`
*GET TIPS*
General Tips Generating Web App

*HOW TO INSTALL GET TIPS*:
1. Open the URL in a browser
2. Click on menu (three vertical dots)
3. Tap "Add to Home screeen"
4. Tap Add
5. Tap Add

*SUPPORTED BROWSERS*
- Google Chrome
- Apple Safari
- Firefox (Android)

*URL*
`

        const shareData = {
            title: 'Get Tips',
            text: install,
            url: 'https://ercodr.github.io/gettip/'
          }
          
        try {
          await navigator.share(shareData)
        } catch(err) {
          resultPara.textContent = console.log(err)
        }
    });

    document.getElementById('help').addEventListener('click', () => {
        document.querySelector('.get-help').style.display = 'flex';
    });

    document.querySelector('.get-help').addEventListener('click', () => {
        document.querySelector('.get-help').style.display = 'none';
    });



    function send_mail() {
        var templateParams = {
            from_name: document.getElementById('name').value,
            to_name: "Alphascid Technologies",
            message: document.getElementById('message').value
        };

        document.getElementById('name').value = '';
        document.getElementById('message').value = '';

        setTimeout(() => {
            document.getElementById('form').innerHTML = `
            <h1>
                <i class="fa fa-check-circle" style="font-size: 120px;"></i>
                <span>E-MAIL SENT!</span>
            </h1>
            `
        }, 2000);
        
        emailjs.send('service_qst8txo', 'template_77h5nq8', templateParams)
            .then(function(response) {
                report_bg.style.display = 'none';
                console.log('SUCCESS!', response.status, response.text);
                log.innerText = 'SUCCESS!';
                setTimeout(() => {
                log.innerText = '';
            }, 2500);
            }, function(error) {
                console.log('FAILED...', error);
                log.innerHTML = `FAILED: ${error}`;
                setTimeout(() => {
                log.innerText = '';
            }, 2500);
            });
    }

    previous.style.pointerEvents = 'none';
    forward.style.pointerEvents = 'none';
    forward.style.background = '#a1a1a1';
    previous.style.background = '#a1a1a1';    

});



