window.Profile = {
    
    init: function () {
    	this.setListeners();
    	this.simpleRouting();
    },

    simpleRouting: function() {
    	var hash = window.location.hash;
    	if(hash.match(/projects/)) {
    		this.showProjectsPage();
    	} else {
    		// this.showHomePage();
    	}
    },

    setListeners: function() {
    	$('.projects').on('click', this.showProjectsPage);
    	$('.logo').on('click', this.showHomePage);
    },

    showHomePage: function(event) {
    	var $projects = $('#projects');
    	var $desc = $('#desc');
    	$projects.removeClass('slideLeft');
  		$projects.addClass('slideRightOut');
  		$desc.removeClass('fadeOut');
  		$desc.addClass('fadeIn');
    },

    showProjectsPage: function(event) {
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