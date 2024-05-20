$(document).ready(function()
{
    RenderTrainersDivs();
    fetchTypeOfSkills();
})

const trainers = [
    {
        title: "Cabal Hermit",
        name: "Adalbert",
        location: "Chersonese",
        TreeImageUrl: "/Outward-WebPage/Images/skills/Cabal_Hermit_Tree.png"
    },
    {
        title: "Kazite Spellblade",
        name: "EtoAkiyuki",
        location: "Chersonese",
        TreeImageUrl: "/Outward-WebPage/Images/skills/Kazite_Spellblade_Tree.png"

    },
    {
        title: "Kazite Spellblade",
        name: "EtoAkiyuki",
        location: "Chersonese"
    }
];

let skillsDivCreated = {};

function RenderTrainersDivs()
{
    //$('#trainersList').empty(); 
    
    for (let trainer of trainers) {
        $('<div>', { 
            class: 'trainer-attributes d-flex flex-column gap-2 p-3 rounded-3 bg-black align-items-center',
            css: { cursor: 'pointer' },
            data: { trainer: trainer }
        })
        .append(
            $('<div>', { class: 'trainer-image' }).append(
                $('<img>', { src: `../../Images/trainers/${trainer.name}.png` })
            ),
            $('<p>', { class: 'mb-0', text: trainer.title }),
            $('<p>', { class: 'mb-0', text: trainer.name }),
            $('<p>', { class: 'mb-0', text: trainer.location })
        )
        .appendTo('#trainersList');
    }
};

function fetchTypeOfSkills()
{
    let trythis = $('#trainersList');
    let childDivs = trythis.children('div');


    for (let div of childDivs) {
        $(div).click(function()
        {
            let trainer = $(div).data('trainer');

            let type = ($(div).children('p').eq(0).text())

            let divToRemove = $('#skillsDiv');

            if (divToRemove.length > 0) {
                divToRemove.slideUp( function()
            {
                $(divToRemove).remove();
            })
        }
        fetchDataAndRenderTrainersDetails(type, trainer);
            }
        );
        
    }
}

function fetchDataAndRenderTrainersDetails(type, trainer)
{
    let jsonPath = `/Outward-WebPage/JsonFiles/skills.txt`;
    let getJson = new XMLHttpRequest();

    getJson.open("GET", jsonPath, true);

    getJson.onreadystatechange = function() {
        if(getJson.readyState ===4){
            if(getJson.status === 200)
            {
                const dataFromJson = JSON.parse(getJson.responseText);

                GiveMeTheCertainTypeSkills(dataFromJson, type, trainer);

                
            }
            else
            {
                alert("Error");
            }
        }
    }
    getJson.send();
}

function GiveMeTheCertainTypeSkills(dataFromJson, type, trainer)
{
    let typeSkillsList = [];

    for (let i of dataFromJson.skills)
    {
        if (i.Trainer === type)
        {
            typeSkillsList.push(i);
        }
        
    }

    console.log(typeSkillsList);

    CreateAndPopulateSkillsDiv(typeSkillsList, trainer);
}

function CreateAndPopulateSkillsDiv(typeSkillsList, trainer)
{

    let newSkillsDiv = $('<div>',{id:'skillsDiv',class:'skills pb-5 pt-5'}).insertBefore('#social');

    $('<div>',{class:'skill-tree-image text-center p-4'}).append(
        $('<img>',{src: trainer.TreeImageUrl })).appendTo(newSkillsDiv);

    for (let skill of typeSkillsList)
    {
        let skillDiv = $('<div>',{class:'skill-list d-flex flex-column mx-auto bg-black mt-3 p-3 rounded-4 col-8'}).appendTo(newSkillsDiv);
        
        $('<div>', { class: 'skill' }).append(
            $('<h4>', { class: 'skill-title rounded-3 p-2', text: skill.Name }),
            $('<div>', { class: 'skill-image-cost-description d-flex pt-3 gap-4' }).append(
                $('<div>', { class: 'skill-image' }).append(
                    $('<img>', { src: skill.SkillImageUrl })
                ),
                $('<div>', { class: 'skill-cost-description' }).append(
                    $('<div>', { class: 'skill-cost d-flex gap-4' }).append(
                        $('<p>', { text: skill.CoinsCost }),
                        $('<p>', { text: skill.SourceCost }),
                        $('<p>', { text: skill.CoolDown })
                    ),
                    $('<div>', { class: 'description' }).append(
                        $('<p>', { text: skill.Description })
                    )
                )
            )
        ).appendTo(skillDiv);
    }
    
    newSkillsDiv.hide().fadeIn(900);
}