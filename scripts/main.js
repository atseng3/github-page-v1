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
			svg.selectAll('circle.points')
		   	 .data(dataset)
		 		 .enter()
		  	 .append('circle')
		  	 .attr('class', 'points')
				 .attr('cx', function(d, i) {
				 		return (i + 0.5) * (w / dataset.length) + padding;
				 })
				 .attr('cy', h / 2)
				 .attr('r', function(d) { return d.r; })
				 .attr('stroke', function(d) { return d.stroke; })
				 .attr('fill', function(d) { return d.fill; });
			// svg.select('circle').append('a').attr('href', 'google.com').html('newpage').attr('x', 10).attr('y', 60);
				 // .data(dataset)
				 // .enter()
				 // .append('a')
				 // .attr('href:xlink', function(d) { return d.text; })
				 // .attr('x', function(d, i) {
				 // 		return i * (w / dataset.length) + padding;
				 // })
				 // .attr('y', h / 2 - padding);
			// svg.selectAll('a')
			// 	 .data(dataset)
			// 	 .enter()
			//    .append('a')
			//    .attr('xlink:href', 'google.com')
			//    .val('s')
			//    .attr('x', 60)
			//    .attr('y', 21);
			// svg.select('text')
			//    .data(dataset)
			// 	 .enter()
			//    .append('text')
			//    .attr('x', 60)
			//    .attr('y', 21);
			// svg.selectAll('a')
			// 	 .data(dataset)
			// 	 .enter()
			// 	 .append('a')
			// 	 .html(function(d) { return d.text; })
			// 	 .attr('x', function(d, i) {
			// 	 		return i * (w / dataset.length) + padding;
			// 	 })
			// 	 .attr('y', h / 2 - padding);
			// svg.selectAll('text')
			// 	 .data(dataset)
			// 	 .enter()
			// 	 .append('text')
			// 	 // .text(function(d) { return d.text; })
			// 	 .html(function(d) { return '<a href="www.google.com" target="_blank">' + d.text + '</a>'; })
			// 	 .attr('x', function(d, i) {
			// 	 		return i * (w / dataset.length) + padding;
			// 	 })
			// 	 .attr('y', h / 2 - padding)
			// 	 .attr('font-family', 'sans-serif')
			// 	 .attr('font-size', '15px')
			// 	 .attr('fill', 'black')
			// 	 .attr('text-anchor')



		// <a xlink:href="https://developer.mozilla.org/en-US/docs/SVG"
  //    target="_blank">
  //   <rect height="30" width="120" y="0" x="0" rx="15"/>
  //   <text fill="white" text-anchor="middle" 
  //         y="21" x="60">SVG on MDN</text>
  // </a>
				 // var text = svg.selectAll('text')
          //               .data(dataset)
          //               .enter()
          //               .append('text')
          //               .text(function(d) {
          //                   return d;
          //               })
          //               .attr('x', function(d, i) {
          //                   return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
          //               })
          //               .attr('y', function(d) {
          //                   return h - (d * 4) + 14;
          //               })
          //               .attr('font-family', 'sans-serif')
          //               .attr('font-size', '11px')
          //               .attr('fill', 'white')
          //               .attr('text-anchor', 'middle');
			
    }
};

$(document).ready(function () {

    Profile.init(); 

});