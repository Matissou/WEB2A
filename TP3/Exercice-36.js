const valeurCellule = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;    
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(valeurCellule(asc ? a : b, idx), valeurCellule(asc ? b : a, idx));

window.onload = function(){
    let ecouteurs = document.querySelectorAll('th').forEach(th => th.addEventListener('click',function(){sortColumnH(th);},false));
}

function sortColumnH(th)
{
    const table = th.closest('table');  
    var delF = [].slice.call(table.querySelectorAll('tr:nth-child(n+1)'),1);
    let ligneParente = Array.from(th.parentNode.children).indexOf(th)
    
    let tri = Array.from(delF).sort(comparer(ligneParente, this.asc = !this.asc))
    tri.forEach(tr => table.appendChild(tr) );
}