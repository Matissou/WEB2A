$(window).on('load', cacherVide)
$(window).on('load', colorerLignes)
$(window).on('load', nombres)
$(window).on('load', function(){
    $("table").each(function(){
        raccourcir($(this))
    })
} )
$(window).on('load', initClicEnteteTableaux)

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

function raccourcir(tableau){
    var bodyTR = tableau.find("tbody tr")
    if(bodyTR.size()>5){
        for(var i = 5; i<bodyTR.size(); i++){
            $(bodyTR[i]).hide()
        }
        
        $("<tr><td>...</td> <td>...</td> <td>...</td></tr>").appendTo(bodyTR.parent())
    }
}

function rallonger(tableau){
    var tbody = tableau.find("tbody")
    // trouve tous les elements cachés et les montres
    tbody.find(":hidden").show()
    // Enlève les ... de la fin
    tbody.children().last().remove()
}

function initClicEnteteTableaux(){
    $("thead th").each(function(){
        $(this).addClass("cliquable")
        $(this).on('click', function(){
            var tab = $(this).parents("table")
            if (tab.find(":hidden").size() > 0){
                rallonger(tab)
            }else{
                raccourcir(tab)
            }
        })
    })

}