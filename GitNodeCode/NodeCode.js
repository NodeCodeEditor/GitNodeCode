var sys = require("sys"),
http = require("http"),
path = require("path"),
url =require("url"),
fs = require("fs");

var SrcExtWhitelist = [ "js", "pl", "c", "java", "cpp", "py", "php", "h", "html", "txt" ];
var ImgExtWhitelist = [ "jpg", "jpeg", "png", "gif", "bmp" ];

http.createServer( function(request, response ) { if (request.url.substr(request.url.length-4,4)==".ico") { console.log("\n\n((ignoring .ICO request))"); } else {console.log("\n\nREQUEST====>" + request.url); }

var reqpath = url.parse(request.url).pathname;
var full_path = path.join(process.cwd(), reqpath);

var qarr = request.url.split("?"); var argn = new Array(); var argv = new Array();
if (qarr.length > 1){ var params = qarr[1].split("&"); 
for (var i=0; i < params.length; i++) { var p=params[i].split("="); argn[i]=p[0]; argv[i]=decodeURIComponent(p[1]); }

}

console.log("Analyzing if AJAX command..."); 



if (argn[0] == "NodeServerCMD") 
{ console.log("NodeServerCMD detected..."); 
var bproc=0; 
if (argv[0] == "readFile") {	
console.log("readFile detected..."); 
if (argn[1]=="filename"){ console.log("filename detected..." + argv[1]); 
var fullfn = path.join(process.cwd(), argv[1]); 
console.log("fetching " + fullfn);
fs.readFile(fullfn, "binary", function(err, file)
{ if(!err)
{ console.log("readFile contents=" + file.length);
response.writeHeader(200, {"Content-Type": "text/plain"} ); 
response.write(file, "binary"); 
response.end(); }
else { response.writeHeader(200, {"Content-Type": "text/plain"} ); 
response.write("ERROR: readFile"); 
response.end(); }
}
); }
else { response.writeHeader(200, {"Content-Type": "text/plain"} ); 
response.write("ERROR: readFile: filename param missing\n"); 
response.end(); }
bproc=1;
}


if (argv[0]=="writeFile"){ if(argn[1] == "filename" && argn[2] == "data") { var fullfn = path.join(process.cwd(), argv[1]); 
var D=fullfn.split("/"); var FC = D[D.length-1].split("."); var Ext = FC[FC.length-1]; console.log("writing " + fullfn);


var fullBody = "";
request.on('data', function(chunk) { fullBody += chunk.toString(); });
request.on('end', function() { 
/* beginning of disk write section */ 
if (fullfn.indexOf("/..") < 0 && SrcExtWhitelist.indexOf(Ext)>=0 ) {bproc=1;
fs.writeFile( fullfn, decodeURIComponent(fullBody) , function(err){ if(err) { console.log("errfilesave " + err); 
response.writeHeader(200, {"Content-Type": "text/plain"} ); 
response.write("0"); 
response.end(); }
else { console.log("filesaved"); 
response.writeHeader(200, {"Content-Type": "text/plain"} ); 
response.write("1"); 
response.end(); }
}
); 
}
/* end of disk write section */

});


}
else { console.log("\n\n>>>>>>Bad format, expecting: NodeServerCMD=writeFile&filname=y&data=z "); }
}


if (argv[0]=="createFile"){ bproc=1;
if(argn[1] == "filename") { var fullfn = path.join(process.cwd(), argv[1]); 
var D=fullfn.split("/"); var FC = D[D.length-1].split("."); var Ext = FC[FC.length-1]; console.log("creating file " + fullfn+ ".html from " + fullfn );


if (fullfn.indexOf("/..") < 0 && SrcExtWhitelist.indexOf(Ext)>=0 ) {bproc=1;
fs.readFile(fullfn+".html", "binary", function(err, file)
{ if(err)
{ /* fs.createReadStream(fullfn).pipe(fs.createWriteStream(fullfn+".html")); */ 
var txt =fs.readFileSync(fullfn);
fs.writeFileSync(fullfn+".html", Text2HTMLConversions(txt));


response.writeHeader(200, {"Content-Type": "text/plain"} ); 
response.write("1"); 
response.end(); }
else { response.writeHeader(200, {"Content-Type": "text/plain"} ); 
response.write("ERROR: createFile filename " + fullfn + ".html already exists!"); 
response.end(); }
}
); }
}
else { console.log("\n\n>>>>>>Bad format, expecting: NodeServerCMD=createFile&filename=y "); }
}



if (!bproc) {	response.write("Bad NodeServerCMD\n"); 
response.end(); }
}




else { 
console.log("Generic Webserver handling..."); 

var acctxt = "reqpath=" + reqpath + " cwd=" + process.cwd() + " => "+ full_path; console.log( acctxt );

fs.exists(full_path, function(exists) { if(exists) { fs.readFile(full_path, "binary", function(err, file)
{ if(!err)
{ console.log("serving file " + full_path);
response.writeHeader(200);
var html=file; 
if (full_path.substr(full_path.length-11,11)=="/index.html") { response.writeHeader(200, {"Content-Type": "text/html"} ); 
html = file;
var filelist = GetFiles(full_path.substr(0, full_path.length-10), reqpath.substr(0, reqpath.length-10), 1); 
html = html.replace( "[FILESELECTION]", filelist ); }
response.write(html, "binary"); 
response.end(); }
else { response.writeHeader(500, {"Content-Type": "text/plain"} ); 
response.write(err + "\n"); 
response.end();	}
}
); }
else { response.writeHeader(404, {"Content-Type": "text/plain"} ); 
response.write("404 Not Found\n"); 
}
}
); }
}
).listen(8080);
console.log("Server Running on 8080");	

