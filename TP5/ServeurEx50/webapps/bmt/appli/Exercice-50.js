/* Base URL of the web-service for the current user */
var wsBase = '/bmt/rossolo-landaism/'
/* Shows the identity of the current user */ 
function setIdentity() {
	//On split avec le slash et on récupère le deuxième élément qui est le pseudo (rossolo-landaism)
	$('h1 .identity').text(wsBase.split("/")[2])
}	

/* Sets the height of <div id="#contents"> to benefit from all the remaining place on the page */
function setContentHeight() {
	
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
				//Enlever la class selected du div class tag
				$("#add .tag").removeClass('selected')
				break;
			default:
				//sinon, le type demandé est tags 
				listTags()
				$("#add .tag").addClass('selected')
				break;
		}
	}	
}

/* Loads the list of all bookmarks and displays them */
function listBookmarks() {
	//TODO 4
}

/* Loads the list of all tags and displays them */
function listTags() {
	//TODO 5
}

/* Adds a new tag */
function addTag() {
	//TODO 6
}

/* Handles the click on a tag */
function clickTag() {
	//TODO 7
}

/* Performs the modification of a tag */
function modifyTag() {
	//TODO 8
}

/* Removes a tag */
function removeTag() {
	//TODO 9
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

	// Listen to clicks on the tag items
	$(document).on('click','#items .item.tag',clickTag)
})
