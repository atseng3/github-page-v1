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
    // this.init();
    this.streamInit();
  },

  streamInit: function() {
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);

    // define other variables

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var myAudio = document.querySelector('audio');

    // getUserMedia block - grab stream
    // put it into a MediaStreamAudioSourceNode
    // also output the visuals into a video element

    if (navigator.getUserMedia) {
       navigator.getUserMedia (
          // constraints: audio and video for this app
          {
             audio: true,
             video: false
          },

          // Success callback
          function(stream) {

            var analyser = audioCtx.createAnalyser();
            analyser.fftSize = 1024;
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            analyser.smoothingTimeConstant = 0.3;
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);
            var source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            // setup --> canvas
            var canvas = document.getElementById('myCanvas');
            var canvasCtx = canvas.getContext('2d');
            WIDTH = canvas.width;
            HEIGHT = canvas.height;
            // setup --> bar colors
            var gradient = canvasCtx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 30, WIDTH / 2, HEIGHT / 2, 150);
            gradient.addColorStop(0,'#000000');
            gradient.addColorStop(0.25,'#ff0000');
            gradient.addColorStop(0.75,'#ffff00');
            gradient.addColorStop(1,'#ffffff');

            // setup --> misc
            // barWidth = WIDTH / bufferLength;
            barWidth = 10;
            var bars = Array(50);
            var delay = 100;

            var iteration = 0;
            var totalIterations = 100;
            var easingValue;
            draw = function() {
              analyser.getByteFrequencyData(dataArray);
              requestAnimationFrame(draw);
              canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
              // set background
              canvasCtx.fillStyle = '#000';
              canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

              // get volume
              var sum = 5000;
              for(var i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              var volume = sum / bufferLength * 2;

              // set bars
              canvasCtx.fillStyle = gradient;
              var temp = volume;
              for(var i = 0; i < bars.length; i++) {
                temp *= 0.9;
                (function( i, temp ) {
                    setTimeout( function() {
                        bars[ i ] = temp;
                    }, delay * (i));
                })( i, temp );
              }
              for(var i = 1; i < bars.length + 1; i++) {
                  canvasCtx.fillRect(WIDTH / 2 + (i * barWidth * 2) - 1, HEIGHT / 2 - 1, barWidth, bars[i]);  
                  canvasCtx.fillRect(WIDTH / 2 + (-i * barWidth * 2) - 1, HEIGHT / 2 - 1, barWidth, bars[i]);  
                  canvasCtx.fillRect(WIDTH / 2 + (i * barWidth * 2) - 1, HEIGHT / 2 - 1, barWidth, -bars[i]);  
                  canvasCtx.fillRect(WIDTH / 2 + (-i * barWidth * 2) - 1, HEIGHT / 2 - 1, barWidth, -bars[i]);  
              }
              // bottom bar
              canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, barWidth, volume);
              // top bar
              canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, barWidth, -volume);
            }
            draw();
          },
          function(err) {
            console.log('error');
          }
        );
     }
  },

  init: function() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var myAudio = document.querySelector('audio');
    var source;
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.3;
    // setup --> data
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    source = audioCtx.createMediaElementSource(myAudio);
    source.connect(analyser);
    // setup --> canvas
    var canvas = document.getElementById('myCanvas');
    var canvasCtx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    // setup --> bar colors
    var gradient = canvasCtx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 30, WIDTH / 2, HEIGHT / 2, 150);
    gradient.addColorStop(0,'#000000');
    gradient.addColorStop(0.25,'#D2691E');
    
    gradient.addColorStop(0.4, '#F4A460');
    gradient.addColorStop(0.5,'#AFEEEE');
    gradient.addColorStop(0.85, '#00BFFF');
  
    gradient.addColorStop(1,'#ffffff');

    // setup --> misc
    // barWidth = WIDTH / bufferLength;
    barWidth = 5;
    var bars = Array(50);
    var delay = 100;

    var iteration = 0;
    var totalIterations = 100;
    var easingValue;
    draw = function() {
        easingValue = easeOutQuart(iteration, 250, -300, totalIterations);
        easingValueHeight = easeOutQuint(iteration, 0, 1, totalIterations);
        // get frequency data
        analyser.getByteFrequencyData(dataArray);
        // clear canvas
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        // set background
        canvasCtx.fillStyle = '#000';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        // get volume
        var sum = 5000;
        for(var i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        var volume = sum / bufferLength * 2;

        // set bars
        // canvasCtx.fillStyle = 'hsl(' + Math.random()*360 + ',40%,50%)';
        canvasCtx.fillStyle = gradient;
        // if(iteration < totalIterations) {
        //   iteration++;
        // } else {
        //   iteration = 0;
        //   canvasCtx.fillStyle = 'hsl('+Math.random()*360+',40%,50%)';
        // }
        var temp = volume;
        for(var i = 0; i < bars.length; i++) {
          // bars[i] = temp;
          temp *= 0.9;
          (function( i, temp ) {
              setTimeout( function() {
                  bars[ i ] = temp;
              }, delay * (i));
              // canvasCtx.fillStyle = 'hsl('+Math.random()*360+',40%,50%)';
          })( i, temp );
        }
        for(var i = 1; i < bars.length + 1; i++) {
            canvasCtx.fillRect(WIDTH / 2 + (i * 10) - 1, HEIGHT / 2 - 1, barWidth, bars[i]);  
            canvasCtx.fillRect(WIDTH / 2 + (-i * 10) - 1, HEIGHT / 2 - 1, barWidth, bars[i]);  
            canvasCtx.fillRect(WIDTH / 2 + (i * 10) - 1, HEIGHT / 2 - 1, barWidth, -bars[i]);  
            canvasCtx.fillRect(WIDTH / 2 + (-i * 10) - 1, HEIGHT / 2 - 1, barWidth, -bars[i]);  
        }
        // bottom bar
        canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, barWidth, volume);
        // top bar
        canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, barWidth, -volume);
        
        requestAnimationFrame(draw);
    }
    draw();
    source.connect(audioCtx.destination);
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

