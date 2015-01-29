window.Profile = {
    // Models: {},
    // Collections: {},
    // Views: {},
    // Routers: {},
    init: function () {
    	var circle_end = [ { "r": 10, "stroke": "", "pos": 1, "fill": "rgb(0, 133, 88)", "text": "", "href": "" },
    										 { "r": 10, "stroke": "", "pos": -1, "fill": "rgb(0, 133, 88)", "text": "", "href": "" }];
    	var dataset = [ { "r": 6, "stroke": "gray", "fill": "rgb(255, 255, 255)", "text": "Baconbnb", "href": "" },
    									{ "r": 6, "stroke": "gray", "fill": "rgb(255, 255, 255)", "text": "Medigo", "href": "" },
    									{ "r": 6, "stroke": "gray", "fill": "rgb(255, 255, 255)", "text": "NoiseAlert", "href": "http://bit.do/noise-alert" }];
			// var h = 200;
			// var w = 1000;
			var barPadding = 1;
			// debugger
			// var svg = d3.select('#visualizer')
			//                       .append('svg')
			//                       .attr('width', w)
			//                       .attr('height', h);
			// var rects = svg.selectAll('rect')
			//              .data(dataset)
			//              .enter()
			//              .append('rect')
			//              .attr('x', function(d, i) {
			//                 return i * (w / dataset.length);
			//              })
			//              .attr('y', function(d) {
			//                 return h - (d * 4);
			//              })
			//              .attr('width', w / dataset.length - barPadding)
			//              .attr('height', function(d) {
			//                 return d * 10;
			//              })
			//              .attr('fill', function(d) {
			//                 return 'rgb(0, 0, ' + (d * 10) + ')';
			//              });
			var h = 300;
			var w = $('main').width();
			var padding = 10;
			var svg = d3.select('#projects-bar')
									.append('svg')
									.attr('width', w)
									.attr('height', h);
			
			var lineData = [ { "x": padding, "y": h/2 }, { "x": w - padding, "y": h/2 } ];
											 // { "x": 40, "y": 10 }, { "x": 60, "y": 40 },
											 // { "x": 80, "y": 5 }, { "x": 100, "y": 60 } ];

			var lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).interpolate("linear");

			var lineGraph = svg.append('path')
												 .attr('d', lineFunction(lineData))
												 .attr('stroke', 'rgb(0, 133, 88)')
												 .attr('stroke-width', 11)
												 .attr('fill', 'none');
			// add endpoints
			svg.selectAll('circle.end')
				 .data(circle_end)
				 .enter()
				 .append('circle')
				 .attr('class', 'end')
				 .attr('cx', function(d, i) {
				 		return i * w + padding * d.pos;
				 })
				 .attr('cy', h / 2)
				 .attr('stroke', "")
				 .attr('r', 10)
				 .attr('fill', 'rgb(0, 133, 88)');
			// add projects
			var links = svg.selectAll('a')
				 .data(dataset)
				 .enter()
				 .append('a')
				 .attr('xlink:href', "google.com")

  		links.append('text')
				 .text('GOOGLE')
				 .attr('x', function(d, i) {
				 		return (i + 0.5) * (w / dataset.length)
				 })
				 .attr('y', h / 2 - padding);
			
			links.append('circle')
					 .attr('cx', function(d, i) {
				 			return (i + 0.5) * (w / dataset.length)
					 })
					 .attr('cy', h / 2)
					 .attr('r', function(d) { return d.r; })
					 .attr('stroke', function(d) { return d.stroke; })
					 .attr('fill', function(d) { return d.fill; });
			
    }
};

$(document).ready(function () {

    Profile.init(); 

});