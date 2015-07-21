var sel = GetHTMLOfSelectedNodes(); 

if (sel && sel.length > 1)
{ 
   var d = document.getElementById("coderoot");
   if (d)
   { var SavedHTML = d.innerHTML;
     d.innerHTML = sel;
     Translate(d);  /* Destructive DOM flattening to text */
     console.log("\n\n******************************TranslateSelectionToConsole***********************************************\n\n" + d.textContent);
     d.innerHTML = SavedHTML; /* Restoration of HTML */
   } else { alert("coderoot not found"); }

}
else 
{ alert("Select a snippet to translate first"); }

