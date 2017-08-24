// Variables
giphyObj = {
    topics: [
    	"Gorillaz", 
    	"Rolling Stones",
    	"311",
    	"Coldplay", 
    	"The Beatles", 
    	"Rush", 
    	"AC/DC", 
    	"The Who",
    	"Led Zeppelin", 
    	"Aerosmith",
    	"Mastadon",
    	"Bob Marley"
    	],
	 
    // Functions
    buildButtons: function() {

        // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
        
        // Figure out what id I need to target
        $('#buttonsView').empty();
        // Loops through the array of movies
        for (var i = 0; i < this.topics.length; i++) {
        	console.log("This is the topics object: " + this.topics);

            // Then dynamicaly generates buttons for each movie in the array
            var buildButton = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            buildButton.attr('class', 'col s6 m3 l2 waves-effect waves-light btn orange darken-1 z-depth-3 star'); // Added a class 
            buildButton.attr('data-name', this.topics[i]); // Added a data-attribute
            buildButton.text(this.topics[i]); // Provided the initial button text
            console.log("the button element: " + JSON.stringify(buildButton));

            // append the div to buttonsview
            $('#buttonsView').append(buildButton);
        }
    },

    displayStarInfo: function() {
    	// API DATA
    	var star = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + star + "&api_key=dc6zaTOxFJmzC&limit=12";

        // Ajax call that pulls the data from the api
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
            	// Logs entire response
                console.log("This is the API response: " + JSON.stringify(response));

            	//Sets the variable results = the entire data set coming from the API
            	var results = response.data; 

            	// Empties the buttons view  before adding a new buttons
            	$('#gifsAppearHere').empty();

			    // using Underscore.js and template the image changes. 
			    var $gifs = $('#gifsAppearHere');
			    // Targeting the underscore template housed in the html
			    var $giphyTemplate = _.template($('#giphyTmpl').html());
			    // for each loop similar to that used in Star wars game
			    results.forEach(function(result) {
            		$gifs.prepend($giphyTemplate({result: result }));
        		});

			});
		}

}

// PAGE LOAD AND RUN FUNCTIONS
// ========================================================
$(document).ready(function() {	

// This function handles events where one button is clicked
	$('#addStar').on('click', function() {
	
	    // This line of code will grab the input from the textbox
	    var star = $('#star-input').val().trim();
	    console.log("The input typed: " + star);
	    // the star chosen is pushed to the topics array
	    giphyObj.topics.push(star);

	    // This function puts the button just created on the page
	    giphyObj.buildButtons();

	    return false;
	});

	// DISPLAY THE STAR INFO ON THE PAGE AFTER USER CLICK

	// Generic function for displaying the star info
	$(document).on('click', '.star', giphyObj.displayStarInfo);
		console.log(this);
	
	// This handles the animation of the GIF. From the still state to the animate state depending on the current state
	$(document.body).on('click', '.card-image img', function() {
		console.log("Picture Click: " + this);
		
		
		var state = $(this).attr('data-state');
		// changes the state to animated
		if (state === 'still'){
			var animateUrl = $(this).attr('data-animate');
			$(this).attr('src', animateUrl);
			$(this).attr('data-state', 'animate');
			console.log(state);

		}
		// changes stage back to sill if currently animated
		else {
			var animateUrl = $(this).attr('data-still');
			$(this).attr('src', animateUrl);
			$(this).attr('data-state', 'still');
		}

	});

	// Final page empty and rebuild
	$('#buttonsView').empty();
	giphyObj.buildButtons();

});
