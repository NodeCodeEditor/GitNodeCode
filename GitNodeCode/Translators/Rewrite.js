
var rws = d.getElementsByClassName("Rewrite");
console.log( "        " + rws.length + " Rewrites");
for (var i = rws.length-1; i >= 0; i=i-1)
{
    console.log( "         Rewriting " + rws[i].outerHTML.substring(0,80) + "...  AS=> " + rws[i].getAttribute("title"));
    rws[i].outerHTML = rws[i].getAttribute("title");   
}

