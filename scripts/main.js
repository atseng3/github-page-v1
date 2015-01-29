window.Profile = {
    // Models: {},
    // Collections: {},
    // Views: {},
    // Routers: {},
    init: function () {
    	var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
                14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
                24, 18, 25, 9, 3 ];
			var h = 200;
			var w = 1000;
			var barPadding = 1;
			debugger
			var svg = d3.select('#visualizer')
			                      .append('svg')
			                      .attr('width', w)
			                      .attr('height', h);
			var rects = svg.selectAll('rect')
			             .data(dataset)
			             .enter()
			             .append('rect')
			             .attr('x', function(d, i) {
			                return i * (w / dataset.length);
			             })
			             .attr('y', function(d) {
			                return h - (d * 4);
			             })
			             .attr('width', w / dataset.length - barPadding)
			             .attr('height', function(d) {
			                return d * 10;
			             })
			             .attr('fill', function(d) {
			                return 'rgb(0, 0, ' + (d * 10) + ')';
			             });
    }
};

$(document).ready(function () {

    Profile.init(); 

});