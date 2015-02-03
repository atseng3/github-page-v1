window.Profile = {
    
    init: function () {
    	this.setListeners();
    },

    setListeners: function() {
    	$('.projects').on('click', this.handleClick);
    },

    handleClick: function(event) {
    	event.preventDefault();
    	var $projects = $('#projects');
    	var $desc = $('#desc');
    	if($projects.hasClass('slideLeft')) {
    		$projects.removeClass('slideLeft');
    		$projects.addClass('slideRightOut');
    		$desc.removeClass('fadeOut');
    		$desc.addClass('fadeIn');
    	} else {
    		$projects.removeClass('slideRightOut');
				$projects.addClass('slideLeft');
				$desc.removeClass('fadeIn');
	  		$desc.addClass('fadeOut');
    	}
    }
};

$(document).ready(function () {

    Profile.init(); 

});