$(document).ready(function() {

	var invalidSubmission = function () {
		$('#landing-submit').hide();
		$('#landing-error').show();
	}

	var resetSubmission = function () {
		$('#landing-error').hide();
		$('#landing-submit').show();
	}

	var successfulSubmission = function () {
		resetSubmission();
		$('#landing-info').hide();
		$('#landing-form').hide();
		$('#landing-success').show();
	}

	var submit = function () {
		resetSubmission();
		var emailAddr = ($('#landing-input-field').val() || "").trim();
		if (!emailAddr || !$('#landing-input-field')[0].validity.valid) return invalidSubmission();
		
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
	})

	$('#landing-input-field').keyup(function(event) {
		resetSubmission();
		var key = event.keyCode || event.which;
		if (key === 13) submit();
	});

	$('.submit-btn').click(function() {
		submit();
	});

});
