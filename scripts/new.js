window.Profile = {
    
    init: function () {
    	this.setListeners();
    	this.simpleRouting();
    	this.mySort([2, 4, 3, 5, 1]);
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
    },

    mySort: function(arr) {
    	length = arr.length
		 	for(var i = 0; i < arr.length; i++) {
			 	this.helper(arr, i);
		 	}
    },

    helper: function(arr, i) {
    	var max = 0;
			var index = i;
			for(var j = 0; j < arr.length - i; j++) {
				if(arr[j] > max) {
					max = arr[j];
					index = j;
				}
			}
			var indexTo = arr.length - 1 - i;
			this.swap(arr, index, indexTo);
    },

    swap: function(arr, indexFrom, indexTo) {
    	var prevVal = arr[indexTo];
    	var newVal = arr[indexFrom];
    	arr[indexTo] = newVal;
    	arr[indexFrom] = prevVal;
    	console.log(arr)
    }
};

$(document).ready(function () {

    Profile.init(); 

});