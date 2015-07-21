var DTs = d.getElementsByClassName("DataTable");
console.log("     " + DTs.length + " DataTables" );

for (var i=DTs.length-1; i >= 0; i--)
{
      TranslateDataTable(DTs[i]);
}


function TranslateDataTable(dt)  /*   returns [ { a:v, b:v2,...}, {...} ]     */
{  var html = "[", F = [ ];
   var EncType = dt.getAttribute("encode"); 
   var TRs = dt.getElementsByTagName("TR");
   for (var i=0; i < TRs.length; i++)
   { var TDs = TRs[i].getElementsByTagName("TD"), AVs="";
      for (var j=0; j <TDs.length; j++)
      { var val=TDs[j].textContent;

        if (i==0) /* header field as is */
        {  F[j] = val;  }

        else /*data row -- encode if specified to handle quotes and special chars etc */
        {  if (EncType=="encodeURIComponent") { val= encodeURIComponentIfString(val);  } 
           else { val= val.replace(/[\n\r]/g, ""); }
            if(j>=1) AVs+=",";   AVs += F[j] + ":" + val ;  
        }
      }
      
      if (i>=1) { if (i>=2) html += ",";    html += "{" + AVs + "}"; }
   }
   html+="]";
   dt.outerHTML = html;
}

function encodeURIComponentIfString(v)
{ var arr = v.match(/^\"(.*)\"$/);
   if(arr && arr.length == 2) return "\"" + encodeURIComponent( arr[1] ) + "\""; 
   return v;
}