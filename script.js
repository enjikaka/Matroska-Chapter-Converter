function timeAdd(t,d) {
	t = t.split(":");
	var h = t[0],m = t[1],s = t[2];
	if (h.substring(0, 1) == "0") { h = h.substring(1, 2); }
	if (m.substring(0, 1) == "0") { m = m.substring(1, 2); }
	if (s.substring(0, 1) == "0") { s = s.substring(1, 2); }
	h = parseInt(h);
	m = parseInt(m);
	s = parseInt(s);
	s += parseInt(d);
	if (s >= 60) {
		s -= 60;
		m += 1;
	}
	if (m >= 60) {
		m -= 60;
		h += 1;
	}
	s = s >= 10 ? s : '0' + s;
	m = m >= 10 ? m : '0' + m;
	h = h >= 10 ? h : '0' + h;
	return h + ':' + m + ':' + s;
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
		if (i != atom.length - 1) {
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
document.getElementsByTagName('form')[0].addEventListener('submit',function(e) {
	e.preventDefault();
},false);