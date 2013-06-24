function run() {
			var text = document.getElementById('input').value;
			var out = document.getElementById('output');
			out.value = '';
			var parser = new DOMParser();
			xmlDoc=parser.parseFromString(text,"text/xml");
			x = xmlDoc.getElementsByTagName("ChapterAtom");
			for (var i = 0;i < x.length; i++) {
				out.value += parseInt(i+1) + "\n";
				var startTime = x[i].getElementsByTagName("ChapterTimeStart")[0].childNodes[0].nodeValue.split(".")[0];
				out.value += startTime + ",000 --> " + timeAdd(startTime,document.getElementById('time').value) + ",000\n" 
				+ x[i].getElementsByTagName("ChapterDisplay")[0].getElementsByTagName("ChapterString")[0].childNodes[0].nodeValue;
				if (i!=x.length-1) {
					out.value += "\n\n";
				}
			}
		}

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
		
		function save() {
			localStorage.saved = document.getElementById('input').value;
		}

		function download() {
			var out = document.getElementById('output').value;
			if (out == '')  {
				alert('Click on "Make SRT-file" first! :)');
				return;
			}
			window.open('dump.php?c=' + encodeURIComponent(document.getElementById('output').value), 'newDoc');
		}

		window.onload = function() {
			var sav = localStorage.saved;
			if (sav != null && sav != '') {
				document.getElementById('input').value = sav;
			}
		};