var APP = React.createClass({

  render: function() {
    return (
    	<div>
    		<SearchYoutube /><span className="sound"></span>
    		<div id="visualizer-icon"></div>
    		<progress max="100" value="80"></progress>
    	</div>
    )
    // <audio src="last-ones-standing.mp3" controls preload="auto"></audio>;
  }
});

var SearchYoutube = React.createClass({

	getInitialState:function() {
		return {
			autocomplete: []
		};
	},

	updateAutocomplete: function(data) {
		this.setState({autocomplete: data});
	},

	searchYoutube: function(event) {
		var query = $(event.target).val()
		if(query.length < 3) {
			return;
		}
		var that = this;
		$.ajax({
	    type: 'GET',
	    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=' + query + '&key=AIzaSyAYkKUPqlk7OHNTUZ7mLDBtf9bzwjQJAcY',
	    success: function(data) {
	    	that.updateAutocomplete(data.items);
	    	debugger
	    }
		});
	},

	render: function() {
		if(this.state.autocomplete.length != 0) {
			debugger
			var autocomplete = (
				<div className="search-container__autocomplete">
					<Autocomplete img={this.state.autocomplete[0].snippet.thumbnails.default.url} title={this.state.autocomplete[0].snippet.title}/>
					<Autocomplete img={this.state.autocomplete[1].snippet.thumbnails.default.url} title={this.state.autocomplete[1].snippet.title}/>
					<Autocomplete img={this.state.autocomplete[2].snippet.thumbnails.default.url} title={this.state.autocomplete[2].snippet.title}/>
					<Autocomplete img={this.state.autocomplete[3].snippet.thumbnails.default.url} title={this.state.autocomplete[3].snippet.title}/>
					<Autocomplete img={this.state.autocomplete[4].snippet.thumbnails.default.url} title={this.state.autocomplete[4].snippet.title}/>
				</div>
			)
		}
		return (
			<div className="search-container">
				<input onChange={this.searchYoutube} id="search-youtube" placeholder="Search Youtube"/>
				{autocomplete}
			</div>
		)
	}
});

var Autocomplete = React.createClass({
	render: function() {
		return (
			<div className="autocomplete__items">
				<a href="#" className="img">
					<img src={this.props.img} />
				</a>
				<div>
					{this.props.title}
				</div>
			</div>
		)
	}
});

React.render(
  <APP />,
  document.getElementById('container')
);
