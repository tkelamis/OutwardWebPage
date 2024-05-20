let newDataTable;
let data;

main();

async function main () {

    data = await fetchJsonData();

    document.getElementById('page-description').textContent = data.description;
    
    if (data.titlesOfCategory)
    {
        renderCategories(page);
    }
    
    if (data.items.length > 0) {

        renderTable();
        
        populateTable(data.items);
    }
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

function renderCategories()
{
    const imgAndTitleDivContainer = document.createElement('div');
    imgAndTitleDivContainer.classList.add('imgAndTitleDivContainer');
    document.getElementById("categoryAndDescription").appendChild(imgAndTitleDivContainer);

    const imagesPath = getImagesPath();

    for (let i=0; i< data.titlesOfCategory.length; i++ )
    {
        const imgAndTitleDiv = document.createElement('div');
        imgAndTitleDiv.classList.add('category-imgAndTitleDiv', 'hover');
        imgAndTitleDivContainer.appendChild(imgAndTitleDiv);

        const imagePart = document.createElement('div');
        imagePart.classList.add('category-image');

        imagePart.style.backgroundImage = `url('${imagesPath[i]}')`;
        imagePart.style.backgroundSize = 'cover'; 
        imagePart.style.backgroundPosition = 'center'; 
        imagePart.style.backgroundRepeat = 'no-repeat';
        imgAndTitleDiv.appendChild(imagePart);

        const title = document.createElement('p');
        title.textContent = data.titlesOfCategory[i];
        imgAndTitleDiv.appendChild(title);
    }

    const filterButtonDiv = document.createElement('div');
    filterButtonDiv.classList.add('text-center' , 'p-3')
    document.getElementById("categoryAndDescription").appendChild(filterButtonDiv);



    const filterButton = document.createElement('button');
    
    if (page === 'equipment')
    {
        filterButton.classList.add('filter-button-equipment');
    }
    if (page === 'weapons')
    {
        filterButton.classList.add('filter-button-skills');
        
    }
    
    filterButton.setAttribute('id', 'clearFilters');
    filterButton.textContent = 'Show All';
    filterButtonDiv.appendChild(filterButton);

    addEventListenersOnCategories();
}

function getImagesPath()
{
    const imagePaths = [];
    for (let entry of data.titlesOfCategory)
    {
        let path = `../../Images/${data.name}/${entry}.png`;
        imagePaths.push(path);
    }
    return imagePaths;
}

function renderTable()
{
    //create table
    const table = document.createElement('table');
    table.classList.add('display');
    table.setAttribute("id","dataTable");

    // create headers
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const headers = Object.keys(data.items[0]);
    for(let header of headers)
    {  
        if (header === "Category" && (page === 'weapons' || page === 'equipment')) continue;
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th); 
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    document.getElementById("newDiv").appendChild(table);
}

function populateTable(tableData)
{
    if (newDataTable) {
        newDataTable.destroy();
    }
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = "";

    for (let item of tableData)
    {
        const new_tr = document.createElement('tr');

        const entries = Object.entries(item);

        for (let [key, value] of entries)
        {
            if (key==="Category" && (page === 'weapons' || page === 'equipment')) continue;
            const new_td = document.createElement('td');
            new_td.textContent = value;
            new_tr.appendChild(new_td);
        }
        tbody.appendChild(new_tr);
    }
    newDataTable = new DataTable('#dataTable');
}

function addEventListenersOnCategories() {
    
    const buttons = document.getElementsByClassName('category-imgAndTitleDiv');
    let filterButton = document.getElementById('clearFilters');

    for (let button of buttons) {
        button.addEventListener('click', () => {
            
                let filteredData = data.items.filter(s => s.Category === button.lastChild.textContent);
                populateTable(filteredData);            
            }
        )  
    }

    filterButton.addEventListener('click', () => {
        populateTable(data.items);
    });
}

