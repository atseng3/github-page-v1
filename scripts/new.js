window.Profile = {

    pages: {
        'profile': {
            in: 'slideLeft',
            out: 'slideRightOut'
        },
        'projects': {
            in: 'slideLeft',
            out: 'slideRightOut'
        },
        'desc': {
            in: 'fadeIn',
            out: 'fadeOut'
        }
    },

    init: function () {
    	this.setListeners();
    	this.simpleRouting();
    },

    simpleRouting: function() {
    	var hash = window.location.hash;
    	if(hash.match(/projects/)) {
    		this.showProjectsPage();
    	} else if(hash.match(/profile/)) {
            this.showProfilePage();
        }
    },

    setListeners: function() {
    	$('.projects').on('click', this.showProjectsPage);
    	$('.logo').on('click', this.showHomePage);
        $('.profile').on('click', this.showProfilePage);
        $('#learn-more').on('click', this.showProfilePage);
        $('#mobile-header').on('click', this.showMobileNav);
        $('.mobile-nav-mask').on('click', this.hideMobileNav);
    },

    hideMobileNav: function(event) {
        $('.mobile-nav-mask').hide();
    },

    showMobileNav: function(event) {
        $('.mobile-nav-mask').show();
    },

    showHomePage: function(event) {
        pages = window.Profile.pages
        for(var page in pages) {
            var $page = $('#'+page);
            if(page == 'desc') {
                $page.removeClass(pages[page].out);
                $page.addClass(pages[page].in);
            } else {
                if($page.hasClass(pages[page].in)) {
                    $page.removeClass(pages[page].in);
                    $page.addClass(pages[page].out);
                }
            }
        }
    },

    showProfilePage: function(event) {
        pages = window.Profile.pages
        for(var page in pages) {
            var $page = $('#'+page);
            if(page == 'profile') {
                $page.removeClass(pages[page].out);
                $page.addClass(pages[page].in);
            } else {
                if($page.hasClass(pages[page].in)) {
                    $page.removeClass(pages[page].in);
                    $page.addClass(pages[page].out);
                }
            }
        }
    },

    showProjectsPage: function(event) {
        pages = window.Profile.pages
        for(var page in pages) {
            var $page = $('#'+page);
            if(page == 'projects') {
                $page.removeClass(pages[page].out);
                $page.addClass(pages[page].in);
            } else {
                if($page.hasClass(pages[page].in)) {
                    $page.removeClass(pages[page].in);
                    $page.addClass(pages[page].out);
                }
            }
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