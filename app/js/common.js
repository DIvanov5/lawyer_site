$(function() {

	$('.slider-wrap').slideDown();

	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

	$("a[href=#callback]").click(function(){
		$("#callback .form-name").val($(this).data("form"));
	});

	$(".top-line .sf-menu").superfish({
		cssArrows: false,
		hoverClass: 'no-class',
		delay: 200
	});

	//OwlCarousel, slider
	var owl = $(".slider");
	owl.owlCarousel({
		loop: true,
		items: 1,
		itemClass: "slide-wrap",
		nav: true,
		navText: "",
	});
	$(".next").click(function(){
		owl.trigger("next.owl.carousel");
	});
	$(".prev").click(function(){
		owl.trigger("prev.owl.carousel");
	});

	//Mobile menu
	var deskTopMenu = $(".sf-menu");
	deskTopMenu.after("<div id ='my-menu'></div>");
	deskTopMenu.clone().appendTo("#my-menu");
	$("#my-menu").find("*").removeAttr("style").removeClass("sf-menu");
	$("#my-menu").mmenu({
		extensions:['widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black'],
		navbar:{
			title: "Меню"
		}
	});
	var mobMenuApi = $("#my-menu").data("mmenu");
	var moobileMenu = $(".toggle-mnu");
	mobMenuApi.bind("closed", function(){
		moobileMenu.removeClass("on");
	});
	$(".mobile-mnu").click(function() {
		mobMenuApi.open();
		moobileMenu.toggleClass("on");
		return false;
	});

	//Blocks become same height
	$(".service-item h4").equalHeights();
	$(".new-item-text").equalHeights();
	$(".link-item").equalHeights();

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("#callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(".success").addClass("visible");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				$(".success").removeClass("visible");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
