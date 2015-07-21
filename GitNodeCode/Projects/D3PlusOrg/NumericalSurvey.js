/*  The following HTML will be served as a data url  <script src="http://www.d3plus.org/js/d3.js"></script>
<script src="http://www.d3plus.org/js/d3plus.js"></script>
D3 Data Visualization
<div id="viz"></div>*/ 

var data = [{"row" :1,"height":5.7,"NumSites":  55,"Purchases":  3,"weight":236},{"row" :2,"height":5.1,"NumSites":  20,"Purchases":  15,"weight":170},{"row" :3,"height":5.4,"NumSites":  45,"Purchases":  6,"weight":195},{"row" :4,"height":5.9,"NumSites":  20,"Purchases":  10,"weight":195},{"row" :5,"height":5.4,"NumSites":  75,"Purchases":  10,"weight":170},{"row" :6,"height":5.8,"NumSites":  18,"Purchases":  6,"weight":192},{"row" :7,"height":5.3,"NumSites":  30,"Purchases":  10,"weight":310},{"row" :8,"height":5.6,"NumSites":  30,"Purchases":  10,"weight":204},{"row" :9,"height":5.8,"NumSites":  15,"Purchases":  25,"weight":155},{"row" :10,"height":5.1,"NumSites":  25,"Purchases":  60,"weight":115},{"row" :11,"height":5.0,"NumSites":  2,"Purchases":  20,"weight":99},{"row" :12,"height":5.9,"NumSites":  8,"Purchases":  7,"weight":176},{"row" :13,"height":5.6,"NumSites":  24,"Purchases":  4,"weight":153},{"row" :14,"height":5.5,"NumSites":  10,"Purchases":  60,"weight":159},{"row" :15,"height":5.4,"NumSites":  12,"Purchases":  5,"weight":140},{"row" :16,"height":5.6,"NumSites":  10,"Purchases":  10,"weight":143},{"row" :17,"height":5.3,"NumSites":  25,"Purchases":  15,"weight":157},{"row" :18,"height":5.7,"NumSites":  20,"Purchases":  12,"weight":179},{"row" :19,"height":5.7,"NumSites":  300,"Purchases":  12,"weight":250}]
;

var visualization = d3plus.viz().container("#viz")      .data(data).type("scatter").id("row").x("weight").y("height").draw()



