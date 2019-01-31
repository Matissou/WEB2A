/* Ce code s'execute bien sur Google Chrome v 71.0 */

window.onload = function(){
    // Recuperation du bandeau de boutons
    var cmds = document.getElementById("commands")
    cmds.addEventListener("change", function name(params) {
        document.getElementById("contents").innerHTML = ""
        inputs = cmds.getElementsByTagName("input")
        // Dès la détéction d'un changement, on appelle la fonction liste sur le numero de bouton activé
        for(var i =0; i<inputs.length; i++){
            if(inputs[i].checked){
                liste(i+1)
            }
        }
    });
}

// Ajoute au div contents la liste de définitons correspondante au bouton coché
function liste(i) {
    var def = getDefinition(i)
    var contents = document.getElementById("contents")
    contents.appendChild(def2html(def))
}

// Retourne la représentation d'un objet ListeDefinition sous forme de <dl>
function def2html(deflist){
    var dl = document.createElement("dl")
    var dt = document.createElement("dt")
    dt.textContent = deflist.title
    dl.appendChild(dt)
    // Si il y a des elements dans les items
    if(deflist.items.length){
        var dd = document.createElement("dd")
        var ul = document.createElement("ul")
        deflist.items.forEach(element => {
            var li = document.createElement("li")
            // Cas simple, on ajoute simplement le texte au li
            if (typeof element == "string"){
                li.textContent = element
            // Cas ou l'item est ListeDefinition, on rapelle recursivement 
            // cette fonction pour ajouter le dl correspondant.
            }else{
                li.appendChild(def2html(element))
            }
            ul.appendChild(li)
        });
        dd.appendChild(ul)
        dl.appendChild(dd)
    }
    return dl
}