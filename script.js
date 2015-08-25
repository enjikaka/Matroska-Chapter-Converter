function timeAdd(timeString, additionalSeconds) {
	var time = timeString.split(":");
	var hours = time[0],
		minutes = time[1],
		seconds = time[2];

	if (hours.substring(0, 1) == "0") { 
		hours = hours.substring(1, 2); 
	}

	if (minutes.substring(0, 1) == "0") { 
		minutes = minutes.substring(1, 2); 
	}

	if (seconds.substring(0, 1) == "0") { 
		seconds = seconds.substring(1, 2); 
	}

	hours = parseInt(hours);
	minutes = parseInt(minutes);
	seconds = parseInt(seconds);
	seconds += parseInt(additionalSeconds);

	if (seconds >= 60) {
		seconds -= 60;
		minutes += 1;
	}

	if (minutes >= 60) {
		minutes -= 60;
		hours += 1;
	}

	seconds = seconds >= 10 ? seconds : '0' + seconds;
	minutes = minutes >= 10 ? minutes : '0' + minutes;
	hours = hours >= 10 ? hours : '0' + hours;

	return hours + ':' + minutes + ':' + seconds;
}

function convert(input) {
	// Load parser and convert string to parsable XML
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(input, "text/xml");
	var atom = xmlDoc.getElementsByTagName("ChapterAtom");
	var output = "";

	// If no number is specfied, default to 0
	var timeToShow = document.getElementById('time').value == '' ? 0 : document.getElementById('time').value;

	// Loop to get each chapter and adds info to output
	for (var i = 0; i < atom.length; i++) {
		output += parseInt(i + 1) + "\n";

		var startTime = atom[i].getElementsByTagName("ChapterTimeStart")[0].childNodes[0].nodeValue.split(".")[0];

		output += startTime + ",000 --> " + timeAdd(startTime,timeToShow) + ",000\n" 
		+ atom[i].getElementsByTagName("ChapterDisplay")[0].getElementsByTagName("ChapterString")[0].childNodes[0].nodeValue;

		if (i !== atom.length - 1) {
			output += "\n\n";
		}
	}

	return output;
}

// Returns a data-url with the content base64-encoded
function baseURL(input, mime) {
	return "data:" + mime + ";base64," + btoa(input);
}

// Click event for the makeButton
document.getElementById('makeButton').addEventListener('click', function() {
	var srt = convert(document.getElementById('input').value);
	document.getElementById('output').value = srt;

	// Set the href to the data-url for the content
	document.getElementById('downloadButton').setAttribute("href", baseURL(srt,"text/plain"));
	
	// Add downlaod attribute to element to be able to download onclick, suggested name included
	document.getElementById('downloadButton').setAttribute("download", new Date().getTime() + "_chapter.srt");
}, false);

// Prevent the form from updating page url with flags
document.getElementsByTagName('form')[0].addEventListener('submit', function(event) {
	event.preventDefault();
},false);