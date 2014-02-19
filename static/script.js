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
		// e.target.close();
});

function makeBubble(msg) {
	var x = Math.random() * (window.innerWidth-100);  // Set random coordinates for bubble
	var y = Math.random() * (window.innerHeight-100);
	var className = msg.hasOwnProperty("retweeted_status") ? "retweet-bubble" : "tweet-bubble"
	var html = "<div class=\"" + className + "\" style=\"left:" + x + "; top:" + y + "\">" + 
						"<span class=\"handle\">" +
							"@" + msg.user.screen_name +
						"</span>" + 
			   "</div>";
	var $bubble = $(html);
	$("#tweet-spot").append($bubble);                  // Add bubble to DOM
	$bubble.animate({width: "100px", height: "100px", left: x-10 + "px", top: y-10 + "px"}, 250);
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

	// Play note
	var note = Math.floor(Math.random() * 6);
	switch(note) {
		case 0:
			var note = new Audio('static/notes/C1.wav');
			break;
		case 1:
			var note = new Audio('static/notes/D.wav');
			break;
		case 2:
			var note = new Audio('static/notes/E.wav');
			break;
		case 3:
			var note = new Audio('static/notes/G.wav');
			break;
		case 4:
			var note = new Audio('static/notes/A.wav');
			break;
		case 5:
			var note = new Audio('static/notes/C2.wav');
			break;
	}
	note.play();
}

// Fade the query
$(document).ready(function() {
	$("#query").delay(1000).fadeOut(1000, function() {
		source.addEventListener('message', function(e) {
			var message = JSON.parse(e.data);
			console.log(message.user.screen_name + ": " + message.text);
			makeBubble(message);
		});
	});
});