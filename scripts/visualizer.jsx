var APP = React.createClass({
  render: function() {

    return <audio src="last-ones-standing.mp3" controls preload="auto"></audio>;
  }
});

// var start = new Date().getTime();

// setInterval(function() {
  React.render(
    <APP />,
    document.getElementById('container')
  );
// }, 50);
