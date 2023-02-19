var i, j;
for(i=1; i<=10; i++){
    document.write("<table border ='1'>");
    document.write("<tr><th colspan='2'> Produtos de " +i+"</th></tr>");
    for(j=1;j<=10;j++){
        document.write("<tr><td>"+i+"x"+j+"</td><td>" + i*j +"</td></th>");
    }
    document.write("</table>");
}