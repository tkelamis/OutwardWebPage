$(document).ready(function()
{
    CarouselLocation();
})

function CarouselLocation()
{
    const sliderIndicators = $('#carouselExampleIndicators .carousel-indicators li');

    const carouselControls = $('[class*="carousel-control"]');

    let index = 0;

    const locations = [ 
        $('#location-chersonese'),
        $('#location-hallowedMarsh'),
        $('#location-enmerkarForest'),
        $('#location-abrassar'),
        $('#location-antiquePlateau'),
        $('#location-caldera')
    ]

    $(carouselControls).on('click', function()
    {
        
        for (let i=0; i < sliderIndicators.length; i++)
        {
            if ($(sliderIndicators[i]).hasClass('active'))
            {
                index = i;
            }

        }
        locations.forEach((location, i) => {
            if (i === index)
            {
                location.css({'display':'flex'});
            }
            else
            {
                location.css({'display':'none'});
            }}
                    
        );
    })
}
            