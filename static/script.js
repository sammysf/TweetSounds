var source = new EventSource('/stream');

// source.addEventListener('message', function(e) {
// 	makeBubble(e.data);
// });

source.addEventListener('open', function(e) {
	// Connection was opened.
	console.log(e);
});

source.addEventListener('error', function(e) {
	// if (e.readyState == EventSource.CLOSED)
		// Connection was closed.
		console.log("Closed");
		console.log(e);
		e.target.close();
});

function makeBubble(name) {
	var x = Math.random() * (window.innerWidth-100);  // Set random coordinates for bubble
	var y = Math.random() * (window.innerHeight-100);
	var html = "<div class=\"tweet-bubble\" style=\"left:" + x + "; top:" + y + "\">" + 
						"<span class=\"handle\">" +
							"@" + name +
						"</span>" + 
			   "</div>";
	var $bubble = $(html);
	$("#tweet-spot").append($bubble);                  // Add bubble to DOM
	$bubble.children('.handle').animate({opacity: 0}, 3000);    // Fade out handle (3s)
	$bubble.animate({opacity: 0}, 20000,  function() { // Fade out bubble (20s) 
		$(this).remove(); 
	});

	// Add bubble hover functions
	$bubble.hover(
		function() {
			$(this).children('.handle').stop().css({opacity: "1"});
			$(this).stop().css({opacity: "1"});
		},
		function() {
			$(this).children('.handle').animate({opacity: 0}, 1000); // Fade out handle (3s)
			$(this).animate({opacity: 0}, 20000,  function() {       // Fade out bubble (20s) 
				$(this).remove(); 
			});
		}
	);
}

// Fade the query
$(document).ready(function() {
	$("#query").delay(1000).fadeOut(1000, function() {
		source.addEventListener('message', function(e) {
			makeBubble(e.data);
		});
	});
});