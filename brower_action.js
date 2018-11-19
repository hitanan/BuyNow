var SENDO_API = 'https://www.sendo.vn/m/wap_v2/full/san-pham/'
// When the popup HTML has loaded

window.addEventListener('load', function(evt) {
	var buyingInterVal;

	$('#url').keypress(function (e) {
		var key = e.which;
		if(key == 13)  // the enter key code
		{
		   readyToBuy();
		}
	});

	$('#buying').on('click', readyToBuy);

	function readyToBuy() {
		var productUrl = $('#url').val().match(/([^\/]+)(?=\.\w+(\/?)$)/)[0];
		var price = 0;
		if (buyingInterVal) {
			clearInterval(buyingInterVal);
		}
		buyingInterVal = setInterval(function() {

			$.ajax({
				url: SENDO_API + productUrl,
				type: "GET",
				dataType: "json",
				success: function (data) {
					var message;
					if ( data.result.data.final_price < price) {
						clearInterval(buyingInterVal);

						message = '<span style="font-weight:bold;font-size:32px;color:red">BUY NOW !!!</span>';
						console.log('%c ' +message,'font-weight:bold;font-size:32px;color:red');

						// reload checkout page.
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
							var url = tabs[0].url;
							if (!url.endsWith('buynow=1')) {
								url += url.includes('?') ? '&' : '?';
								url +='buynow=1';
								chrome.tabs.update(tabs[0].id, {url: url});
							}
						});


					} else {
						// set price for the first time.
						price = data.result.data.final_price;
						message = price.toString() + " - " + data.result.data.special_price;
						console.log(message);

						
					}
					$('#log').html(message);
				}
			});
		}, 50);
	}

	
});