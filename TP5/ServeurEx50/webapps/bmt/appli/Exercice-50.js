/* Base URL of the web-service for the current user */
var wsBase = '/bmt/rossolo-landaism/'
/* Shows the identity of the current user */ 
function setIdentity() {
	//On split avec le slash et on récupère le deuxième élément qui est le pseudo (rossolo-landaism)
	$('h1 .identity').text(wsBase.split("/")[2])
}	

/* Sets the height of <div id="#contents"> to benefit from all the remaining place on the page */
function setContentHeight() {
	$("#contents").css("height", "-webkit-fill-available")
}

/* Loads the list of all tags and displays them */
function listTags() {
	//TO FINISH ! 
	//vider items de son eventuel contenu
	$('#items').empty()

	var url = wsBase+"tags"

	$.get(url,function(data){
		$(data).each(function(){
		
			//clone model tag
			let modelTag = $('div .model.tag')
			let theclone = modelTag.clone()
			//remplacer le text du h2
			theclone.find('h2').text(this.name)
			//ajouter l'attribut num au div du tag
			theclone.attr('num', this.id)
			theclone.removeClass('model').addClass('item')
			$('#items').append(theclone)
		})
		
	})
	.fail(function(xhr, status, err){
		console.error("Unable to get tags !")
		displayError(xhr, status, err)
	})
	
}

/* Adds a new tag */
function addTag() {
	//get input text
	let inputVal = $('#add .tag input').val()
	if(inputVal=="")
	{
		alert("La chaîne est vide")
	}else{
		//On parse le tag en JSON et on fait un post
		let tag = JSON.stringify({name: inputVal });
		$.post(wsBase+'tags', {json:tag})
		.fail(function(xhr, status, err){
			console.error("Unable to add tag !")
			displayError(xhr, status, err)
		})
		.done(listTags)
	}
}


/* Handles the click on a tag */
function clickTag() {
	//ne rien faire si le tag est deja selectionné
	if(!($(this).hasClass('selected')))
	{
		//On enleve la selection de l'ancien element selectionné
		let oldSelected = $('#items .item.tag.selected')
		oldSelected.removeClass('selected')
		h2Hidden = oldSelected.find('h2').clone()
		oldSelected.empty()
		oldSelected.append(h2Hidden.show())
	
		//Voir les règles du TP. On veut afficher les items
		// de l'ancien tag (maintenant non selectionné) et cacher ceux de celui selectionné
		$(this).addClass('selected')
		$(this).find('h2').hide()
		let oldName = $(this).find('h2').text()
		$(this).append("<input type=\"text\" id=\"modifiedInputTag\" value=\""+oldName+"\">")
		$(this).append("<input type=\"button\" id=\"modifyTag\" value=\"Modify name\">")
		$('#modifyTag').click(function(){modifyTag();})
		$(this).append("<input type=\"button\" id=\"removeTag\" value=\"Remove tag\">")
		$('#removeTag').click(function(){removeTag();})
	}
}

function clickBookmark()
{

	//ne rien faire si le tag est deja selectionné
	if(!($(this).hasClass('selected')))
	{
		//On sauvegarde les 
		let oldSelected = $('#items .item.bookmark.selected')
		oldSelected.removeClass('selected')
		//On les sauvegarde pour les ajouter ensuite
		h2Hidden = oldSelected.find('h2').clone()
		descHidden = oldSelected.find('.description').clone()
		lienHidden = oldSelected.find('a').clone()
		tagsHidden = oldSelected.find('ul').clone()

		// On les rajoute
		oldSelected.empty()
		oldSelected.append(h2Hidden.show())
		oldSelected.append(descHidden.show())
		oldSelected.append(lienHidden.show())
		oldSelected.append(tagsHidden.show())

		//Puis on selectionne celui qui a trigger le bouton
		$(this).addClass('selected')
		let h2 =$(this).find('h2')
		h2.hide()
		let desc = $(this).find('.description')
		desc.hide()
		let lien = $(this).find('a')
		lien.hide()
		let tags = $(this).find('ul')
		tags.hide()
		//TODO : recupérer le style initial, ou alors le faire à la main (css())

		//User can change the input values
		$(this).append("<input type=\"text\" id=\"modifiedTitleBM\" value=\""+h2.text()+"\">")
		$(this).append("<input type=\"text\" id=\"modifiedDescBM\" value=\""+desc.text()+"\">")
		$(this).append("<input type=\"text\" id=\"modifiedLinkBM\" value=\""+lien.text()+"\">")
		$(this).append("<input type=\"button\" id=\"modifyBookmark\" value=\"Modify bookmark\">")
		$('#modifyBookmark').click(function(){modifyBookmark();})
		$(this).append("<input type=\"button\" id=\"removeBookmark\" value=\"Remove bookmark\">")
		$('#removeBookmark').click(function(){removeBookmark();})

	
	//First, get tags available
	$.get( wsBase+"tags")
		.done(function(json){
			if(json ==""){
				//If no tag found, nothing to do
				return
			}else{ //Create selector for tags
				$(".bookmark.item.selected").append("<h4>Tags </h4>")
				//Ajout des tags dans les checkbox 
				$(json).each(function () { 
					$(".bookmark.item.selected").append("<input type=\"checkbox\" id="+this.id +" name="+this.name+"><label for="+this.id+">"+this.name+"</label>")
				 })
			}
		})
		.fail(function(xhr, status, err){
			console.error("Unable to get bookmarks !")
			displayError(xhr, status, err)
		})
	}	
}


