let url_data = 'assets/tips.mp3';
let con = new AudioContext();

export function load_sound() {
  var req = new XMLHttpRequest();
  req.open('GET', url_data, true);
  req.responseType = 'arraybuffer';
  req.onload = function () {
    con.decodeAudioData(req.response, function (buffer) {
      var source = con.createBufferSource();
      source.buffer = buffer;
      source.connect(con.destination);
      source.start(0);
    }, function (e) {
      console.info('错误');
    });
  };
  req.send();
}
