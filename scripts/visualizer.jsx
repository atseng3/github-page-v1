var APP = React.createClass({

  render: function() {
    return (
    	<div>
    		<SearchYoutube />
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
			autocomplete: [],
			hover: -1,
			selected: null,
			wantToSearch: false
		};
	},

	updateAutocomplete: function(data) {
		this.setState({ autocomplete: data });
	},

	handleBlur: function(event) {
		this.updateAutocomplete([]);
		if(event.selectedSet) {
			$('#search-youtube').val('');
		}
	},

	handleFocus: function(event) {
		this.searchYoutube({
			target: $('#search-youtube')[0]
		})
	},

	searchYoutube: function(event) {
		var query = $(event.target).val()
		if(query.length < 3) {
			this.updateAutocomplete([]);
			return;
		}
		var that = this;
		$.ajax({
	    type: 'GET',
	    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=' + query + '&key=AIzaSyAYkKUPqlk7OHNTUZ7mLDBtf9bzwjQJAcY',
	    success: function(data) {
	    	that.updateAutocomplete(data.items);
	    	// debugger
	    }
		});
	},

	navigateAutocomplete: function(event) {
		if(event.key === 'ArrowUp') {
			this.setState({ 
				hover: Math.max(this.state.hover - 1, -1)
			});
		} else if(event.key === 'ArrowDown') {
			this.setState({ 
				hover: Math.min(this.state.hover + 1, 4)
			});
		} else if(event.key === 'Enter') {
			if(this.state.hover > -1) {
				this.setState({
					hover: -1,
					selected: this.state.autocomplete[this.state.hover],
					wantToSearch: false
				});
				this.handleBlur({
					selectedSet: true
				});
			}
		} else if(event.key === 'Escape') {
			this.handleBlur({
				selectedSet: false
			});
			this.setState({
				wantToSearch: false
			});
		}
		return;
	},

	wantToSearch: function(event) {
		this.setState({
			wantToSearch: true
		});
	},

	render: function() {
		var autocomplete = '';
		if(this.state.autocomplete.length != 0) {
			autocomplete = (
				<div className="search-container__autocomplete">
					<Autocomplete className={this.state.hover == 0 ? 'hover' : ''} img={this.state.autocomplete[0].snippet.thumbnails.default.url} title={this.state.autocomplete[0].snippet.title}/>
					<Autocomplete className={this.state.hover == 1 ? 'hover' : ''} img={this.state.autocomplete[1].snippet.thumbnails.default.url} title={this.state.autocomplete[1].snippet.title}/>
					<Autocomplete className={this.state.hover == 2 ? 'hover' : ''} img={this.state.autocomplete[2].snippet.thumbnails.default.url} title={this.state.autocomplete[2].snippet.title}/>
					<Autocomplete className={this.state.hover == 3 ? 'hover' : ''} img={this.state.autocomplete[3].snippet.thumbnails.default.url} title={this.state.autocomplete[3].snippet.title}/>
					<Autocomplete className={this.state.hover == 4 ? 'hover' : ''} img={this.state.autocomplete[4].snippet.thumbnails.default.url} title={this.state.autocomplete[4].snippet.title}/>
				</div>
			)
		}
		var iframe = '';
		var nowPlaying = '';
		var header = <input onChange={this.searchYoutube} id="search-youtube" placeholder="Search Youtube"/>;
		if(this.state.selected) {
			var src = "https://www.youtube.com/embed/" + this.state.selected.id.videoId +"?autoplay=1&autohide=0";
			iframe = <iframe id="ytplayer" type="text/html" width="720" height="405" src={src} frameborder="0" allowfullscreen></iframe>;
			nowPlaying = <div onClick={this.wantToSearch} id="nowPlaying">{this.state.selected.snippet.title}</div>
			header = nowPlaying;
		} else {
			header = <input onChange={this.searchYoutube} id="search-youtube" placeholder="Search Youtube"/>;
		}

		if(this.state.wantToSearch) {
			header = <input onChange={this.searchYoutube} id="search-youtube" placeholder="Search Youtube"/>;
		}

		return (
			<div className="search-container" onKeyDown={this.navigateAutocomplete} onBlur={this.handleBlur} onFocus={this.handleFocus}>
				{header}
				{autocomplete}
				{iframe}
			</div>
		)
	}
});



var Autocomplete = React.createClass({
	render: function() {
		return (
			<div className={"autocomplete__items " + this.props.className}>
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
