export let nightMode = localStorage.getItem("nightMode");
const nightModeToggle = document.querySelector("#checkbox");

const enableNightMode = ()=>{
    document.body.classList.add('nightMode');
    localStorage.setItem("nightMode", "enabled");
};

const disableNightMode =() =>{
    document.body.classList.remove("nightMode");
    localStorage.setItem("nightMode", null);
};

if (nightMode === 'enabled'){
    nightModeToggle.checked = true;
    enableNightMode();
}

nightModeToggle.addEventListener("change", ()=>{
    nightMode = localStorage.getItem("nightMode");
    if (nightModeToggle.checked){
        enableNightMode();
    }else{
        disableNightMode();
    }
});