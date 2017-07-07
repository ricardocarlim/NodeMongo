var script = document.createElement('script');
script.src = location.host + "/node_modules/jquery/dist/jquery.js"; 
document.body.appendChild(script);

script.src = location.host + "/node_modules/bootstrap/dist/js/bootstrap.js";
document.body.appendChild(script);

var style = document.createElement('style');
style.src = location.host + "/node_modules/bootstrap/dist/css/bootstrap.css";
document.body.appendChild(style);
