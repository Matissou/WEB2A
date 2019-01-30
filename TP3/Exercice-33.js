// Variables globales pour partager entre les fonctions
var defaultDisplay;
var checkbox;

window.onload = function(){
    
    initialize();
}

function initialize(){
    //La valeur par défaut (qui peut être block, inline ...)
    defaultDisplay = document.querySelector('#menu').style.display;

    //On cache le menu
    document.querySelector("#menu").style.display="none";

    //On ajoute un ecouteur sur le bouton pour trigger la fonction hide
    // quand un changement se produit
    checkbox = document.querySelector("#showMenu");
    checkbox.addEventListener("change",hide);
}

function hide(){

    //On récupère la valeur actuelle de la checkbox
    var checkedValue = document.querySelector('#showMenu').checked;
    if(checkedValue==false)
    {
        //On cache
        document.getElementById('menu').style.display = "none";
    }else{
        //Ou sinon on reprend la disposition de base
        document.getElementById('menu').style.display = defaultDisplay;
    }
}



function switchTheme(){
    var selector = document.getElementById("ltheme"); 
        var index = selector.selectedIndex+1;
        if (index == 1){
            document.getElementById("showMenu").style.display = "none";
        }
        document.body.setAttribute("class", 'theme'+index);
}
