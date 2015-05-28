var fixScroll = (function(){
	// config values for fixed scrolling
	var config = {
		$sections: $('#scroller > section'),
		$navLinks: $('#scroller > nav > a'),
		currentLink: 0,
		$body: $('html, body'),
		animspeed: 650,
		animeasing: 'easeInOutExpo'
	}; 

	function init(){
		// on nav link click the page is scrolled to the relevant section
		config.$navLinks.on('click', function(){
			scrollAnim(config.$sections.eq($(this).index()).offset().top);
			return false;
		});

		// 2 waypoints defined:
		// First one when we scroll down: the current navigation link gets updated. 
		// A `new section´ is reached when it occupies more than 50% of the viewport
		// Second one when we scroll up: the current navigation link gets updated. 
		// A `new section´ is reached when it occupies more than 50% of the viewport
		config.$sections.waypoint( function( direction ) {
			if( direction === 'down' ) { 
				changeNav( $( this ) );
			 }
		}, { offset: '50%' } ).waypoint( function( direction ) {
			if( direction === 'up' ) { 
				changeNav( $( this ) ); 
			}
		}, { offset: '-50%' } );

		// on window resize: the body is scrolled to the position of the current section
		$( window ).on( 'debouncedresize', function() {
			scrollAnim( config.$sections.eq( config.currentLink ).offset().top );
		} );
	} 

	function changeNav( $section ) {
		config.$navLinks.eq(config.currentLink).removeClass('current');
		config.currentLink = $section.index('section');
		config.$navLinks.eq(config.currentLink).addClass('current');

		if (config.currentLink === 1){
			config.$navLinks.addClass('flip');
		} else {
			config.$navLinks.removeClass('flip');
		}
	}

	// function to scroll/animate the body
	function scrollAnim(top){
		config.$body.stop().animate({scrollTop: top}, config.animspeed, config.animeasing);
	}

	return {
		init: init 
	};
	
})();

var triangle = (function(){

	var opts = {
		width: $(window).width(),
		height: $(window).height(),
		cell_size: 60
	};

	function init(){
		var bluepatt = Trianglify($.extend(opts, { x_colors: ["001645","#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858","001645"] }));
		// var greypatt = Trianglify($.extend(opts, { x_colors: ["e7d0c0", "f3ede9", "faf9fb", "dcd2d7", "ccb7c0"] }));
		var greypatt = Trianglify($.extend(opts, { 
			x_colors: ["000000", "222222", "ffffff", "222222", "000000"], 
			y_colors: ["333333", "999999", "000000"],
			cell_size: 30 
		}));
		var orangepatt = Trianglify($.extend(opts, {x_colors:["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffeda0", "#ffffcc", "#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"] }));
		// $('#section3').css({'background-image': 'url(' + greypatt.png() + ')'});
		// $('#section3').css({'background-image': 'url(' + greypatt.png() + ')'});
	}

	return {
		init: init
	};
})();

$(function(){
	fixScroll.init();
	triangle.init();
});
