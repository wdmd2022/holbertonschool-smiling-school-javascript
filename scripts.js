function fetchQuotesMakeSlides() {
    fetch('https://smileschool-api.hbtn.info/quotes')
    .then(response => {
        if (!response.ok) {
            console.log("whoops could not get quote slides")
        }
        return response.json();
    })
    .then((data) => {
        const loader = $('#loady');
        loader.hide();
        let first = true;
        const slideDeck = $('#quotedeck');
        data.forEach(item => {
            const element = document.createElement('div');
            console.log("made a new div, nice.");
            console.log(element);
            if (first) {
                element.classList.add("active");
            }
            element.classList.add("carousel-item");
            first = false;
            const rowwy = $('<div>').addClass('row mx-auto align-items-center').appendTo(element);
            const colin1 = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center').appendTo(rowwy);
            let piccy = $('<img>').addClass('d-block align-self-center');
            piccy.attr({
                src: item.pic_url,
                alt: "person speaking"
            });
            piccy.appendTo(colin1);
            const colin2 = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0');
            const quotey = $('<div>').addClass('quote-text');
            const testimonial = $('<p>').addClass('text-white').text(item.text);
            const testimonialName = $('<h4>').addClass('text-white font-weight-bold').text(item.name);
            const testimonialOccupation = $('<span>').addClass('text-white').text(item.title);
            quotey.append(testimonial);
            quotey.append(testimonialName);
            quotey.append(testimonialOccupation);
            colin2.append(quotey);
            colin2.appendTo(rowwy);
            slideDeck.append(element);
        })
    })
    .catch(error => {
        console.log('whoops I messed up');
    })
};

async function getVids(apiURL, domID) {
    const response = await fetch(apiURL);
    // this makes it wait until promise is returned before continuing
    if (!response.ok) {
        console.log("I think your api is broken or something, bummer");
    }
    // since fetch doesn't return an error on 404 etc, we check using 'ok'
    const gimmeJSON = await response.json();
    // now we have a JSON object which is an array of the movies
    const loaderToClose = '#' + domID + 'Loader';
    $(loaderToClose).hide();
    gimmeJSON.forEach(item => {
        console.log(item.title)
        const newCard = makeVidCards(item);
        $(`#${domID}`).append(newCard);
        
    });
    const classToSlickInitialize = '.' + domID;
    $(classToSlickInitialize).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}

function makeVidCards(item) {
    let starBright = item.star;
    let starDark = 5 - starBright;
    let starBlock = '';
    for (let i = 0; i < starBright; i++) {
        starBlock += `<img src="images/star_on.png" alt="star on" width="15px" />`
    }
    for (let j = 0; j < starDark; j++) {
        starBlock += `<img src="images/star_off.png" alt="star off" width="15px" />`
    }
    let vidCard = $('<div>').addClass('card mx-md-3 border shadow');
    vidCard.append(`<img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail" />
    <div class="card-img-overlay text-center">
      <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
    </div>
    <div class="card-body">
      <h5 class="card-title font-weight-bold text-truncate">${item.title}</h5>
      <p class="card-text text-muted">${item["sub-title"]}</p>
      <div class="creator d-flex align-items-center">
        <img src="${item.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
        <h6 class="pl-3 m-0 main-color text-nowrap">${item.author}</h6>
      </div>
      <div class="info pt-3 d-flex justify-content-between">
        <div class="rating text-nowrap small">
          ${starBlock}
        </div>
        <span class="main-color text-nowrap small">${item.duration}</span>
      </div>
    </div>`);
    return vidCard;
}


$(document).ready(function () {
    fetchQuotesMakeSlides();
    getVids('https://smileschool-api.hbtn.info/popular-tutorials', 'popVids');
    getVids('https://smileschool-api.hbtn.info/latest-videos', 'latestVids');
    
});