function GetFiles(dir, httpdir, bOpen)
{
var ImgDir = "EditorFiles/img/"; 

var fs = fs || require('fs'); var files = fs.readdirSync(dir); var html=""; 

files.forEach(function(file) {
if (fs.statSync(dir + file).isDirectory()) 
{ html += "<" + "div class=DECEMenuDir title='" + decodeURIComponent(httpdir + file) + "'>" + file; html += GetFiles(dir + file + "/", httpdir + file + "/", 0); html += "<" + "/div>"; } else 
{ if (file.substr(file.length-5,5)==".html") { html += "<" + "div class=DECEMenuHTMLFile title='" + decodeURIComponent(httpdir + file) + "'>" + file + "<" + "/div>"; } else { var F = file.split("."); var arr = FilenameToPathFileExtArr(file); /* if (F.length==2 && ImgExtWhitelist.indexOf(F[1]) >=0) */ if ( ImgExtWhitelist.indexOf( arr[2] ) >= 0) { html += "<" + "img src='" + decodeURIComponent(httpdir + file) + "' title='" +decodeURIComponent(httpdir + file)+ "' class=DECELibraryImage>"; } else { html += "<" + "div class=DECEMenuOtherFile title='" + decodeURIComponent(httpdir + file) + "'>" + file + "<" + "/div>"; } } } 

});
if (bOpen) { html = "<" + "div class=DECEMenuOpen>" + html + "<" + "/div>"; } 
else { html = "<" + "div class=DECEMenuToggle>" + html + "<" + "/div>"; } 
return html;
}

function Text2HTMLConversions(txt) { if (!txt) return; txt = String(txt); var html=""; for (var i=0; i < txt.length; i++) { var c=txt.substr(i,1); if (c==String.fromCharCode(60)) { html+="&" + "lt;"; continue; } if (c==String.fromCharCode(62)) { html+="&" + "gt;"; continue; } if (c==String.fromCharCode(10)) { html+="<br>"; continue; } html+=c; } return html; } 

function FilenameToPathFileExtArr(filename) { var extstr = ""; var file = ""; var arr = new Array("","",""); var bext=0; for (var n = filename.length-1; n >= 0; n--) { var c = filename.substr(n,1); if (c=="/") { arr[1] = file; arr[0] = filename.substr(0,n); break; } if (c=="."&&!bext) { arr[2] = extstr; file=""; bext=1; } else { file=c+file; extstr=c+extstr; } } return arr; } 
