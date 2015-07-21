var DDTs = d.getElementsByClassName("DelimitedDataTable");
  for (var i=DDTs.length-1; i >= 0; i--)
  { var ColDelimiter=DDTs[i].getAttribute("ColDelimiter"); 
     var RowDelimiter = DDTs[i].getAttribute("RowDelimiter");
     if (!ColDelimiter)ColDelimiter=",";
     if (!RowDelimiter)RowDelimiter=",";
     var RowsArr=[ ];
     var TRs = DDTs[i].getElementsByTagName("TR");
     for (var r=0; r<TRs.length; r++)
     { var ColsArr=[ ];
        var TDs = TRs[r].getElementsByTagName("TD");
        for(var c=0; c< TDs.length; c++) ColsArr.push(TDs[c].innerHTML);
        RowsArr.push(ColsArr.join(ColDelimiter));
     }
     DDTs[i].outerHTML = RowsArr.join(RowDelimiter);
  }