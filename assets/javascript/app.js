
// create an array of strings related to a topic - save it to a varible called 'topics'
const topics = ['The Simpsons', 'Family Guy', 'Sponge Bob', 'Tom and Jerry', 'He-Man', 'King of the Hill'];




    // function that makes the AJAX call to the giphy API and returns the promise
    $('button').on("click", function() {
        
        // this referring to the button
        const cartoon = $(this).attr("data-name");
        const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8jPV5z6bDoDjBb7y6bUKdjZF9S0094FW&q=" + cartoon + "&limit=10&rating=PG&lang=en";
        
        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {    
                
                
                // storing the data from the AJAX request in the results variable
                const results = response.data;
                
                // Looping through each result item
                for (let i = 0; i < results.length; i++) {
                    
                    // Creating and storing a div tag
                    const cartoonDiv = $("<div>");
                    
                    // Creating a paragraph tag with the result item's rating
                    const p = $("<p>").text("Rating: " + results[i].rating);
                    
                    // Creating and storing an image tag
                    const cartoonImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    cartoonImage.attr("src", results[i].images.fixed_height.url);
                    
                    // Appending the paragraph and image tag to the CartoonlDiv
                    cartoonDiv.append(p);
                    cartoonDiv.append(cartoonImage);
                    
                    // Prependng the cartoonDiv to the HTML page in the "#cartoons-view" div
                    $("#cartoons-view").prepend(cartoonDiv);
                }
            })
        });
        

// click event - when the user clicks on an image it should begin its animation, if clicked again it 
// should stop its animation.

// create a for loop to create buttons for all of the strings in the array 'topics'
function renderButtons() {
    
    // Deleting the cartoons buttons prior to adding new cartoon buttons
    $("#buttons-view").empty();
    
    // Looping through the array of cartoons
    for (let i = 0; i < topics.length; i++) {
        
        // dynamicaly generating buttons for each cartoon in the array.
        const newButtons = $("<button>");
        // Adding a class
        newButtons.addClass("btn btn-dark");
        // Adding a data-attribute with a value of the cartoon at index i
        newButtons.attr("data-name", topics[i]);
        // Providing the button's text with a value of the cartoon at index i
        newButtons.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(newButtons);
    }
}


// add a form to the page - takes a value from the user input box and add it into the topics array (append)
$("#add-cartoon").on("click", function(event) {
    event.preventDefault();
    
    // This line grabs the input from the textbox
    const newCartoon = $("#cartoon-input").val().trim();
    
    // Adding the movie from the textbox to our array
    topics.push(newCartoon);
    
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});


// calling the function renderButtons
renderButtons();
