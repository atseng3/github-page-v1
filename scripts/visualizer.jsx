var APP = React.createClass({
  process: function() {
  },

  render: function() {
    this.process();
    return (
    	<div>
    		<SearchYoutube />
    		<div id="visualizer-icon">
          <Canvas />
        </div>
        <audio src="prayer-in-c.mp3" autoPlay ></audio>
    		<progress max="100" value="80"></progress>
    	</div>
    )
    // <audio src="last-ones-standing.mp3" autoPlay ></audio>
    // <audio src="prayer-in-c.mp3" autoPlay ></audio>
    // <audio src="shinee-everybody.mp3" autoPlay ></audio>
  }
});

var Canvas = React.createClass({

  componentDidMount: function() {
    this.init();
    // this.streamInit();
  },

  doAudioSetup: function() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.3;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  },

  doCanvasSetup: function() {
    var canvas = this.getDOMNode();
    this.canvasCtx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    this.gradient = this.canvasCtx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 30, WIDTH / 2, HEIGHT / 2, 150);
    this.gradient.addColorStop(0,'#000000');
    this.gradient.addColorStop(0.25,'#ff0000');
    this.gradient.addColorStop(0.75,'#ffff00');
    this.gradient.addColorStop(1,'#ffffff');

    this.barWidth = 10;
    this.bars = Array(50);
    this.delay = 100;

    var iteration = 0;
    var totalIterations = 100;
    var easingValue;
  },

  draw: function() {
    this.analyser.getByteFrequencyData(this.dataArray);
    requestAnimationFrame(this.draw);
    this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    // set background
    this.canvasCtx.fillStyle = '#000';
    this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    // get volume
    var sum = 5000;
    for(var i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    var volume = sum / this.bufferLength * 2;

    // set bars
    this.canvasCtx.fillStyle = this.gradient;
    var temp = volume;
    for(var i = 0; i < this.bars.length; i++) {
      temp *= 0.9;
      var that = this;
      (function( i, temp ) {
          setTimeout( function() {
              that.bars[ i ] = temp;
          }, that.delay * (i));
      })( i, temp );
    }
    for(var i = 1; i < this.bars.length + 1; i++) {
        this.canvasCtx.fillRect(WIDTH / 2 + (i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, this.bars[i]);  
        this.canvasCtx.fillRect(WIDTH / 2 + (-i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, this.bars[i]);  
        this.canvasCtx.fillRect(WIDTH / 2 + (i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, -this.bars[i]);  
        this.canvasCtx.fillRect(WIDTH / 2 + (-i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, -this.bars[i]);  
    }
    // bottom bar
    this.canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, this.barWidth, volume);
    // top bar
    this.canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, this.barWidth, -volume);
  },

  streamSuccess: function(stream) {
    this.doAudioSetup();
    var source = this.audioCtx.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.doCanvasSetup();
    this.draw();
  },

  streamInit: function() {
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // getUserMedia block - grab stream
    // put it into a MediaStreamAudioSourceNode
    // also output the visuals into a video element

    if (navigator.getUserMedia) {
      var that = this;
       navigator.getUserMedia (
          {
             audio: true,
             video: false
          }, 
          function(stream) {
            that.streamSuccess(stream);
          },
          function(err) {
            console.log('error');
          }
        );
     }
  },

  init: function() {
    this.doAudioSetup();
    var myAudio = document.querySelector('audio');
    source = this.audioCtx.createMediaElementSource(myAudio);
    source.connect(this.analyser);
    this.doCanvasSetup();
    this.draw();
    source.connect(this.audioCtx.destination);
  },

  render: function() {
    return <canvas id="myCanvas" height="450" width="900"></canvas>
  }

});

React.render(
  <APP />,
  document.getElementById('container')
);

// bass => 87.31 - 349.23
// baritone => 98 - 392
// tenor => 130 - 493.88
// contralto => 130.81 - 698.46
// soprano => 246.94 - 1174.7

// fft size = 1024, bin count = 512
// freq/bin = 43