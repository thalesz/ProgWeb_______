const fs = require ('fs');
const http = require('http');
const path = require('path');

const LerArquivoDiretorio = (caminho =  "/")=>{
    const caminhoCompleto = path.join(__dirname, caminho);

    try{
        const arquivos = fs.readdirSync(caminhoCompleto);
        const arquivosSeparadosPorLinha = arquivos.toString().replace(/\,/g, "\n");
        return arquivosSeparadosPorLinha;
    }catch(err){
        return "nao existe";
    }
};

const app = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico")
        return;
    const resposta = LerArquivoDiretorio(req.url);

    res.end(resposta);
});

app.listen(4041, ()=> console.log("Rodando Servidor"));