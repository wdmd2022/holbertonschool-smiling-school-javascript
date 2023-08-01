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

$(document).ready(function () {
    fetchQuotesMakeSlides();
    // Function to get the width of a single card (including margins) within the specific carousel
    function getCardWidth() {
        return $('#carouselExampleControls2 .carousel-item').first().outerWidth(true);
    }

    $('#carouselExampleControls2 .carousel-control-prev').click(function(e) {
        e.preventDefault();
        let cardWidth = getCardWidth();
        $('#carouselExampleControls2 .carousel-inner').animate({
            scrollLeft: '-=' + cardWidth
        }, 300);
    });

    $('#carouselExampleControls2 .carousel-control-next').click(function(e) {
        e.preventDefault();
        let cardWidth = getCardWidth();
        $('#carouselExampleControls2 .carousel-inner').animate({
            scrollLeft: '+=' + cardWidth
        }, 300);
    });
});