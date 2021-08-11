import Lang from './lang.js';
try{
    const lang=new Lang({
        en:{
            title:'Line Folding Test Page',
            width:'Width',
            fontSize:'Font Size',
            font:'Font',
            bold:'Bold',
            italic:'Italic',
            text:'Text',
            effect:'Effect'
        },
        ja:{
            title:'テキストの改行のテストページ',
            width:'幅',
            fontSize:'サイズ',
            font:'フォント',
            bold:'太字',
            italic:'斜体',
            text:'テキスト',
            effect:'効果'
        },
        zh:{
            title:'文本换行算法测试页面',
            width:'宽度',
            fontSize:'字体大小',
            font:'字体',
            bold:'加粗',
            italic:'倾斜',
            text:'正文',
            effect:'效果'
        }
    });
    document.title=lang.get('title');
    let domTranslateList=document.querySelectorAll('[translate]');
    for(let i=0; i<domTranslateList.length; i++){
        let domTranslate=domTranslateList[i];
        domTranslate.innerHTML=lang.get(domTranslate.getAttribute('translate'));
    }
}catch(e){
    console.error('Failed to load translation',e);
}

var canvas=document.getElementById('testCanvas'),
    ctx=canvas.getContext('2d');
var textInput=document.querySelector('[name=textInput]'),
    widthInput=document.querySelector('[name=width]'),
    fontSizeInput=document.querySelector('[name=fontSize]'),
    fontFamilyInput=document.querySelector('[name=fontFamily]'),
    fontBoldInput=document.querySelector('[name=fontBold]'),
    fontItalicInput=document.querySelector('[name=fontItalic]'),
    displayFormTitle=document.getElementById('displayFormTitle'),
    displayForm=document.getElementById('displayForm');
function refreshCanvas(){
    var text=textInput.value;
    if(!text){
        displayFormTitle.style.display='none';
        displayForm.style.display='none';
        return;
    }
    var width=Number(widthInput.value),
        fontSize=Number(fontSizeInput.value),
        fontFamily=fontFamilyInput.value,
        lineHeight=Math.ceil(fontSize*3/2),
        font=fontSize+'px '+fontFamily;
    if(fontItalicInput.checked){
        font='Italic '+font;
    }
    if(fontBoldInput.checked){
        font='Bold '+font;
    }

    var lines=linefold(text,width,font);
    canvas.width=width;
    canvas.height=lineHeight*lines.length;
    ctx.font=font;
    ctx.fillStyle='#000000';
    ctx.textBaseline='middle';
    var y=Math.round(lineHeight/2);
    for(var i=0;i<lines.length;i++){
        var line=lines[i];
        ctx.fillText(line,0,y);
        y+=lineHeight;
    }
    displayFormTitle.style.display='block';
    displayForm.style.display='block';
}

const inputForm=document.getElementById('inputForm');
inputForm.addEventListener('input',refreshCanvas);
inputForm.addEventListener('change',refreshCanvas);
