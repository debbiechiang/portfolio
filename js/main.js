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


$(function(){
	fixScroll.init();
});
