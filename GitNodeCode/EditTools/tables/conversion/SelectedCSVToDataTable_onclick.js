var sel = GetHTMLOfSelectedNodes(); 
sel = sel.replace(/\<div\>/ig, "").replace(/\<\/div\>/ig, "\n");
sel = sel.replace(/\<br\>/ig, "\n");

if (sel && sel.length > 1)
{ 
   var arr = sel.split("\n"); 
  
   alert(arr.length+ " rows");

   var html="";      
   html += "<table class=DataTable encode=encodeURIComponent cellpadding=2 border=1 style='border-radius:10px'>";

   for (var i=0; i<arr.length;i++)
   {
       var F = arr[i].split(",");
       if (F.length>0)
       { html += "<tr>";
         for (var j=0; j < F.length; j++)
         {
            if (i==0) html += "<td style='background-color:#ccf;font-size:12px'>"+ F[j] + "</td>";
            if (i>=1) html += "<td style='font-size:10px;color:#AAA'>"+ F[j] + "</td>";
         }
         html += "</tr>";
       }

   }

   html += "</table>";

   InsertHtmlAtCursor(html);  
}
