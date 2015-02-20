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
    <audio src="last-ones-standing.mp3" autoPlay ></audio>		
    	</div>
    )
    // <audio src="last-ones-standing.mp3" autoPlay ></audio>
    // <audio src="prayer-in-c.mp3" autoPlay ></audio>
    // <audio src="shinee-everybody.mp3" autoPlay ></audio>
    // <progress max="100" value="80"></progress>
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
    // this.doCanvasSetupCircular();
    // this.draw();
    // this.drawStereo();
    this.drawGreenBars();
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
    // this.draw();
    // this.drawEDC();
    // this.drawGreenBars();
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

  doCanvasSetupCircular: function() {
    var canvas = this.getDOMNode();
    this.canvasCtx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    this.gradient = this.canvasCtx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 50, WIDTH / 2, HEIGHT / 2, 700);
    this.gradient.addColorStop(0,'#000000');
    this.gradient.addColorStop(0.25,'#ff0000');
    this.gradient.addColorStop(0.75,'#ffff00');
    this.gradient.addColorStop(1,'#ffffff');

    this.barWidth = 10;
    this.bars = Array(10);
    // for(var i = 0; i < 50; i++) {
    //   this.bars[i] = 0;
    // }

    this.delay = 100;

    this.iteration = 0;
    this.totalIterations = 100;
    var easingValue;
    this.rotationBegin = 0;
    this.rotationEnd = 1;
  },

  doCanvasSetup: function() {
    var canvas = this.getDOMNode();
    this.canvasCtx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    this.gradient = this.canvasCtx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 50, WIDTH / 2, HEIGHT / 2, 700);
    this.gradient.addColorStop(0,'#000000');
    this.gradient.addColorStop(0.25,'#ff0000');
    this.gradient.addColorStop(0.75,'#ffff00');
    this.gradient.addColorStop(1,'#ffffff');

    this.barWidth = 10;
    this.bars = Array(50);
    for(var i = 0; i < 50; i++) {
      this.bars[i] = 0;
    }

    this.delay = 100;

    this.iteration = 0;
    this.totalIterations = 100;
    var easingValue;
    this.rotationBegin = 0;
    this.rotationEnd = 0.6;
  },

  drawStereo: function() {
    this.analyser.getByteFrequencyData(this.dataArray);
    requestAnimationFrame(this.drawStereo);
    this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

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
    this.canvasCtx.beginPath();
    // circle around logo
    this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130, 0, 360, false);
    // this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130, 1-this.rotationBegin*Math.PI, 1-this.rotationEnd*Math.PI, false);
    this.canvasCtx.lineWidth = volume/5;
    this.canvasCtx.strokeStyle = this.gradient;
    this.canvasCtx.stroke();

    
    // var odd = 0;
    for(var i = 1; i < this.bars.length + 1; i++) {
      this.canvasCtx.beginPath();
      this.canvasCtx.globalAlpha = 1/ i;
      this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130 + i *50, 0, 360, false);
      this.canvasCtx.lineWidth = this.bars[i]/5;
      this.canvasCtx.stroke();
      this.canvasCtx.globalAlpha = 1;
    }
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 350, this.rotationBegin*Math.PI, this.rotationEnd*Math.PI, false);
    this.canvasCtx.lineWidth = 30;
    this.canvasCtx.closePath();
      this.canvasCtx.strokeStyle = '#000';
      this.canvasCtx.stroke();
      this.rotationBegin += 0.02;
      this.rotationEnd += 0.02;
  },

  drawGreenBars: function() {
    this.analyser.getByteFrequencyData(this.dataArray);
    requestAnimationFrame(this.drawGreenBars);
    this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    // set background
    this.canvasCtx.fillStyle = '#000';
    this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    // get volume
    var sum = 5000;
    for(var i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    var volume = sum / this.bufferLength * 3;

    // set bars
    var greenGradient = this.canvasCtx.createLinearGradient(WIDTH/2, 200, WIDTH/2, 500);
    greenGradient.addColorStop(0,'#92d043');
    greenGradient.addColorStop(0.3,'#244e14');
    greenGradient.addColorStop(0.7,'#244e14');
    greenGradient.addColorStop(1,'#92d043');

    this.canvasCtx.fillStyle = greenGradient;
    var temp = volume;
    for(var i = 0; i < this.bars.length; i++) {
      temp *= 0.9;
      var that = this;
      (function( i, temp ) {
          setTimeout( function() {
              that.bars[ i ] = (temp + that.bars[i])/2;
          }, that.delay * (i));
      })( i, temp );
    }
    for(var i = 1; i < this.bars.length; i++) {
        // this.canvasCtx.globalAlpha=this.bars[i]/64;
        this.canvasCtx.fillRect(WIDTH / 2 + (i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, this.bars[i]);  
        this.canvasCtx.fillRect(WIDTH / 2 + (-i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, this.bars[i]);  
        this.canvasCtx.fillRect(WIDTH / 2 + (i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, -this.bars[i]);  
        this.canvasCtx.fillRect(WIDTH / 2 + (-i * this.barWidth * 2) - 1, HEIGHT / 2 - 1, this.barWidth, -this.bars[i]);  
        this.canvasCtx.globalAlpha=1;
    }

    this.canvasCtx.fillStyle = '#92d043';
    // bottom bar
    this.canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, this.barWidth, volume);
    // top bar
    this.canvasCtx.fillRect(WIDTH / 2 - 1, HEIGHT / 2 - 1, this.barWidth, -volume);
  },

  drawEDC: function() {
    this.analyser.getByteFrequencyData(this.dataArray);
    requestAnimationFrame(this.drawEDC);
    this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    // if(this.iteration < this.totalIterations) {
    //   this.iteration++;
    // } else {
    //   this.iteration = 0;
    //   this.rotationBegin += 0.1;
    //   this.rotationEnd += 0.1;
    // }

    // this.canvasCtx.strokeStyle = '#000';
    // this.canvasCtx.moveTo(0, 0);
    // // this.canvasCtx.lineTo(WIDTH *4/10 - 40, HEIGHT *4/10 - 20);
    // // this.canvasCtx.moveTo(WIDTH *6/10 + 40, HEIGHT *6/10 + 20);
    // this.canvasCtx.lineTo(WIDTH, HEIGHT);


    // this.canvasCtx.closePath();


    // get volume
    var sum = 5000;
    for(var i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    var volume = sum / this.bufferLength * 2;
    console.log('sum = ' + sum);
    console.log('volume = ' + volume);

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
    
    // var radgrad = this.canvasCtx.createRadialGradient(WIDTH/2, HEIGHT /2,50,WIDTH/2, HEIGHT/2,132);
    // radgrad.addColorStop(0, 'rgba(62, 68, 120,1)');
    // if(sum < 18000) {
    //   radgrad.addColorStop(1, 'rgba(62, 68, 120,1)');
    // } else {
    //   radgrad.addColorStop(1, 'rgba(189, 195, 247,1)');
    // }
    this.canvasCtx.beginPath();
    // circle around logo
    // this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130, 0, 360, false);
    this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130, this.rotationBegin*Math.PI, this.rotationEnd*Math.PI, false);
    // this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130, 1-this.rotationBegin*Math.PI, 1-this.rotationEnd*Math.PI, false);
    this.canvasCtx.lineWidth = 10;

    // this.canvasCtx.closePath();
    // radials light shows
    // this.canvasCtx.beginPath();
    // this.canvasCtx.lineWidth = 5;
    // if(sum > 45500) {
      // this.canvasCtx.strokeStyle = this.gradient;
    // } else {
      this.canvasCtx.strokeStyle = this.gradient;
      this.canvasCtx.stroke();
      // (b-a)(x-min)/(max - min) + a
      // (1.6 - 0.4)(bars[i] - 0.4)
    // }
    var odd = 0;
    for(var i = 1; i < this.bars.length + 1; i++) {
      this.canvasCtx.beginPath();
      // this.canvasCtx.arc(WIDTH / 2 , HEIGHT / 2, 150 + this.bars[i], 1.6*Math.PI, 0.4*Math.PI, false);  
      // this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 150 + this.bars[i], 0, 2*Math.PI, false);  
      // odd = i % 2 == 0 ? -1 : 1; 
      // this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130 + i *50, (-1*odd)*this.rotationBegin*Math.PI, (-1*odd)*this.rotationEnd*Math.PI, false);  
      this.canvasCtx.arc(WIDTH / 2, HEIGHT / 2, 130 + i *50, 0, 360, false);  
      // console.log(this.bars[i]);
      this.canvasCtx.lineWidth = (this.bars[i] / 2);
      this.canvasCtx.stroke();
      
    }
    
    
    // this.canvasCtx.beginPath();
    // this.canvasCtx.strokeStyle ='#000';
    // this.canvasCtx.arc(WIDTH/2, HEIGHT/2, 450, this.rotationBegin*Math.PI, this.rotationEnd*Math.PI, false);
    // this.canvasCtx.closePath();
    // this.canvasCtx.stroke();
    this.rotationBegin += 0.02;
    this.rotationEnd += 0.02;
    // this.canvasCtx.beginPath();
    // this.canvasCtx.strokeStyle = '#000';
    // this.canvasCtx.moveTo(0, 0);
    // this.canvasCtx.lineTo(WIDTH *4/10 - 40, HEIGHT *4/10 - 20);
    // this.canvasCtx.moveTo(WIDTH *6/10 + 40, HEIGHT *6/10 + 20);
    // this.canvasCtx.lineTo(WIDTH, HEIGHT);
    // this.canvasCtx.lineWidth = 30;

    // // this.canvasCtx.closePath();
    // this.canvasCtx.stroke();
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
    return <canvas id="myCanvas" width="1400" height="700"></canvas>
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