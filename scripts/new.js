window.Profile = {
    
    init: function () {
    	// this.setListeners();
    },

    setListeners: function() {
    	$('.nav-list__items').on('click', this.handleClick);
    },

    handleClick: function(event) {
    	event.preventDefault();
    	var currentTarget = $(event.currentTarget);
    	if(currentTarget.hasClass('projects')) {
    		$('#background').append('<div class="new-stuff">Some new stuff</div>');
    	}
    }
};

$(document).ready(function () {

    Profile.init(); 

});