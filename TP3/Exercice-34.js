window.onload = function(){

    //Ajout d'écouteurs
    let btnPush = document.getElementsByName('push')[0]
    let btnPop = document.getElementsByName('pop')[0]
    let btnPeek = document.getElementsByName('peek')[0]

    btnPush.addEventListener("click",lifo_push)
    btnPop.addEventListener("click", lifo_pop)
    btnPeek.addEventListener("click", lifo_peek)

}

function lifo_push(){
    //On récupère la valeur du texte entré par l'utilisateur
    let txtinput = document.getElementById('newItem').value
    let txtToAdd = document.createTextNode(txtinput)

    //On ajoute un element li avec le texte
    let newLi = document.createElement("li")        
    newLi.appendChild(txtToAdd)

    //Et on ajoute ce dernier au ul
    let ul = document.getElementById('lifo')
    ul.insertBefore(newLi,ul.firstChild)
}

function lifo_pop(){
    //On recupère le nombre d'éléments
    let nbLi = document.getElementById('lifo').childElementCount
    let ul = document.getElementById('lifo')
    //S'il n'y a pas d'element alors erreur, sinon on supprime le premier
    if(nbLi >= 1){
        ul.removeChild(ul.firstChild)
    }else{
        alert('Erreur, il n\'y a rien à supprimer!')
    }
}

function lifo_peek(){
    //Si le premier fils n'existe pas alors c'est que la liste est vide
    let firstSon = document.getElementById('lifo').firstChild

    if(firstSon==null){
        alert('Erreur, il n\'y a rien à afficher !')
    }else{
        //Div
        let peek_area = document.getElementById('peek_area')
        
        //On supprime tout les éléments dans la div
        while (peek_area.hasChildNodes()) {
            peek_area.removeChild(peek_area.lastChild);
        }

        //On ajoute un élément p avec le contenu du li (innerHTML)
        let newP = document.createElement("p")
        newP.appendChild(document.createTextNode(firstSon.innerHTML))
        peek_area.appendChild(newP) 
    }
}

