$(document).ready(function()
{
    main();
})

let data;

async function main () {

    data = await fetchJsonData();

    renderTrainers();
    renderSkills();
    scrollToDiv();
}

async function fetchJsonData()
{
    let jsonPath = `../../JsonFiles/${page}.json`;

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
            class: 'trainer-attributes d-flex flex-column gap-2 p-2 rounded-3 align-items-center',
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

    $('<div>',{class:'skill-tree-image mx-auto p-4', id:'treeImage'}).append(
        $('<img>',{ src: `../../Images/skills/${trainer.title}_Tree.png` })).appendTo(newSkillsDiv);

    $('<div>',{class:'all-skills d-flex mx-auto col-8'}).appendTo(newSkillsDiv);

    for (let skill of trainer.skills)
    {
        let skillDiv = $('<div>',{class:'skill-list d-flex flex-column mx-auto mt-3 p-3 rounded-4'}).appendTo(newSkillsDiv);
        
        $('<div>', { class: 'skill' }).append(
            $('<h4>', { class: 'skill-title rounded-3 p-2', text: skill.Name }),
            $('<div>', { class: 'skill-image-cost-description d-flex pt-3 gap-4' }).append(
                $('<div>', { class: 'skill-image' }).append(
                    $('<img>', { src: `../../Images/skills/${skill.Name}.png` })
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
        $(skillDiv).appendTo($('.all-skills'));
    }
    newSkillsDiv.hide().fadeIn(900);
}

function scrollToDiv(){
    let targetPosition;
    let trainersDivs = $('#trainersList').children('div');

    for (let trainerDiv of trainersDivs) {
        $(trainerDiv).click(function()
        {
            targetPosition = $('#treeImage').offset().top- 80;
            $('html, body').animate({
                scrollTop: targetPosition
            }, 'slow');
        })
    }
}