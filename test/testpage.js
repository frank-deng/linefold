var canvas=document.getElementById('testCanvas');
var ctx=canvas.getContext('2d');
console.log(window.linefold);
function refreshCanvas(){
    var width=Number(document.querySelector('[name=width]').value),
        lineHeight=Number(document.querySelector('[name=lineHeight]').value),
        font=document.querySelector('[name=font]').value,
        text=document.querySelector('[name=textInput]').value;
    var lines=linefold(text,width,font);
    console.log(lines);
    canvas.width=width;
    ctx.font=font;
    return false;
}
