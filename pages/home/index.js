$(document).ready(function()
{
    HideEditionDescription();
    HomePageEditionDescription(versions);
    Prepend();
})

function Prepend(){
    $("#deleteConfirmation").prependTo("body");
}

const versions =[
    {
        clickClass: '.version-DefinitiveEdition',
        slideClass: '.information-definitiveEdition'
    },
    {
        clickClass: '.version-Soroboreans',
        slideClass: '.information-Soroboreans'
    },
    {
        clickClass: '.version-TheThreeBrothers',
        slideClass: '.information-TheThreeBrothers'
    }
]


function HideEditionDescription()
{
    for (let version of versions) 
    {
        $(version.slideClass).hide();
    }
    
}

function HomePageEditionDescription()
{
    for (let version of versions) 
    {

        $(version.clickClass).hover(
            function()
            {
                $(version.clickClass).css({'box-shadow':'0 0 20px grey'});
            },
            function()
            {
                $(version.clickClass).css({'box-shadow':'none'});
            }
        )
        $(version.clickClass).click(
            function()
            {
                for (let i of versions)
                {
                    if (i.slideClass !== version.slideClass && $(i.slideClass).is(":visible"))
                    {
                        $(i.slideClass).slideUp();
                    }
                }
                $(version.slideClass).slideToggle();
            }
        )
    }
}