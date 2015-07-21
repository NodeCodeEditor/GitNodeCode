var T = CursorNode();

if (T) 
{  var TR, TD;
    while ( T && (!(T.nodeType==1 && T.nodeName=="TABLE"))) 
    { if (T.nodeType==1 && T.nodeName=="TD") TD = T;
      if (T.nodeType==1 && T.nodeName=="TR") TR = T;
      T = T.parentNode; 
    }

    if (TD && TR && T && T.nodeType==1 && T.nodeName=="TABLE")
    {
       /* remove duplicate rows */
       var TRs = T.getElementsByTagName("TR");
       for(var i=TRs.length-1; i>0; i--)
       {
           if (TRs[i].innerHTML == TRs[i-1].innerHTML) TRs[i].outerHTML="";
       }

      /* remove rows with all columns blank  */
      var TRs = T.getElementsByTagName("TR");
       for(var i=TRs.length-1; i>0; i--)
       {
           var TDs= TRs[i].getElementsByTagName("TD");
           var AllBlanks=1;
           for (var j=0; j<TDs.length; j++) 
              if ( ! TDs[j].innerHTML.match( /^[ \t]*$/ ) ) AllBlanks=0;
           if (AllBlanks) TRs[i].outerHTML="";
       }


    }

}