var barsDecreasing = function() {
    // initial setup --> connect audio
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var myAudio = document.querySelector('audio');
    var source;
    var audioCtx = new AudioContext();
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.3;
    // setup --> data
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    source = audioCtx.createMediaElementSource(myAudio);
    source.connect(analyser);
    // setup --> canvas
    var canvas = document.getElementById('myCanvas');
    var canvasCtx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    var gradient = canvasCtx.createRadialGradient(225, 225, 10, 225, 225, 150);
    gradient.addColorStop(0,'#000000');
    gradient.addColorStop(0.25,'#ff0000');
    gradient.addColorStop(0.75,'#ffff00');
    gradient.addColorStop(1,'#ffffff');
    // barWidth = WIDTH / bufferLength;
    barWidth = 5;
    var bars = Array(50);
    var delay = 100;

    var iteration = 0;
    var totalIterations = 100;
    var easingValue;

    draw = function() {
        easingValue = easeOutQuart(iteration, 250, -300, totalIterations);
        easingValueHeight = easeOutQuint(iteration, 0, 1, totalIterations);
        // get frequency data
        analyser.getByteFrequencyData(dataArray);
        // clear canvas
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        // set background
        canvasCtx.fillStyle = '#000';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        // get volume
        var sum = 5000;
        for(var i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        var volume = sum / bufferLength * 2;

        // set bars
        // canvasCtx.fillStyle = 'hsl(' + Math.random()*360 + ',40%,50%)';
        canvasCtx.fillStyle = gradient;
        // if(iteration < totalIterations) {
        //   iteration++;
        // } else {
        //   iteration = 0;
        //   canvasCtx.fillStyle = 'hsl('+Math.random()*360+',40%,50%)';
        // }
        var temp = volume * 0.8;
        for(var i = 0; i < bars.length; i++) {
          // bars[i] = temp;
          temp *= 0.9;
          (function( i, temp ) {
              setTimeout( function() {
                  bars[ i ] = temp;
              }, delay * (60-i));
              // canvasCtx.fillStyle = 'hsl('+Math.random()*360+',40%,50%)';
          })( i, temp );
        }
        for(var i = 1; i < bars.length + 1; i++) {
            canvasCtx.fillRect(WIDTH / 2 + (i * 10) - 1, HEIGHT / 2 - 1, barWidth, bars[i]);  
            canvasCtx.fillRect(WIDTH / 2 + (-i * 10) - 1, HEIGHT / 2 - 1, barWidth, bars[i]);  
            canvasCtx.fillRect(WIDTH / 2 + (i * 10) - 1, HEIGHT / 2 - 1, barWidth, -bars[i]);  
            canvasCtx.fillRect(WIDTH / 2 + (-i * 10) - 1, HEIGHT / 2 - 1, barWidth, -bars[i]);  
        }
        // bottom bar
        canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, barWidth, volume);
        // top bar
        canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, barWidth, -volume);
        
        requestAnimationFrame(draw);
    }
    draw();
    source.connect(audioCtx.destination);
}

// barsDecreasing();