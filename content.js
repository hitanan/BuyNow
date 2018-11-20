
//   function injectScript(file, node) {
//     var th = document.getElementsByTagName(node)[0];
//     var s = document.createElement('script');
//     s.setAttribute('type', 'text/javascript');
//     s.setAttribute('src', file);
//     th.appendChild(s);
// }
// injectScript( chrome.extension.getURL('/page.js'), 'body');

var s = document.createElement ("script");
s.src = chrome.extension.getURL ('/jquery.min.js');
s.async = false;
document.documentElement.appendChild (s);
var s = document.createElement ("script");
s.src = chrome.extension.getURL ('/page.js');
s.async = false;
document.documentElement.appendChild (s);