var synth = window.speechSynthesis;
var voiceSelect = document.querySelector('select');
var voices = [];
var timer;

function populateVoiceList() {
	voices = synth.getVoices();
	var len = voices.length;
	for (i = 0; i < len; i++) {
		var option = document.createElement('option');
		option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
		if (voices[i].default) {
			option.textContent += ' -- default';
		}
		option.setAttribute('data-lang', voices[i].lang);
		option.setAttribute('data-name', voices[i].name);
		voiceSelect.appendChild(option);
	}
	if (timer && len > 0) {
		clearTimeout(timer);
		return false;
	}
	timer = setTimeout('populateVoiceList()', 20);
}
populateVoiceList();
var btn = document.getElementById('speak');
btn.onclick = function(evt) {
	var e = evt || event;
	e.preventDefault();
	synth.cancel();
	var txt = document.querySelector('.txt');
	var utterThis = new SpeechSynthesisUtterance(txt.value);
	var vol = document.querySelector('.vol');
	var rate = document.querySelector('.rate');
	var pitch = document.querySelector('.pitch');
	var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
	for (i = 0; i < voices.length; i++) {
		if (voices[i].name === selectedOption) {
			utterThis.voice = voices[i];
		}
	}
	utterThis.volume = vol.value;
	utterThis.rate = rate.value;
	utterThis.pitch = pitch.value;
	synth.speak(utterThis);
}