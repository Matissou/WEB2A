window.onload = function(){

    // On récupère la couleur par défaut du titre
    var defaultColor = document.querySelector('#introduction').style.color;

    //Bouton 1 2 et 3 
    var act1 = document.getElementById('b1');
    var act2 = document.getElementById('b2');
    var act3 = document.getElementById('b3');

    //La fonction suivante s'exécute lors du clique sur le boutton
    act1.onclick = function changeBG(){
        document.getElementById('contents').style.backgroundColor = "yellow";
    }

    //Action 2
    act2.onclick = function alternateTitleColor(){
        // Nouvelle façon de selectionner un element DOM
        //(d'après william, elementByTagName est pourris)
        const doc = document.querySelector('#introduction');
        // On accède au style et à la propriété couleur du h1
        couleur = doc.style.color;
        
        //On change la couleur selon la règle
        if(couleur == defaultColor){
            couleur = "red";
        }else{
            couleur = defaultColor;
        }
        doc.style.color=couleur;
    }
}