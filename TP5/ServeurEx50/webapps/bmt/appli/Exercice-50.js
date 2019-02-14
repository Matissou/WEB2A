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
		.fail(function() {
		  alert( "Error : unable to get boomarks" );
		})
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
		
	}).fail(function(){
		alert( "Error : unable to get tags" );
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
		let tag = JSON.stringify({name: inputVal });
		$.post(wsBase+'tags', {json:tag})
		.fail("Unable to add tag")
		.done(listTags)
	}
}

function addBookmark()
{
	//get input text
	let titre = $('#add .bookmark #titleBM').val()
	let desc = $('#add .bookmark #descBM').val()
	let lien = $('#add .bookmark #linkBM').val()
	console.log(titre)
	console.log(desc)
	console.log(lien)
	if(titre =="" || desc == "" || lien=="")
	{ 
		alert("Un des paramètres n'est pas correct")
	}else{
		//TODO : ajouter les tags 
		//let tag = JSON.stringify({id: 1, title: titre, description: desc, link:lien });
	//	$.post(wsBase+'bookmarks', {json:tag}).always(listBookmarks())
		console.log(wsBase)
		let tag = {title:"HTML oui", "description":"", "link":"http://www.w3schools.com/html/", "tags":[{"id":38, "name":"HTML"}]}
		$.post(wsBase+'bookmarks', {json:tag}).success(alert("bonjour"))
		listBookmarks()

	}			
}

function removeBookmark()
{
	



	
}

function clickBookmark()
{
	//TODO : de façon analogue à removeTag
	//TODO : voir s'il est possible de factoriser
}

function modifyBookmark()
{

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
	.fail("Unable to modify tag")
	.done(listTags)
}

/* Removes a tag */
function removeTag() {
	let tid = $(".tag.item.selected").attr("num")
	//Supprimer le tag 
	$.ajax({
		url:wsBase+"tags/"+tid+"?x-http-method=delete",
		type:"DELETE"
	}).always(listTags())	
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
	$(document).on('click', '#items .item.bookmark', clickBookmark)

})

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
