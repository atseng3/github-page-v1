window.Profile = {
    
    init: function () {
    	this.setListeners();
    },

    setListeners: function() {
    	$('.nav-list__items').on('click', this.handleClick);
    },

    handleClick: function(event) {
    	event.preventDefault();
    	var $currentTarget = $(event.currentTarget);
    	if($currentTarget.hasClass('projects')) {
    		// debugger
    		// $('p').addClass('slideLeft');
    		$('#projects').addClass('slideLeft');
    		$('#desc').addClass('fadeOut');
    		// projects = $('#projects');
    		// if(projects)
    		// $('#projects').addClass('slideLeft');
    		// $('#projects').addClass('slideRight');
    		// $('#desc').addClass('slideLeft');
    	}
    }
};

$(document).ready(function () {

    Profile.init(); 

});