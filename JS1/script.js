
function rodar(){
    var i, j
    for(i=1; i<11;i++){
        document.write("<div>")
        document.write("<table border = '1' >")
        document.write("<tr><th colspan ='2'> Produto de " + i + "</th></tr>")
        for(j=1; j<11 ; j++){
            document.write("<tr><td>" + i + "x" +j + "</td><td>"+ i*j +"</td></tr>");
        }
        document.write("<table/>")
        document.write("</div>")
    }
}

rodar()
