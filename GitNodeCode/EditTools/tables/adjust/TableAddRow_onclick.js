var T = CursorNode();

if (!T) { alert("Select table first"); }
else
{  
    while ( T && (!(T.nodeType==1 && T.nodeName=="TABLE"))) { T = T.parentNode; }

    if (T && T.nodeType==1 && T.nodeName=="TABLE")
    {
       var TRs = T.getElementsByTagName("TR"); 
       TRs[TRs.length-1].outerHTML += TRs[TRs.length-1].outerHTML;   /* clone last row */
       var TRs = T.getElementsByTagName("TR");
       var TDs = TRs[TRs.length-1].getElementsByTagName("TD");
       for (var i=0; i < TDs.length; i++) TDs[i].innerHTML="&nbsp;";   /* clear each td */
   }
}
