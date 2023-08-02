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

async function getVids(apiURL) {
    const response = await fetch(apiURL);
    // this makes it wait until promise is returned before continuing
    if (!response.ok) {
        console.log("I think your api is broken or something, bummer");
    }
    // since fetch doesn't return an error on 404 etc, we check using 'ok'
    const gimmeJSON = await response.json();
    // now we have a JSON object which is an array of the movies
    gimmeJSON.forEach(item => {
        console.log(item.title)
        makeVidCards(item);
    });
}

function makeVidCards(item) {
    
}

$(document).ready(function () {
    fetchQuotesMakeSlides();
    getVids('https://smileschool-api.hbtn.info/popular-tutorials');
});