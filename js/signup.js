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
	var headerSection = document.getElementById("header");
	var headerFix = document.getElementById("header-fix");
	var skipSection = document.getElementById("skip-the-pain");
	var skipFix = document.getElementById("skip-fix");
	var skipList = document.getElementById("skip-list");
	var paradiseSection = document.getElementById("paradise");
	var solutionSection = document.getElementById("solution");
	var signupSection = document.getElementById("early-adopter");
	var $skipListItems = $('.skip-list-item');

	var rgb1 = {r: 0, g: 6, b: 69};
	var rgb2 = {r: 34, g: 1, b: 64};
	var rgb3 = {r: 173, g: 226, b: 255};
	var rgb4 = {r: 50, g: 69, b: 194};
	var rgb5 = {r: 255, g: 255, b: 255};

	var checkBg = function() {
		var resultObj;
		var windowHeight = $(window).height();
		var headerFixRect = headerFix.getBoundingClientRect();
		headerSection.style.minHeight = Math.max(1.5*windowHeight, headerFixRect.height)+'px';
		var headerRect = headerSection.getBoundingClientRect();
		var skipFixRect = skipFix.getBoundingClientRect();
		var skipListRect = skipList.getBoundingClientRect();
		skipSection.style.minHeight = Math.max(1.5*windowHeight, skipListRect.height)+'px';
		skipSection.style.paddingBottom = ((.75*windowHeight)-skipFixRect.height)+'px';
		var skipRect = skipSection.getBoundingClientRect();
		var paradiseRect = paradiseSection.getBoundingClientRect();
		var signupRect = signupSection.getBoundingClientRect();

		if (headerRect.bottom >= windowHeight) {
			headerFix.style.top = '0';
			headerFix.style.position = 'fixed';
			if (headerRect.bottom < (windowHeight*1.2)) {
				$(headerFix).addClass('hide');
			} else {
				$(headerFix).removeClass('hide');
			}
			skipFix.style.position = 'absolute';
			skipFix.style.top = "25vh";
			$(paradiseSection).addClass('hide');
			resultObj = rgb1;
		} else if (headerRect.bottom < windowHeight && skipRect.top >= 0) {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'absolute';
			skipFix.style.top = "25vh";
			$(paradiseSection).addClass('hide');
			if (headerRect.bottom >= windowHeight/2) {
				resultObj = rgb1;
			} else if (skipRect.top <= windowHeight/2) {
				resultObj = rgb2;
			} else {
				resultObj = getBlend(rgb1, rgb2, (skipRect.top-(windowHeight/2))/(skipRect.top-headerRect.bottom));
			}
		} else if (skipRect.top < 0 && skipRect.bottom >= windowHeight) {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'fixed';
			skipFix.style.top = "25vh";
			var highlight = Math.max(Math.min($skipListItems.length-Math.round((50+skipRect.bottom - windowHeight)/50), $skipListItems.length), 0);
			$skipListItems.removeClass('ten twenty thirty fifty full');
			$($skipListItems[highlight]).addClass('full');
			if ($skipListItems[highlight-1]) $($skipListItems[highlight-1]).addClass('fifty');
			if ($skipListItems[highlight+1]) $($skipListItems[highlight+1]).addClass('twenty');
			if ($skipListItems[highlight-2]) $($skipListItems[highlight-2]).addClass('thirty');
			if ($skipListItems[highlight+2]) $($skipListItems[highlight+2]).addClass('ten');
			$(paradiseSection).addClass('hide');
			resultObj = rgb2;
		} else if (skipRect.bottom < windowHeight && paradiseRect.top >= windowHeight) {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'absolute';
			skipFix.style.top = (skipListRect.height+100+(windowHeight*.25)-skipFixRect.height)+'px';
			$(paradiseSection).addClass('hide');
			resultObj = getBlend(rgb2, rgb3, (paradiseRect.top-windowHeight)/(paradiseRect.top-skipRect.bottom));
		} else if (paradiseRect.top >= 0) {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'absolute';
			skipFix.style.top = (skipListRect.height+100+(windowHeight*.25)-skipFixRect.height)+'px';
			$(paradiseSection).addClass('hide');
			resultObj = rgb3;
		} else if (paradiseRect.bottom >= 0 && signupRect.top >= windowHeight) {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'absolute';
			skipFix.style.top = (skipListRect.height+100+(windowHeight*.25)-skipFixRect.height)+'px';
			$(paradiseSection).removeClass('hide');
			resultObj = rgb3;
		} else if (signupRect.bottom >= windowHeight) {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'absolute';
			skipFix.style.top = (skipListRect.height+100+(windowHeight*.25)-skipFixRect.height)+'px';
			$(paradiseSection).removeClass('hide');
			resultObj = rgb4;
		} else if (signupRect.bottom < windowHeight && signupRect.bottom >= 0) {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'absolute';
			skipFix.style.top = (skipListRect.height+100+(windowHeight*.25)-skipFixRect.height)+'px';
			$(paradiseSection).removeClass('hide');
			resultObj = getBlend(rgb4, rgb5, signupRect.bottom/windowHeight);
		} else {
			headerFix.style.top = (document.body.scrollTop-(windowHeight-headerRect.bottom))+'px';
			headerFix.style.position = 'absolute';
			$(headerFix).addClass('hide');
			skipFix.style.position = 'absolute';
			skipFix.style.top = (skipListRect.height+100+(windowHeight*.25)-skipFixRect.height)+'px';
			$(paradiseSection).removeClass('hide');
			resultObj = rgb5;
		}

		body.style.backgroundColor = 'rgb('+resultObj.r+', '+resultObj.g+', '+resultObj.b+')';
		return;
		// if (headerBottom >= windowHeight) {
		// } else if (headerBottom < windowHeight && headerBottom >= 0) {
		// } else if (slidesBottom >= windowHeight) {
		// } else if (slidesBottom < windowHeight && slidesBottom >= 0) {
		// 	resultObj = getBlend(rgb2, rgb3, slidesBottom/windowHeight);
		// } else if (signupBottom >= windowHeight) {
		// 	resultObj = rgb3;
		// } else if (signupBottom < windowHeight && signupBottom >= 0) {
		// 	resultObj = getBlend(rgb3, rgb4, signupBottom/windowHeight);
		// } else {
		// 	resultObj = rgb4;
		// }
	}
	setTimeout(checkBg);

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
