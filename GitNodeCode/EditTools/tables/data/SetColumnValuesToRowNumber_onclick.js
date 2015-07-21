var T = CursorNode();

if (T) 
{  var TR, TD;
    while ( T && (!(T.nodeType==1 && T.nodeName=="TABLE"))) 
    { if (T.nodeType==1 && T.nodeName=="TD") TD = T;
      if (T.nodeType==1 && T.nodeName=="TR") TR = T;
      T = T.parentNode; 
    }

    if (TD && TR && T && T.nodeType==1 && T.nodeName=="TABLE")
    { var TDi=-1, TRi=-1;
       var TDsInTR = TR.getElementsByTagName("TD");
       for (var col=0; col < TDsInTR.length; col++) if(TDsInTR[col]==TD) TDi=col;

       var TRsInTable = T.getElementsByTagName("TR");
       for (var row=0; row < TRsInTable.length; row++) if(TRsInTable[row]==TR) TRi=row;

       if (TDi >= 0 && TRi >= 0) 
       { var TRs = T.getElementsByTagName("TR");
         for (var i=TRs.length-1; i >= 1; i--)
         { 
            var TDs = TRs[i].getElementsByTagName("TD");
            TDs[TDi].innerHTML=i;
           
         }
       }
       else { alert("invalid col or row => " + TDi + ", " + TRi ); }
    } 
    else 
    { alert("TD or TR or TABLE not found. Select col/row in table first"); }
}
else { alert("TD or TR or TABLE not found. Select col/row in table first"); }