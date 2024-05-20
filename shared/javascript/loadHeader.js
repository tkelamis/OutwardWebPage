function loadHeader() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../components/header.html', true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4)
    {
        if(xhr.status === 200)
        {
            document.getElementById('header-container').innerHTML = xhr.responseText;
        }
        else {
            console.error('Error: Request failed with status', xhr.status);
        }
    }  
    };

    xhr.send();
  }

  document.addEventListener('DOMContentLoaded', loadHeader);

  