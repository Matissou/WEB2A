var defaultDisplay;
var checkbox;

window.onload = function(){
    
    //Valeur par défaut : visible
    defaultDisplay = document.querySelector('#menu').style.display;
    
    // Cacher de base le menu
    document.querySelector("#menu").style.display="none";
    checkbox = document.querySelector("#showMenu");
    checkbox.addEventListener("change",hide);
}

function hide(){

    var checkedValue = document.querySelector('#showMenu').checked;
    if(checkedValue==false)
    {
        document.getElementById('menu').style.display = "none";
    }else{
        document.getElementById('menu').style.display = defaultDisplay;
    }
}



function switchTheme(){

}
