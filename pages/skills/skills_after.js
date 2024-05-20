$(document).ready(function()
{
    main();
})

let data;

async function main () {

    data = await fetchJsonData();

    renderTrainers();
    renderSkills();
}

async function fetchJsonData()
{
    let jsonPath = `/Outward-WebPage/JsonFiles/${page}.json`;

    const response = await fetch(jsonPath);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData;
}

function renderTrainers()
{
    for (let trainer of data) {
        $('<div>', { 
            class: 'trainer-attributes d-flex flex-column gap-2 p-3 rounded-3 bg-black align-items-center',
            css: { cursor: 'pointer' }
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

function renderSkills()
{
    // Selection of trainers divs
    let trainersDivs = $('#trainersList').children('div');
    let trainersDivTitle;

    for (let trainerDiv of trainersDivs) {
        $(trainerDiv).click(function()
        {
            trainersDivTitle = $(trainerDiv).find('p').first().text();

            let divToRemove = $('#skillsDiv');

            if (divToRemove) {
                divToRemove.slideUp( function()
                {
                    $(divToRemove).remove();
                })
            }
            
            let trainerObject;
            for (let trainer of data)
            {
                if(trainer.title === trainersDivTitle)
                {
                    trainerObject = trainer;
                }
            }
            createSkills(trainerObject);
        })
    }
}

function createSkills(trainer)
{
    let newSkillsDiv = $('<div>',{id:'skillsDiv',class:'skills pb-5 pt-5'}).insertBefore('#social');

    $('<div>',{class:'skill-tree-image text-center p-4'}).append(
        $('<img>',{src: trainer.TreeImageUrl })).appendTo(newSkillsDiv);

    for (let skill of trainer.skills)
    {
        let skillDiv = $('<div>',{class:'skill-list d-flex flex-column mx-auto bg-black mt-3 p-3 rounded-4 col-8'}).appendTo(newSkillsDiv);
        
        $('<div>', { class: 'skill' }).append(
            $('<h4>', { class: 'skill-title rounded-3 p-2', text: skill.Name }),
            $('<div>', { class: 'skill-image-cost-description d-flex pt-3 gap-4' }).append(
                $('<div>', { class: 'skill-image' }).append(
                    $('<img>', { src: `/Outward-WebPage/Images/skills/${skill.Name}.png` })
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