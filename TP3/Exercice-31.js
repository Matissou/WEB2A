/* Ce code s'execute bien sur Google Chrome v 71.0 */
window.onload = function(){
    versionSimple();
    //versionPropre();
}


function versionSimple(){
        //Version facile 

        //Création de deux textNode que l'on assignera aux li
        var one = document.createTextNode("One");
        var two = document.createTextNode("Two");
        var three = document.createTextNode("Three");
    
        // Creation des li et ajout des text nodes précédant
        var li1 = document.createElement("li");
        li1.appendChild(one);
    
        var li2 = document.createElement("li");
        li2.appendChild(two);
    
        var li3 = document.createElement("li");
        li3.setAttribute("class", "last");
        li3.appendChild(three);
    
        //Création du ul
        var ul = document.createElement("ul");
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
    
        //On ajoute le tout au body/
        // le [0] permet de selectionner body car la fonction renvoie un tableau
        test = document.getElementsByTagName("body")[0];
        test.appendChild(ul);
}


function versionPropre()
{
    //version plus compliqué 
    var ott = ["One", "Two", "Three"];
    var ul = document.createElement("ul");
    var lli;
    //On parcours le tableau de li pour diminuer le nombre de lignes
    for(i=0; i<ott.length; i++)
    {
        //On ajoute le textNode au li; et le li au ul
        lli = document.createTextNode(ott[i]);
        li = document.createElement("li");
        li.appendChild(lli);
        ul.appendChild(li);
    }
    //Puis on ajoute le tout au body
    document.getElementsByTagName("body")[0].appendChild(ul);

}



