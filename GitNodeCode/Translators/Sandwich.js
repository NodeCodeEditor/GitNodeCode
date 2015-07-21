  var rws = d.getElementsByClassName("Sandwich");
   for (var i = rws.length-1; i >= 0; i=i-1)
   { 
       var L = rws[i].getAttribute("left"); if (!L) L="";
       var R = rws[i].getAttribute("right"); if (!R) R="";
       rws[i].outerHTML = L + rws[i].innerHTML + R; 
   }