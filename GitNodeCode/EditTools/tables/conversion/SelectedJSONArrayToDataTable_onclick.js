var sel = GetHTMLOfSelectedNodes(); 

if (sel && sel.length > 1)
{ 
   sel = RemoveHTMLTags(sel);
   var JSONarr;

   try { var JSONarr = JSON.parse(sel);  }
   catch(err) {  console.log("could not JSON.parse\n" + sel); alert("JSON.parse error (see console.log)"); }

   if (JSONarr && JSONarr.length && JSONarr.length>0)
   {
      var keys = Object.keys( JSONarr[0] );
      var html="";      
      html += "<table class=DataTable encode=encodeURIComponent cellpadding=2 border=1 style='border-radius:10px'>";
      html += "<tr>";

      for(var i=0;i<keys.length;i++)
      {  var delim="\"";
          html += "<td style='background-color:#ccf;font-size:12px'>"+ delim + FormatColumnKey(keys[i]) + delim + "</td>"; 
      }
      html += "</tr>";

      for(var j=0;j<JSONarr.length;j++)
      { html+="<tr>";
        for(var i=0;i<keys.length;i++)
        { html += "<td style='font-size:8px;color:#AAA'>"+ QuoteStringsOnly( JSONarr[j][keys[i]] ) +"</td>"; }
        html+="</tr>";
      }
      html += "</table>";
      InsertHtmlAtCursor(html);  
   }

}

function QuoteStringsOnly(v)
{
    if ( typeof v == "string") return "\"" + TrimStringValue(v) + "\"";
    if ( typeof v == "object") return  JSON.stringify(v);
    return v;
}

function TrimStringValue(a) { return a.replace(/^[ ]*/g,"").replace(/[ ]*$/g,"");   }
function FormatColumnKey(a) { return a.replace(/^[ ]*/g,"").replace(/[ ]*$/g,"");   }

function RemoveHTMLTags(a)
{
   a=a.replace(/\<[^\>]*\>/g, " ");
   return a;
}