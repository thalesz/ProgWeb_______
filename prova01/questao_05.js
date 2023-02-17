Código incorreto
Nota: 0.0

function vendas(id, qtde, preco){
    var vendas = {
        id : 0,
        qtde : 0,
        preco : 0,
        getId: function(){
            return this.id
        },
        setId: function(){
            this.id=id
        },
        getQtde: function(){
            return this.qtde
        },
        setQtde: function(){
            this.qtde=qtde
        },
        getPreco: function(){
            return this.preco
        },
        setId: function(){
            this.preco=preco
        },
        getValorTotal: function(){
            console.log(this.preco*this.qtde)
        }

    }
}

(
    function(){
        v1 = new vendas(1,2,30)
        v1.getValorTotal
        v2 = vendas(2, 3, 60)
        v2.getValorTotal
    }
)
