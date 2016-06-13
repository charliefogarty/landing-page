'use strict';

$(document).ready(function() {

	$('.floating-input-field input').on('change', function() {
		if (this.value.trim()) {
			$(this.parentNode).addClass('floating-input-label-up');
		} else {
			this.value = this.value.trim();
			$(this.parentNode).removeClass('floating-input-label-up');
		}
	});

	$('.floating-input-field input').on('keydown', function(e) {
		// TODO check enter to submit

	});

	$('.input-toggle-option input').on('change', function() {
		$('.input-toggle-option').removeClass('input-toggle-option-selected');
		$(this.parentNode).addClass('input-toggle-option-selected');
	});

	var getBlend = function(color1, color2, percent) {
		return {
			r: Math.round(color1.r * percent + color2.r * (1 - percent)),
			g: Math.round(color1.g * percent + color2.g * (1 - percent)),
			b: Math.round(color1.b * percent + color2.b * (1 - percent))
		};
	}

	var body = document.body;
	var heroSection = document.getElementById("header-hero");
	var whoSection = document.getElementById("lorem-is-for");
	var signupSection = document.getElementById("early-adopter");

	var rgb1 = {r: 9, g: 21, b: 36};
	var rgb2 = {r: 29, g: 173, b: 155};
	var rgb3 = {r: 41, g: 210, b: 228};
	var rgb4 = {r: 255, g: 255, b: 255};

	var checkBg = function() {
		var windowHeight = $(window).height();
		var heroBottom = heroSection.getBoundingClientRect().bottom;
		var whoBottom = whoSection.getBoundingClientRect().bottom;
		var signupBottom = signupSection.getBoundingClientRect().bottom;

		var resultObj;
		if (heroBottom >= windowHeight) {
			resultObj = rgb1;
		} else if (heroBottom < windowHeight && heroBottom >= 0) {
			resultObj = getBlend(rgb1, rgb2, heroBottom/windowHeight);
		} else if (whoBottom >= windowHeight) {
			resultObj = rgb2;
		} else if (whoBottom < windowHeight && whoBottom >= 0) {
			resultObj = getBlend(rgb2, rgb3, whoBottom/windowHeight);
		} else if (signupBottom >= windowHeight) {
			resultObj = rgb3;
		} else if (signupBottom < windowHeight && signupBottom >= 0) {
			resultObj = getBlend(rgb3, rgb4, signupBottom/windowHeight);
		} else {
			resultObj = rgb4;
		}
		body.style.backgroundColor = 'rgb('+resultObj.r+', '+resultObj.g+', '+resultObj.b+')';
	}

	$(window).on('scroll resize', checkBg);


	// var invalidSubmission = function () {
	// 	$('#landing-submit').hide();
	// 	$('#landing-error').show();
	// }

	// var resetSubmission = function () {
	// 	$('#landing-error').hide();
	// 	$('#landing-submit').show();
	// }

	// var successfulSubmission = function () {
	// 	resetSubmission();
	// 	$('#landing-info').hide();
	// 	$('#landing-form').hide();
	// 	$('#landing-success').show();
	// }

	// var submit = function () {
	// 	resetSubmission();
	// 	var emailAddr = ($('#landing-input-field').val() || "").trim();
	// 	if (!emailAddr || !$('#landing-input-field')[0].validity.valid) return invalidSubmission();
		
	// 	$.ajax({
	// 		url: "https://loremcms.us12.list-manage.com/subscribe/post-json?u=3b785e7fe49be8f02e4227a0d&amp;id=745fda5725",
	// 		data: $('#landing-form').serialize(),
	// 		dataType: "jsonp",
	// 		cache: false,
	// 		jsonp: "c",
	// 		contentType: "application/json; charset=utf-8",
	// 		success: successfulSubmission,
	// 		error: invalidSubmission
	// 	});
	// }

	// $('#landing-form').submit(function (e) {
	// 	e.preventDefault();
	// })

	// $('#landing-input-field').keyup(function(event) {
	// 	resetSubmission();
	// 	var key = event.keyCode || event.which;
	// 	if (key === 13) submit();
	// });

	// $('.submit-btn').click(function() {
	// 	submit();
	// });

});
