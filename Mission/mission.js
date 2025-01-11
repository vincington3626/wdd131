const themeSelector = document.querySelector('#theme-select');


function changeTheme() {
   
    const selectedTheme = themeSelector.value;
   
   
    if (selectedTheme === 'dark') {
        document.body.classList.add('dark');
        document.querySelector('.logo').src = "Images/byui-logo_white.png";
    } else {
        document.body.classList.remove('dark');
        document.querySelector('.logo').src = "Images/byui-logo_blue.webp";
    }
}

themeSelector.addEventListener('change', changeTheme);