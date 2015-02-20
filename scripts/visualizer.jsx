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
          <img id="source" src="../css/images/something.png" width="300" height="227" />
        </div>
        <audio src="shinee-everybody.mp3" autoPlay ></audio>
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

  init: function() {
    this.doAudioSetup();
    var myAudio = document.querySelector('audio');
    source = this.audioCtx.createMediaElementSource(myAudio);
    source.connect(this.analyser);
    this.doCanvasSetup();
    // this.draw();
    this.drawEDC();
    source.connect(this.audioCtx.destination);
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

  streamSuccess: function(stream) {
    this.doAudioSetup();
    var source = this.audioCtx.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.doCanvasSetup();
    this.draw();
    // this.drawEDC();
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

    this.gradient = this.canvasCtx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 50, WIDTH / 2, HEIGHT / 2, 300);
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

  drawEDC: function() {
    this.analyser.getByteFrequencyData(this.dataArray);
    requestAnimationFrame(this.drawEDC);
    this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    // set background
    // this.canvasCtx.fillStyle = '#000';
    // this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

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
    // for(var i = 1; i < this.bars.length + 1; i++) {
    //     this.canvasCtx.fillRect(WIDTH / 2 + (i * this.barWidth * 2) - 1 + 150, HEIGHT / 2 - 1, this.barWidth, this.bars[i]);  
    //     this.canvasCtx.fillRect(WIDTH / 2 + (-i * this.barWidth * 2) - 1 - 150, HEIGHT / 2 - 1, this.barWidth, this.bars[i]);  
    //     this.canvasCtx.fillRect(WIDTH / 2 + (i * this.barWidth * 2) - 1 + 150, HEIGHT / 2 - 1, this.barWidth, -this.bars[i]);  
    //     this.canvasCtx.fillRect(WIDTH / 2 + (-i * this.barWidth * 2) - 1 - 150, HEIGHT / 2 - 1, this.barWidth, -this.bars[i]);  
    // }
    
    var radgrad = this.canvasCtx.createRadialGradient(WIDTH/2, HEIGHT /2,50,WIDTH/2, HEIGHT/2,132);
    radgrad.addColorStop(0, 'rgba(62, 68, 120,1)');
    if(sum < 18000) {
      radgrad.addColorStop(1, 'rgba(62, 68, 120,1)');
    } else {
      radgrad.addColorStop(1, 'rgba(189, 195, 247,1)');
    }
    this.canvasCtx.beginPath();
    // circle around logo
    this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130, 0, 2*Math.PI, false);
    this.canvasCtx.lineWidth = 10;

    // this.canvasCtx.closePath();
    // radials light shows
    // this.canvasCtx.beginPath();
    this.canvasCtx.lineWidth = 5;
    // if(sum > 45500) {
      // this.canvasCtx.strokeStyle = this.gradient;
    // } else {
      this.canvasCtx.strokeStyle = radgrad;
      this.canvasCtx.stroke();
      // (b-a)(x-min)/(max - min) + a
      // (1.6 - 0.4)(bars[i] - 0.4)
    // }
    for(var i = 1; i < this.bars.length + 1; i++) {
      this.canvasCtx.beginPath();
      // this.canvasCtx.arc(WIDTH / 2 , HEIGHT / 2, 150 + this.bars[i], 1.6*Math.PI, 0.4*Math.PI, false);  
      this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 150 + this.bars[i], 0, 2*Math.PI, false);  
      this.canvasCtx.stroke();
      
    }
    this.canvasCtx.beginPath();
    this.canvasCtx.strokeStyle = '#000';
    this.canvasCtx.moveTo(0, 0);
    this.canvasCtx.lineTo(WIDTH *4/10 - 40, HEIGHT *4/10 - 20);
    this.canvasCtx.moveTo(WIDTH *6/10 + 40, HEIGHT *6/10 + 20);
    this.canvasCtx.lineTo(WIDTH, HEIGHT);
    this.canvasCtx.lineWidth = 50;

    // this.canvasCtx.closePath();
    this.canvasCtx.stroke();
    // bottom bar
    // this.canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, this.barWidth, volume);
    // top bar
    // this.canvasCtx.fillRect(WIDTH / 2 - 12, HEIGHT / 2 - 1, 25, -volume);
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