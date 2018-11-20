// console.log(document.getElementById('btn_save_order'));
var SENDO_API = 'https://www.sendo.vn/m/wap_v2/full/san-pham/';
var products;
$(function() {


  // console.log(window.sokratiLayer.ecommerce.cart.products);
  var data = window.tag_manager_data_new || window.sokratiLayer;
  if (data) {
    products = data.ecommerce.cart.products;
    if (!!products) {

      var url = new URL(window.location.href);
      var productUrl = url.searchParams.get("productUrl");
      if (!productUrl) {
        productUrl = products[0].productUrl.match(/([^\/]+)(?=\.\w+(\/?)$)/)[0];
        window.location.href = window.location.href = addParamAtTheEnd(window.location.href, 'productUrl='+ productUrl);
        return;
      }
      readyToBuy(productUrl);
    }
  }
  
  function readyToBuy(productUrl) {
    console.log(productUrl);
    if (window.location.href.endsWith('buynow=1')) {
      if (products[0].price == 1000) {
        $('#btn_save_order').prop('disabled', false);

        var btnSaveEnableInterval = setInterval(function() {
          console.log('btnSaveEnableInterval');
          if (!$('#btn_save_order').prop('disabled')) {
            clearInterval(btnSaveEnableInterval);

            $('#btn_save_order').click();
          } 
        }, 1);
      }
      return;
    }
    //checkingPrice(productUrl);
  }
  
});

function addParamAtTheEnd(url, param) {
  if (!url.endsWith(param)) {
    url += url.includes('?') ? '&' : '?';
    url += param;
  }
  return url;
}
// reload page without popup (browser_action) script.
var buyingInterVal;
function checkingPrice(productUrl) {
  
  // var productUrl = $('#url').val().match(/([^\/]+)(?=\.\w+(\/?)$)/)[0];
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

          message = 'BUY NOW !!!';
          console.log('%c ' +message,'font-weight:bold;font-size:32px;color:red');
          price = data.result.data.final_price;
          
          // reload checkout page.
          window.location.href = addParamAtTheEnd(window.location.href, 'buynow=1');
          
          
        } else {
          // set price for the first time.
          price = data.result.data.final_price;
          message = price.toString() + " - " + data.result.data.special_price;
          console.log(message);
        }
        // $('#log').html(message);
      }
    });
  }, 50);
}
