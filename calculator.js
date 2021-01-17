let total = 0;
let buffer="0";

let prevOperator=null;

const screen = document.querySelector('.screen');

document.querySelector('.calc-buttons').addEventListener('click',function(event){

buttonClick(event.target.innerText);
})
//handleNumber input
function handleNumber(val){
    if(buffer==='0'){
        buffer=val;
    }else{
        buffer=buffer+val;
    }
    
}
//handleSymbol input
function handleSymbol(val){
    switch(val.toString()){
        case 'C':
            buffer='0';
            total=0;
            prevOperator=null;
            break;
        case '=':
            if(prevOperator===null){
                return;
            }else{
                flushOperation(parseInt(buffer));
                prevOperator=null;
                buffer=''+total;
                total=0;
                break;
            }
        case '<=':
            if(buffer.length===1){
                buffer='0'
            }else{
                buffer = buffer.substring(0,buffer.length-1);
            }
        default:
            handleMathValue(val);
            break;
    }
}

//handle Button click of all types
function buttonClick(val){
    console.log(val)
if(isNaN(parseInt(val))){
    handleSymbol(val)

}else{
    handleNumber(val)

}
rerender();
}

//re render the value on screen on every button click
function rerender(){
screen.innerText=buffer;

}

//handle math symbol click
function handleMathValue(val){
    const intBuffer = parseInt(buffer);
    if(total===0){
        total=intBuffer;
    }else{
        flushOperation(intBuffer)
    }
    prevOperator=val.toString();
    buffer='0';

}

//committing math operations

function flushOperation(intBuffer){
    if(prevOperator==='+'){
            total +=intBuffer;
    }else if(prevOperator==='-'){
        total -=intBuffer;
}else if(prevOperator==='*'){
    total *=intBuffer;
}else{
    total =total/intBuffer;
}
}