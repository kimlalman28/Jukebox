var track1 = document.getElementById('song0');
var track2 = document.getElementById('song1');
var track3 = document.getElementById('song2');
var track4 = document.getElementById('song3');
var songs =  [track1, track2, track3, track4];
var songTitles = ["Kiss the Sky", "Follow Your Dreams", "Space Outro", "Hachiko the Faithful Dog"];
update();

$(document).ready(
	document.getElementById('songname').innerText = "Now Playing: " + songTitles[0]

); //when page loads, title of first song is shown on page since it is the first song to be loaded


function Jukebox(playlist){ 
	var i = 0;
	this.playlist = playlist; //sets this.playlist equal to passed in songs array
	this.nowPlaying = this.playlist[0]; //sets the first song to be played when page is loaded
	this.play = function(){ //method to play song
		this.nowPlaying.play();
	}
	this.pause = function(){ //method to pause song
		this.nowPlaying.pause();
	}
	this.stop = function(){ //method to stop song
		this.nowPlaying.pause();
		this.nowPlaying.currentTime = 0;
	}
	this.next = function(){ //method when user wants to go to next song
		++i; //song incrementor
		if(i>=this.playlist.length){
			 return
		} //returns when the user goes to next song when there is no next song
		else{	
		this.nowPlaying = this.playlist[i];
		document.getElementById('songname').innerText = "Now Playing: " + songTitles[i]
		} //loads up the next song
	}
	this.selection = function(song){ //method when user clicks on a song from the playlist to play
		i = song; //when the user selects a song and clicks next, the next song after the currently loaded one is next
		this.stop();
		this.nowPlaying = this.playlist[song];
		document.getElementById('songname').innerText = "Now Playing: " + songTitles[song]
	}
	this.spotify = function(song){ //method when user searches a song 
		this.stop()
		this.nowPlaying = song;
	}
}	
	

var myJukebox = new Jukebox(songs); //creates a object jukebox

		

document.getElementById('play').addEventListener("click", function(e){ //event listener for play button
	myJukebox.play();
})
document.getElementById('pause').addEventListener("click", function(e){ //event listener for pause button
	myJukebox.pause();
})
document.getElementById('stop').addEventListener("click", function(e){ //event listener for stop button
	myJukebox.stop();
})
document.getElementById('next').addEventListener("click", function(e){ //event listener for next button
	myJukebox.stop(); 
	myJukebox.next();
})



document.querySelector("form").addEventListener("submit", function(e){ //event listener for submit button
	e.preventDefault()
	var track = document.querySelector("input").value 
	

	$.ajax({
		url: "https://api.spotify.com/v1/search",
		data: {
			q: track,
			type: "track"
		},

		success: function(response){
			var songitem = response.tracks.items[0].preview_url; 
			var songtitle = response.tracks.items[0].name
			document.getElementById('songname').innerText = "Now Playing: " + songtitle; //update now playing title

			$("#playlist").append('<li id='+songs.length+'>'+songtitle+'</li>'); //add song to playlist list on page

			var newsong = document.createElement('audio'); //add an audio element 
			newsong.setAttribute('src', songitem) //add src for new audio element
			newsong.id = "song"+songs.length; //set a new/different id for the new audio element 
			songs.push(newsong); //add song to songs array
			songTitles.push(songtitle); //add title to title array
			update(); //update event listen for when the user clicks on a song in the playlist to play
			myJukebox.spotify(newsong); 
			
}

		
	})
})

function update(){ //function to add a click even to each new loaded song in the playlist
var lists = document.getElementsByTagName("li");
		for(var i=0; i<songs.length; i++){
		lists[i].addEventListener("click", function(e){
		myJukebox.selection(this.id);
	})
}
}