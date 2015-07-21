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
       {
         var NewTable="<table class=DataTable encode=encodeURIComponent cellpadding=2 border=1 style='border-radius:10px'>";

         var TRs = T.getElementsByTagName("TR");
         var bSpool=0;
         for (var i=0; i<TRs.length; i++)
         {   if(!bSpool) 
             { var TDs = TRs[i].getElementsByTagName("TD"); if (!TDs||TDs.length<=0) TDs=TRs[i].getElementsByTagName("TH");
                if (TDs && TDs.length > 0)
                {
                 NewTable+="<tr>";
                 for (var j=0; j<TDs.length;j++)
                   NewTable += "<td style='background-color:#ccf;font-size:12px'>\"Col"+ j+ "\"</td>"; 
                 NewTable+="</tr>";
                 bSpool=1;
               }
             }
             if (bSpool) NewTable += TRs[i].outerHTML;
         }

        NewTable += "</table>";
        T.outerHTML = NewTable;
       }
       else { alert("invalid col or row => " + TDi + ", " + TRi ); }
    } 
    else 
    { alert("TD or TR or TABLE not found. Select col/row in table first"); }
}
else { alert("TD or TR or TABLE not found. Select col/row in table first"); }





