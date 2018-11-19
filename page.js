// console.log(document.getElementById('btn_save_order'));
var SENDO_API = 'https://www.sendo.vn/m/wap_v2/full/san-pham/';

// $(()=>{

  // console.log(window.sokratiLayer.ecommerce.cart.products);
  var products = window.tag_manager_data_new.ecommerce.cart.products;
  if (!!products) {
    var productUrl = products[0].productUrl.match(/([^\/]+)(?=\.\w+(\/?)$)/)[0];
    console.log(productUrl);
    readyToBuy(productUrl);
  }
// });

var buyingInterVal;
function readyToBuy(productUrl) {
  if (window.location.href.endsWith('buynow=1')) {
    if (products[0].price == 1000) {
      $('#btn_save_order').click();
    }
    return;
  }
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
          var url = window.location.href;
          if (!url.endsWith('buynow=1')) {
            url += url.includes('?') ? '&' : '?';
            url +='buynow=1';
            window.location.href =  url;
          }
          
          
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
