var LTs = d.getElementsByClassName("LogicTable");
for (var index=LTs.length-1; index >= 0 ; index--)
{
 var T = LTs[index];

 if (!T) { alert("Select table first"); }
 else
 {  
    while ( T && (!(T.nodeType==1 && T.nodeName=="TABLE"))) { T = T.parentNode; }

    if (T && T.nodeType==1 && T.nodeName=="TABLE")
    {
       var TRs = T.getElementsByTagName("TR");
       if (TRs.length >= 2)
       {
         var TDs = TRs[0].getElementsByTagName("TD");
         var cols = TDs.length;  
         if (cols >=2)
         {  var varnames = [ ];
            for (var i = 0; i < cols -1; i++)  {  varnames.push(TDs[i].textContent);  }

            var h = "";
            for (var r = 1; r < TRs.length; r++)
            {  var cond="";
                var TDs = TRs[r].getElementsByTagName("TD");
                for (var c = 0; c < cols -1; c++)
                { var condpart="";
                   var td = String(TDs[c].textContent);
                   td=td.replace(/\u00A0/g," ");  /* replace &nbsp; char to match as \s !!! */
                   td=td.replace(/\u000A/g,"");  /* remove endls  */
                   if (td.match(/^\s*$/)) { condpart=""; }
                   else 
                   { 
                     if (! td.match( /^\s*[\=\.\<\>\!].*$/ ) ) {td = " == " + td;}
                     condpart = varnames[c] + td;
console.log (condpart + " ==> " + encodeURIComponent(condpart) );
                   }
                   if (condpart!="") { if (cond!="") cond+=" && "; cond+=condpart; }
                }
                if (cond!="") h += "if (" + cond + ") {" + TDs[cols-1].innerHTML + "} \n"; 
            }
            T.outerHTML = h;
         } else { alert("LogicTables require min 2 rows and 2 columns"); }       
       }
       else { alert("LogicTables require min 2 rows and 2 columns"); }
   } else { alert("Select table first"); }
 }
}