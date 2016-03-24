var URL = window.location.origin
console.log(URL);
console.log(window.location.href);

// determine if user is on KissAnime and on the anime's main episode page
if (window.location.href.indexOf("kissanime.to/") == -1) {
	alert("You are not currently on KissAnime.");
	//fake function to cause script to terminate
	AbortJavaScript();
} else if (window.location.href.indexOf("kissanime.to/Anime/") == -1) {
	alert("You are not on the Anime's main episode page.");
	//fake function to cause script to terminate
	AbortJavaScript();
}


var episodeLinks = $('table.listing a').map(function(i,el) { return $(el).attr('href')});
console.log('Found ' + episodeLinks.length + ' episode links on current page.')
if (episodeLinks === 0 || episodeLinks === null) {
	alert("There are no episode links on this page.")
	//fake function to cause script to terminate
	AbortJavaScript();
}

$.ajaxSetup({async:false});
$.getScript("https://kissanime.to/Scripts/asp.js");

var startEpisode; 
do {
	startEpisode = prompt("Enter episode number you want to start from:");
	if (startEpisode === null) {
		throw new Error("Script cancelled by user!");
	}
	startEpisode = Number(startEpisode);
	if (startEpisode <= 0 || startEpisode > episodeLinks.length) {
		alert("Episode number must be greater than 0 and less than " + episodeLinks.length); 
	} else {
		break; 
	}
} while(true); 
console.log('Starting episode: ' + startEpisode)

var endEpisode; 
do {
	endEpisode = prompt("Enter episode number you want to end at:");
	if (endEpisode === null) {
		throw new Error("Script cancelled by user!");
	}
	endEpisode = Number(endEpisode);
	if (endEpisode <= 0 || endEpisode > episodeLinks.length || endEpisode < startEpisode) {
		alert("Episode number must be greater than 0 and less than " + episodeLinks.length);
	} else {
		break;
	}
} while(true); 
console.log('Ending episode: ' + endEpisode)

var videoQuality = prompt("Enter video quality you want to download. Leave blank for default (1280x720.mp4)"); 
//set preferred quality (will choose the best available if not an option)
if (videoQuality === null || videoQuality == '') {
	videoQuality = '1280x720.mp4';
}

var i;
var long_url;
var newLinks = '';
var c = startEpisode;
var ajx = '';
for (i = (episodeLinks.length - startEpisode); i >= (episodeLinks.length - endEpisode); i--) {
	jQuery.ajax({
        url:    URL + episodeLinks[i], 
        success: function(result) {
        	var $result = eval($(result));
		var stringStart = result.search("divDownload"); 
		var stringEnd = result.search("document.write"); 
		var javascriptToExecute = result.substring(stringStart, stringEnd);
		eval(javascriptToExecute);
			
			$("body").append('<div id="episode' + i + '" style="display: none;"></div>')
			$('#episode' + i).append(wra); 
			
			var downloadQualityOptions = $('#episode' + i + ' a').map(function(i,el) { return $(el); });
			var j; 
			var qualityFound = false;
			for (j = 0; j < downloadQualityOptions.length; j++) {
				if (videoQuality === downloadQualityOptions[j].html()) {
					long_url = downloadQualityOptions[j].attr('href');
					qualityFound = true;
				} 
			}
			//if preferred quality is not found, defaults to highest quality
			if (qualityFound == false){
				videoQuality = downloadQualityOptions[0].html();
				long_url = downloadQualityOptions[0].attr('href');
			}
			console.log(c);
			newLinks = newLinks + '<a href="' + long_url + '">Episode ' + c + ' (' + videoQuality + ')</a><br></br>\n';
			c++
        },
        async:   false,
        script:  true
    });
}

var newPageText = 'Use an addon like DownThemAll! to download the episodes on this page at once. '
newPageText += 'To download them individually, right click the link and choose Save As. <br></br>'
newPageText += 'NOTE: If watching episodes from this list, open them in a new tab as you will not be able to come back.<br></br>'
newPageText += ajx
newPageText += newLinks

var newPage = window.open();
newPage.document.body.innerHTML = newPageText
