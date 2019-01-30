window.onload = function(){
    //Valeur par défaut : visible
    var defaultDisplay = document.querySelector('#menu').style.display;
    // Cacher de base le menu
    document.querySelector("#menu").style.display="none";
    var checkbox = document.querySelector("#showMenu");
    

    checkbox.onchange = function hid(){
        var checkedValue = document.querySelector('#showMenu').checked;
        
        if(checkedValue==false)
        {
            document.getElementById('menu').style.display = "none";
        }else{
            document.getElementById('menu').style.display = defaultDisplay;
        }
        
    }
}



function switchTheme(){

}
