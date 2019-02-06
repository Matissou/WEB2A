const valeurCellule = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;    
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(valeurCellule(asc ? a : b, idx), valeurCellule(asc ? b : a, idx));

window.onload = function(){
//    let ecouteurs = $('#T-1 thead th').on("click",function(      ){
//             sortColumnH($(this));
//         });

    let ecouteurs = $("#T-1 th").click({p1:$(this)},sortColumnH)

   //colorationNote();
}

function sortColumnH(event)
{   
    let th = event.data.p1
    var table = $("#T-1")
    var delF = [].slice.call($('#T-1 tr:nth-child(n+1)'),1);
    let ligneParente = th.cellIndex
    
    let tri = Array.from(delF).sort(comparer(ligneParente, this.asc = !this.asc))
    tri.forEach(tr => table.appendChild(tr) );
}

function colorationNote()
{
    //Parcourir les cellules et ajouter une des trois classes : vert orange ou rouge
    let tetes = document.querySelectorAll('th')
    let indexNoteS1
    for(var j = 0; j<tetes.length;j++)
    {
        if(tetes[j].innerHTML=="Note S1")
        {
            indexNoteS1=j
        }
    }

    let tableau = document.getElementById('T-1');
    let lignes = [].slice.call(tableau.getElementsByTagName('tr'),1)

    for(var i=0; i<lignes.length; i++)
    {
        let laNote = lignes[i].children[indexNoteS1]
        if(laNote.innerHTML<8)
        {
            laNote.setAttribute("class","inf8")
        }else if(laNote.innerHTML>=8 && laNote.innerHTML<=10)
        {
            laNote.setAttribute("class","eightToTen")   
        }else if(laNote.innerHTML>10 && laNote.innerHTML<=12){
            laNote.setAttribute("class","tenToTwelve")
        }else{
            laNote.setAttribute("class","supTwelve")
        }
    }
}