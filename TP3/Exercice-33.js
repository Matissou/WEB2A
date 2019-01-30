/* Ce code s'execute bien sur Google Chrome v 71.0 */

// Variables globales pour partager entre les fonctions
var defaultDisplay;
var checkbox;
var selector;

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

    //Idem pour réagir au changement dans la liste déroulante
    selector = document.getElementById("ltheme");
    selector.addEventListener("change", switchTheme);

    //Par defaut, theme 1 et theme 1 -> checkBox cachée donc on demande une fois a switchTheme de travailler
    switchTheme();
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
    //Récupération de l'index de l'élément selectionné. Commence a 0 donc +1 pour changer l'attribut class
    var index = selector.selectedIndex+1;
    if (index == 1){
        document.getElementById("showMenu").parentElement.style.display = "none";
    }else{
        document.getElementById("showMenu").parentElement.style.display = "";
    }
    document.body.setAttribute("class", 'theme'+index);
}
