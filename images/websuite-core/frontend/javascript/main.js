$(document).ready(function () {
	$(window).on("scroll", function () {
		var headerHeight = $("header").height() - $("#open-menu").height() - ($("#open-menu").position().top / 2);

		if ($(document).scrollTop() > headerHeight) {
			$("#open-menu").addClass("dark");
		} else {
			$("#open-menu").removeClass("dark");
		}
	});
});