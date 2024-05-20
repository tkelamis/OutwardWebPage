function loadMenu_Button() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../components/button-menu.html', true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4)
    {
        if(xhr.status === 200)
        {
            document.getElementById('menu-button-container').innerHTML = xhr.responseText;
        }
    }  
    };

    xhr.send();
  }

  document.addEventListener('DOMContentLoaded', loadMenu_Button);