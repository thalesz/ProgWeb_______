function cont(init){
    return function(){
        return ++init;
    }
}

var increment = cont(1);

    console.log('Primeira chamada ' + increment());
    console.log('Segunda chamada ' + increment());
    console.log('Terceira chamada ' + increment());

    
    