/* Ce code s'execute bien sur Google Chrome v 71.0 */
window.onload = function(){
    versionSimple();
    //versionPropre();
}


function versionSimple(){
        //Version facile 

        var one = document.createTextNode("One");
        var two = document.createTextNode("Two");
        var three = document.createTextNode("Three");
    
        var li1 = document.createElement("li");
        li1.appendChild(one);
    
        var li2 = document.createElement("li");
        li2.appendChild(two);
    
        var li3 = document.createElement("li");
        li3.setAttribute("class", "last");
        li3.appendChild(three);
    
        var ul = document.createElement("ul");
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
    
        test = document.getElementsByTagName("body")[0];
        test.appendChild(ul);
}


function versionPropre()
{
    //version plus compliqué 
    var ott = ["One", "Two", "Three"];
    var ul = document.createElement("ul");
    var lli;
    for(i=0; i<ott.length; i++)
    {
       // document.body.appendChild("p").appendChild(ott[i]);
        lli = document.createTextNode(ott[i]);
        li = document.createElement("li");
        li.appendChild(lli);
        ul.appendChild(li);
    }
    document.getElementsByTagName("body")[0].appendChild(ul);

}



