// create an array of strings related to a topic - save it to a varible called 'topics'
const topics = ['The Simpsons', 'Spongebob Squarepants', 'Ren and Stimpy', 'Teenage Mutant Ninja Turtles', 'Rick and Morty', 'King of the Hill', 'Adventure Time'];

// displayCartoons function re-renders the HTML to display the appropriate content
function displayCartoons() {

    const cartoon = $(this).attr("data-name");
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8jPV5z6bDoDjBb7y6bUKdjZF9S0094FW&q=" + cartoon + "&limit=10&rating=PG&lang=en";

    // Creating an AJAX call for the specific cartoons button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        const results = response.data;

        for (let i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            const cartoonDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            const p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            const cartoonImage = $("<img>");
            const still = response.data[i].images.fixed_height_still.url;
            const animated = response.data[i].images.fixed_height.url;
            cartoonImage.addClass('searchImage');
            cartoonImage.attr('src', still);
            cartoonImage.attr('data-still', still);
            cartoonImage.attr('data-animated', animated);
            cartoonImage.attr('data-state', still);

            // Appending the paragraph and image tag to the CartoonlDiv
            cartoonDiv.append(p);
            cartoonDiv.append(cartoonImage);

            // Prependng the cartoonDiv to the HTML page in the "#cartoons-view" div
            $("#cartoons-view").prepend(cartoonDiv);

        }
    });

}



// Click event that will cause the gif to start aninmation and stop animation when user clicks the image
$(document).on("click", '.searchImage', function () {

    const state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});



// Function for displaying the cartoon 
function renderButtons() {

    // Deleting the cartoons prior to adding new cartoons
    $("#buttons-view").empty();

    // Looping through the array of cartoons
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each cartoon in the array
        var a = $("<button>");
        // Adding a class of cartoon-btn to our button
        a.addClass("cartoon-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}



// This function handles events where a movie button is clicked
$("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    const cartoon = $("#cartoon-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(cartoon);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});



// Adding a click event listener to all elements with a class of "cartoon-btn"
$(document).on("click", ".cartoon-btn", displayCartoons);

// Calling the renderButtons function to display the intial buttons
renderButtons();


