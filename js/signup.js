'use strict';

$(document).ready(function() {

	var getBlend = function(color1, color2, percent) {
		return {
			r: Math.round(color1.r * percent + color2.r * (1 - percent)),
			g: Math.round(color1.g * percent + color2.g * (1 - percent)),
			b: Math.round(color1.b * percent + color2.b * (1 - percent))
		};
	}

	var body = document.body;
	var heroSection = document.getElementById("header-hero");
	var slidesSection = document.getElementById("lorem-slides");
	var signupSection = document.getElementById("early-adopter");

	var rgb1 = {r: 9, g: 21, b: 36};
	// var rgb2 = {r: 29, g: 173, b: 155};
	var rgb2 = {r: 16, g: 146, b: 146};
	var rgb3 = {r: 67, g: 162, b: 236};
	var rgb4 = {r: 255, g: 255, b: 255};

	var checkBg = function() {
		var windowHeight = $(window).height();
		var heroBottom = heroSection.getBoundingClientRect().bottom;
		var slidesBottom = slidesSection.getBoundingClientRect().bottom;
		var signupBottom = signupSection.getBoundingClientRect().bottom;

		var resultObj;
		if (heroBottom >= windowHeight) {
			resultObj = rgb1;
		} else if (heroBottom < windowHeight && heroBottom >= 0) {
			resultObj = getBlend(rgb1, rgb2, heroBottom/windowHeight);
		} else if (slidesBottom >= windowHeight) {
			resultObj = rgb2;
		} else if (slidesBottom < windowHeight && slidesBottom >= 0) {
			resultObj = getBlend(rgb2, rgb3, slidesBottom/windowHeight);
		} else if (signupBottom >= windowHeight) {
			resultObj = rgb3;
		} else if (signupBottom < windowHeight && signupBottom >= 0) {
			resultObj = getBlend(rgb3, rgb4, signupBottom/windowHeight);
		} else {
			resultObj = rgb4;
		}
		body.style.backgroundColor = 'rgb('+resultObj.r+', '+resultObj.g+', '+resultObj.b+')';
	}
	checkBg();

	$(window).on('scroll resize', checkBg);
	
	var toggleChange = function() {
		$('.input-toggle-option').removeClass('input-toggle-option-selected');
		$(this.parentNode).addClass('input-toggle-option-selected');
	}

	$('.input-toggle-option input').on('change', toggleChange);
	$('.floating-input-field input').on('keydown', function(e) {
		resetSubmission();
		if ((e.keyCode || e.which) === 13) {
			e.preventDefault();
			e.stopImmediatePropagation();
			$('#landing-form').submit();
		}
	});

	var getQueryParamFromUrl = function (searchUrl, strToSearchFor) {
		var questionStr = '?'+strToSearchFor+'=';
		var ampStr = '&'+strToSearchFor+'=';
		if (searchUrl.length) {
			var startIndex = searchUrl.indexOf(questionStr);
			if (startIndex < 0) startIndex = searchUrl.indexOf(ampStr);
			if (startIndex >= 0) {
				var endIndex = searchUrl.indexOf('&', startIndex + 1);
				if (endIndex >= 0) {
					return decodeURIComponent(searchUrl.slice(startIndex+questionStr.length, endIndex));
				} else {
					return decodeURIComponent(searchUrl.slice(startIndex+questionStr.length));
				}
			}
		}
		return undefined;
	};

	function createCookie(name,value,days,domain) {
		var expires = "";
		var domainStr = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}

		if (domain) domainStr = '; domain='+domain;
		document.cookie = name+"="+value+expires+domainStr+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name,"",-1);
	}

	function checkAndSetReffCookie(val) {
		var newString = '';
		var splitArr = val.split('|');
		while (newString.length < 2000 && splitArr.length) {
			var lastest = splitArr.pop();
			if (newString) lastest += '|';
			newString = lastest + newString;
		}
		createCookie('__reff', newString, 1000, '.lorem.tech');
	}

	function setOrReadCookie (cookieName, value) {
		if (value) {
			createCookie(cookieName,value,100);
			return value;
		} else {
			var returnValue = readCookie(cookieName);
			if (returnValue) returnValue = returnValue.trim();
			return returnValue;
		}
	}

	var emailQueryParam = setOrReadCookie('email', getQueryParamFromUrl(window.location.search, 'email')) || '';
	var nameQueryParam = setOrReadCookie('name', getQueryParamFromUrl(window.location.search, 'name')) || '';
	var typeQueryParam = setOrReadCookie('type', getQueryParamFromUrl(window.location.search, 'type')) || 'developer';
	var reffStr = readCookie('__reff') || '';
	if (reffStr) checkAndSetReffCookie(reffStr);

	// set the values in the form (hidden too)
	if (emailQueryParam) document.getElementById('email-input').value = emailQueryParam;
	if (nameQueryParam) document.getElementById('name-input').value = nameQueryParam;
	var selectedToggle = $('input:radio[name="USERTYPE"][value="'+typeQueryParam+'"]')[0];
	selectedToggle.setAttribute('checked', true);
	toggleChange.call(selectedToggle);
	$('#reff-input').val(reffStr);


    

	var invalidSubmission = function () {
		$('#landing-submit').hide();
		$('#landing-error').show();
	}

	var resetSubmission = function () {
		$('#landing-error').hide();
		$('#landing-submit').show();
	}

	var successfulSubmission = function () {
		createCookie('email',document.getElementById('email-input').value,100);
		createCookie('name',document.getElementById('name-input').value,100);
		createCookie('type',$('input:radio[name="USERTYPE"]:checked').val(),100);
		
		$('.landing-inputs').addClass('submitted');
		$('#become-adopter').hide();
		$('#thanks-adopter').show();
		$('#info-adopter').hide();
		$('#success-adopter').show();
		$('#landing-submit').hide();
		$('#landing-success').show();
	}

	var submit = function () {
		resetSubmission();
		
		$.ajax({
			url: "https://loremcms.us12.list-manage.com/subscribe/post-json?u=3b785e7fe49be8f02e4227a0d&amp;id=745fda5725",
			data: $('#landing-form').serialize(),
			dataType: "jsonp",
			cache: false,
			jsonp: "c",
			contentType: "application/json; charset=utf-8",
			success: successfulSubmission,
			error: invalidSubmission
		});
	}

	$('#landing-form').submit(function (e) {
		e.preventDefault();
		submit();
		return false;
	});
});
