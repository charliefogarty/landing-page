'use strict';

console.log("Thanks for checking out the code. Reach out to us at team@lorem.tech");

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

var reffStr = readCookie('__reff') || '';
if (reffStr) checkAndSetReffCookie(reffStr);

