var T = CursorNode();

if (T) 
{  var TR, TD;
    while ( T && (!(T.nodeType==1 && T.nodeName=="TABLE"))) 
    { if (T.nodeType==1 && T.nodeName=="TD") TD = T;
      if (T.nodeType==1 && T.nodeName=="TR") TR = T;
      T = T.parentNode; 
    }

    if (TD && TR && T && T.nodeType==1 && T.nodeName=="TABLE")
    {  var TRs = T.getElementsByTagName("TR");
        alert(TRs.length + " rows");


    }
}