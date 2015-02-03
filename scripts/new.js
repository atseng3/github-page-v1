window.Profile = {
    
    init: function () {
    	this.setListeners();
    },

    setListeners: function() {
    	$('.projects').on('click', this.handleClick);
    },

    handleClick: function(event) {
    	event.preventDefault();
    	$('#projects').addClass('slideLeft');
  		$('#desc').addClass('fadeOut');
    	// var $currentTarget = $(event.currentTarget);
    	// if($currentTarget.hasClass('projects')) {
    		// $('#projects').addClass('slideLeft');
    		// $('#desc').addClass('fadeOut');
    	// }
    }
};

$(document).ready(function () {

    Profile.init(); 

});