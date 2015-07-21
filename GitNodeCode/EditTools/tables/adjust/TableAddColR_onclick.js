var T = CursorNode();

if (!T) { alert("Select table first"); }
else
{  
    while ( T && (!(T.nodeType==1 && T.nodeName=="TABLE"))) { T = T.parentNode; }

    if (T && T.nodeType==1 && T.nodeName=="TABLE")
    {
       var TRs = T.getElementsByTagName("TR"); 
       for  (var i=TRs.length-1; i >=0; i--) TRs[i].innerHTML += "<td>&nbsp;</td>";
    }
}
