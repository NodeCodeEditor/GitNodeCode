   var SELECTs = d.getElementsByTagName("SELECT");
   for (var i=SELECTs.length-1; i >= 0; i--) { SELECTs[i].outerHTML = SELECTs[i].value; }

   var INPUTs = d.getElementsByTagName("INPUT");
   for (var i=INPUTs.length-1; i >= 0; i--) 
   { if (INPUTs[i].getAttribute("type")=="checkbox")
        if (INPUTs[i].getAttribute("checked")=="checked") { INPUTs[i].outerHTML = "1"; } 
        else {  INPUTs[i].outerHTML = "0";  }
   }

  var TAs = d.getElementsByTagName("TEXTAREA");
  for(var i=TAs.length-1;i>=0;i--) 
  {
    TAs[i].outerHTML = "decodeURIComponent(\""+encodeURIComponent(TAs[i].value)+"\")";  
  }