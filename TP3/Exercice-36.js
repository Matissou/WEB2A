window.onload = function(){
    let tableau = document.getElementById('T-1')
    let nbHeaders = tableau.getElementsByTagName('th').length

    let arrH = new Array()
    for(i=0; i<nbHeaders; i++)
    {
        let h = document.getElementsByTagName('th')[i]
        h.addEventListener("click",sortColumn(i))
        
        
    }


}
    