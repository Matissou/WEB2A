window.addEventListener('load', cacherVide , false);
window.addEventListener('load', colorerLignes , false);
window.addEventListener('load', nombres , false);

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

// Fonction qui colorie les lignes des tableaux
function colorerLignes(){
    // Ajoute la class lig1 tous les 3 tr en partant de 1
    $("tbody tr:nth-child(3n+1)").addClass("lig1")
    // Ajoute la class lig1 tous les 3 tr en partant de 2
    $("tbody tr:nth-child(3n+2)").addClass("lig2")
    // Ajoute la class lig1 tous les 3 tr en partant de 3
    $("tbody tr:nth-child(3n+3)").addClass("lig3")
}

// Applique la class nombre a chaque nombre de la ligne
function nombres(){
    $("body tr td:nth-child(2)").addClass("nombre")
    $("body tr td:nth-child(3)").addClass("nombre")
}