function modifyBookmark()
{
	//On récupère les inputs sur les champs
	let tags = []
	let newTitle = $('#modifiedTitleBM').val()
	let newDesc = $('#modifiedDescBM').val()
	let newLink = $('#modifiedLinkBM').val()
	
	//Puis les checkbox (les tags que l'on veux add/suppr)
	let bid = $('.bookmark.item.selected').attr("num")	 
	let checkBox = $('.bookmark.item.selected input[type="checkbox"]')
	
	//Pour chaque bookmark checked, on l'ajoute au tableau
	checkBox.each(function(){
		console.log(this)
		if($(this).attr('checked')){
			id = $(this).attr('id')
			name = $(this).attr('name')
			tags.push({"id":id, "name":name})
		}
	});
	
	//Le nouvel objet JSON. On fait un put dessus pour procéder à une modification
	let newBM = JSON.stringify({"id":bid, "title":newTitle, "description":newDesc, "link":newLink, "tags":tags})
	$.ajax({
		url: wsBase+"bookmarks/"+bid,
		type:"PUT",
		data: {json:newBM}
	}).fail(function(xhr,status,err){
		console.error("Unable to modify bookmark ! ")
		displayError(xhr,status,err)
	})
	.done(listBookmarks)


}

function addBookmark()
{
	//get input text
	let titre = $('#add .bookmark #titleBM').val()
	let desc = $('#add .bookmark #descBM').val()
	let lien = $('#add .bookmark #linkBM').val()
	let checkBox = $('.bookmark.selected input[type="checkbox"]')
	tags=[]
	//De la même façon que modify, on utilise les checkbox cochées pour le post des tags et du bookmark
	checkBox.each(function(){
		console.log(this)
		if($(this).attr('checked')){
			id = $(this).attr('id')
			name = $(this).attr('name')
			tags.push({"id":id, "name":name})
		}
	});
	
	if(titre =="" || desc == "" || lien=="")
	{ 
		alert("Un des paramètres n'est pas correct")
	}else{
		let bookmark = JSON.stringify({title:titre, "description":desc, "link":lien, "tags":tags})
		$.post(wsBase+'bookmarks', {json:bookmark})
		.done(listBookmarks)
		.fail(function(xhr, status, err){
			console.error("Unable to create bookmark !")
			displayError(xhr, status, err)
		})

	}		
	

		

}

function addCheckboxForBookmarks(){
	//First, get tags available
	$.get( wsBase+"tags")
		.done(function(json){
			if(json ==""){
				//If no tag found, nothing to do
				return
			}else{ //Create selector for tags
				buttonAddBkmrk = $("#addBookmark")
				//Ajout des tags dans les checkbox 
				$(json).each(function () { 
					buttonAddBkmrk.before("<label for=\""+this.name+"\">"+this.name+"</label>")
					buttonAddBkmrk.before("<input type=\"checkbox\" id="+this.id+" name="+this.name+">")
				 })
				buttonAddBkmrk.before('<br/>')
			}
		})
		.fail(function(xhr, status, err){
			console.error("Unable to get bookmarks !")
			displayError(xhr, status, err)
		})
}


/* Performs the modification of a tag */
function modifyTag() {
	
	let newname = $('#modifiedInputTag').val()
	let tid = $(".tag.item.selected").attr("num")
	let tag = JSON.stringify({ id: tid, name: newname})


	//Modification de l'ancien tag
	$.ajax({
	 	url:wsBase+"tags/"+tid,
		 type:"PUT",
		 data: {json:tag}
	})
	.fail(function(xhr, status, err){
		console.error("Unable to modify tag !")
		displayError(xhr, status, err)
	})
	.done(listTags)
}

/* Loads the list of all bookmarks and displays them */
function listBookmarks() {
	//Vider div id=items
	$("#items").empty()
	$.get( wsBase+"bookmarks")
		.done(function(json) {
			$(json).each(function(){
				var bkmrq = $(".model.bookmark").clone()
				bkmrq.find("h2").text(this.title)

				bkmrq.find("a").text(this.link).attr("href", this.link)

				bkmrq.find(".description").text(this.description)
				
				bkmrq.attr("num", this.id)
				bkmrq.removeClass("model")
				bkmrq.addClass("item")
				$(this.tags).each(function(){
					bkmrq.find(".tags").append("<li>"+this.name+"</li>")
				})

				$("#items").append(bkmrq)
			})
			
		})
		.fail(function(xhr, status, err){
			console.error("Unable to get bookmarks !")
			displayError(xhr, status, err)
		})
}

