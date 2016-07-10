'use strict';

$(document).ready(function() {

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
	var typeQueryParam = setOrReadCookie('type', getQueryParamFromUrl(window.location.search, 'type')) || '';
	var reffStr = readCookie('__reff') || '';
	if (reffStr) checkAndSetReffCookie(reffStr);

	// set the values in the form (hidden too)
	if (emailQueryParam) document.getElementById('email-input').value = emailQueryParam;
	if (typeQueryParam) {
		var selectedToggle = $('input:radio[name="USERTYPE"][value="'+typeQueryParam+'"]')[0];
		selectedToggle.setAttribute('checked', true);
		toggleChange.call(selectedToggle);
	}
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
