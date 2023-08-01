const menuToggle = document.getElementById('menu-toggle');
const menuList = document.getElementById('menu-list');

let show = true;
let currentlyHiding = false;
menuToggle.addEventListener('click', () => {
    show = !show;

    if (show) {
        currentlyHiding = false;
        menuList.classList.remove('actually-hidden');
        menuToggle.classList.remove('toggled')
        setTimeout(() => {
            menuList.classList.remove('hidden');
        }, 10)
    } else {
        currentlyHiding = true;
        menuList.classList.add('hidden');
        menuToggle.classList.add('toggled')
        setTimeout(() => {
            if (currentlyHiding) {
                menuList.classList.add('actually-hidden');
            }
        }, 1000)
    }
})