/* Removes a tag */
function removeTag() {
	let tagToDelete = $('.tag.item.selected h2').text()
	isUsed = 0
	//TODO : Test if tag is used by a bookmark
	$.get( wsBase+"bookmarks",function(data){
		$(data).each(function(){
				
				$(this.tags).each(function(){
					if(this.name==tagToDelete && isUsed!=1)
					{
						alert("Can't delete a tag used by a bookmark")
						isUsed=1;
						
					}
				})
			})
		})
		.fail(function(xhr, status, err){
			console.error("Unable to get bookmarks !")
			displayError(xhr, status, err)
		})
	if(! Boolean(isUsed))
	{
		let tid = $(".tag.item.selected").attr("num")
		//Supprimer le tag 
		$.ajax({
			url:wsBase+"tags/"+tid+"?x-http-method=delete"
		})
		.fail(function(xhr, status, err){
			console.error("Unable to remove tag !")
			displayError(xhr, status, err)
		})
		.done(listTags)
	}

} 


function removeBookmark()
{
	//On doit récupérer les valeurs du tag pour d'abord faire un put
	// pour éviter la contrainte sql sur les tags (mettre à vide) puis un delete
	// (erreur serveur donc on doit passer par xhttpmethod=delete)
	let bid = $(".bookmark.item.selected").attr("num")
	let newTitle = $('#modifiedTitleBM').val()
	let newDesc = $('#modifiedDescBM').val()
	let newLink = $('#modifiedLinkBM').val()
	
	let newBM = JSON.stringify({"id":bid, "title":newTitle, "description":newDesc, "link":newLink, "tags":[]})
	//Supprimer les tags correspondants pour eviter les erreur de database
	$.ajax({
		url:wsBase+"bookmarks/"+bid,
		type:"PUT",
		data: {json:newBM}
   })
   .fail(function(xhr, status, err){
	   console.error("Unable to remove bookmark's tag !")
	   displayError(xhr, status, err)
   })
   .done(//Ensuite supprimer le bookmark
		function(){
			$.ajax({
				url:wsBase+"bookmarks/"+bid+"?x-http-method=delete",
			})
			.fail(function(xhr, status, err){
				console.error("Unable to remove bookmark !")
				displayError(xhr, status, err)
			})
			.done(listBookmarks)
		}
	)
}



//Fonction that display errors on an alert
function displayError(req, status, err){
	alert("Sorry, an error occured : "+err)
}

/* On document loading */
$(function() {
	// Put the name of the current user into <h1>
	setIdentity()

	// Adapt the height of <div id="contents"> to the navigator window
	setContentHeight()
		
	
	// Listen to the clicks on menu items
	$('#menu li').on('click', function() {
		var isTags = $(this).hasClass('tags')
		selectObjectType(isTags ? "tags" : "bookmarks")
	})

	// Initialize the object type to "bookmarks"
	selectObjectType("bookmarks")

	// Listen to clicks on the "add tag" button
	$('#addTag').on('click', addTag)
	$('#addBookmark').on('click', addBookmark)
	
	// Listen to clicks on the tag items
	$(document).on('click','#items .item.tag',clickTag)
	$(document).on('click', '#items .bookmark', clickBookmark)
	
	addCheckboxForBookmarks()
	populateDatabase()

})

function populateDatabase()
{
	//Création de 3 tags basiques 
	titleAr = ["Jquery Doc", "Capitalisme", "Facebook"]
	descAr = ["Documentation de Jquery", "Site du capitalisme", "Un site remarquable"]
	lienAr = ["jquery.org", "google.com", "facebook.com"]
	if($(".bookmark.item a").first().text()!="")
	{
		for(var i=0; i<titleAr.length; i++)
		{
			let bookmark = JSON.stringify({title:titleAr[i], "description":descAr[i], "link":lienAr[i], "tags":[]})
			$.post(wsBase+'bookmarks', {json:bookmark})
			.done(listBookmarks)
		}
	
		titleAr = null
		descAr = null
		lienAr = null
	}
}

/* Selects a new object type : either "bookmarks" or "tags" */
function selectObjectType(type) {

	//Type couramment affiché (selected)
	typeDefault = $("#menu li.selected");
	//Si le type demandé est différent du type courant
	if(!(type==typeDefault.text()))
	{
		//Mettre le type courant à vide
		typeDefault.removeClass("selected")
		//et on ajoute la classe selected au type demandé
		$('#menu li.'+type).addClass("selected")
		
		//# : id, . : class
		switch (type) {
			case  "bookmarks":
				//appel de la fonction listBookmarks
				listBookmarks()
				// on ajoute la classe selected pour voir l'input
				$('#add .bookmark').addClass('selected')				
				//Enlever la class selected du div class tag
				$("#add .tag").removeClass('selected')
				break;
			case "tags":
				//sinon, le type demandé est tags 
				listTags()
				$("#add .tag").addClass('selected')
				//on enleve la classe selected de bookmark
				$("#add .bookmark").removeClass('selected')
				break;
		}
	}


}