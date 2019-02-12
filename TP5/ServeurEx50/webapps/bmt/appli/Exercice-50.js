/* Base URL of the web-service for the current user */
var wsBase = '/bmt/rossolo-landaism/'
/* Shows the identity of the current user */ 
function setIdentity() {
	//TODO 1
}

/* Sets the height of <div id="#contents"> to benefit from all the remaining place on the page */
function setContentHeight() {
	$("#contents").css("height", "-webkit-fill-available")
}


/* Selects a new object type : either "bookmarks" or "tags" */
function selectObjectType(type) {
	// TODO 3
}


/* Loads the list of all bookmarks and displays them */
function listBookmarks() {
	//Vider div id=items
	$("#items").empty()
	var jqxhr = $.get( wsBase+"bookmarks")
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
		/* .always(function() {
		  alert( "finished" );
		}) */


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
