window.addEventListener('load', cacherVide , false);
window.addEventListener('load', colorerLignes , false);

// Fonction qui cache les div correspondant aux tbody vides de la page
function cacherVide(){
    $("tbody").each(function() {
        //Test tbody vide
        if( $(this).children().size() == 0 ){
            // Cache le div correspondant
            $(this).parents("div").hide()
        }
    })
}


function colorerLignes(){

}