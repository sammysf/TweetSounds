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

// Note class
function Note(pitch) {
	this.pitch = pitch;
	this.counter = 0;
	this.notes = new Array();
	this.notesCount = 10;
	for (i = 0; i < this.notesCount; i++) {
		this.notes[i] = new Audio('/static/notes/' + this.pitch + '.wav');
	}
	this.playMe = function() {
		this.notes[this.counter].play();
		this.counter = (this.counter + 1) % this.notesCount;
	};
}
var C1, D, E, G, A, C2;
var zIndex = 5;

// Pop up a new bubble, accompanied with a sound
function makeBubble(msg) {
	var x = Math.random() * (window.innerWidth-100);  // Set random coordinates for bubble
	var y = Math.random() * (window.innerHeight-100);
	var className = msg.hasOwnProperty("retweeted_status") ? "retweet-bubble" : "tweet-bubble"
	var html =  "<div class=\"" + className + "\" style=\"left:" + x + "; top:" + y + "\">" +
					"<a href=\"http://twitter.com/" + msg.user.screen_name + "/statuses/" + msg.id_str + "\">" + 
						"<span class=\"handle\">" +
							"@" + msg.user.screen_name +
						"</span>" + 
					"</a>" + 
		   		"</div>";				
	var $bubble = $(html);
	$("#tweet-spot").append($bubble);                  // Add bubble to DOM
	$bubble.css("z-index", zIndex);
	zIndex += 1;
	$bubble.animate({width: "100px", height: "100px", left: x-10 + "px", top: y-10 + "px"}, 250);
	$bubble.find('.handle').animate({opacity: 0}, 3000);    // Fade out handle (3s)

	$bubble.animate({opacity: 0}, 20000,  function() { // Fade out bubble (20s) 
		$(this).remove(); 
		zIndex -= 1;
	});

	// Add bubble hover functions
	$bubble.hover(
		function() {
			$(this).find('.handle').stop().css({opacity: "1"});
			$(this).stop().css({opacity: "1"});
			zIndex += 1;
			$(this).css("z-index", zIndex);
		},
		function() {
			$(this).find('.handle').animate({opacity: 0}, 1000); // Fade out handle (3s)
			$(this).animate({opacity: 0}, 20000,  function() {       // Fade out bubble (20s) 
				$(this).remove(); 
			});
		}
	);

	// Play note
	var note = Math.floor(Math.random() * 6);
	switch(note) {
		case 0:
			C1.playMe();
			break;
		case 1:
			D.playMe();
			break;
		case 2:
			E.playMe();
			break;
		case 3:
			G.playMe();
			break;
		case 4:
			A.playMe();
			break;
		case 5:
			C2.playMe();
			break;
	}
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
	C1 = new Note('C1');
	D = new Note('D');
	E = new Note('E');
	G = new Note('G');
	A = new Note('A');
	C2 = new Note('C2');
});