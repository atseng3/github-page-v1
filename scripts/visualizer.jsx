var APP = React.createClass({
  render: function() {
    return (
    	<div>
    		<input id="search-youtube" placeholder="Search Youtube"/><span className="sound"></span>
    		<div id="visualizer-icon"></div>
    		<progress max="100" value="80"></progress>
    	</div>
    )
    // <audio src="last-ones-standing.mp3" controls preload="auto"></audio>;
  }
});

// var start = new Date().getTime();

// setInterval(function() {
  React.render(
    <APP />,
    document.getElementById('container')
  );
// }, 50);
