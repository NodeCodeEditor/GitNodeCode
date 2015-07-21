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

        var Totals = { }, ColNames = [ ];
      
        for (var i=0; i < TRs.length; i++)
        {
           var TDs = TRs[i].getElementsByTagName("TD"); if (!TDs || TDs.length<1) TDs=TRs[i].getElementsByTagName("TH");
           for (var j=0; j<TDs.length; j++)
           { var val=TDs[j].textContent;
             if (i==0) { ColNames.push( val.replace(/[^a-zA-Z0-9 ]/g,"") ); }
             else 
             {
                if (! isNaN(val) ) 
                { if ( !Totals[ColNames[j]] ) Totals[ColNames[j]] = 0;
                   Totals[ColNames[j]]+= +val; 
                }
             }

           }
        }

       var disp = ""; 
       disp+="Totals:\n";
       for (var i=0; i<ColNames.length; i++) if (Totals[ColNames[i]]) disp += ColNames[i] + "  " +  Totals[ColNames[i]] + "\n";
       disp+="\nAverages:\n";
       for (var i=0; i<ColNames.length; i++) if (Totals[ColNames[i]]) disp += ColNames[i] + "  " +  (Totals[ColNames[i]] / (TRs.length-1)) + "\n";
       
   
      alert( disp );
    }

}