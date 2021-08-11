
var LANG_DATA={
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
};
//获取当前使用的语言优先级
var lang=[], langFallback='en';
try{
    var langRaw=window.navigator.languages || [window.navigator.language];
    //从URL中获取语言，覆盖浏览器的语言设置
    var langMatch=/language=([A-Za-z0-9_]+)/.exec(window.location.search);
    if(langMatch && langMatch[1]){
        langRaw=[langMatch];
    }
    //根据本页面可用的语言获取语言优先级
    for(var i=0;i<langRaw.length;i++){
        var langRawItem=langRaw[i];
        for(var langAvail in LANG_DATA){
            if(-1!=langRawItem.indexOf(langAvail)){
                lang.push(langAvail);
            }
        }
    }
}catch(e){
    console.error('Failed to get language info',e);
}

//根据当前的语言优先级和给定的key获取对应的文本
function t(key){
    try{
        var langItem, langData, i;
        for(i=0; i<lang.length; i++){
            langItem=lang[i];
            langData=LANG_DATA[langItem];
            if(langData && langData[key]){
                return langData[key];
            }
        }
        langData=LANG_DATA[langFallback];
        if(langData[key]){
            return langData[key];
        }
    }catch(e){
        console.error(e);
    }
    return key;
}

//初始化各个多语言文本
document.title=t('title');
var domTranslateList=document.querySelectorAll('[translate]');
for(var i=0;i<domTranslateList.length;i++){
    var domTranslate=domTranslateList[i];
    var translatedText=t(domTranslate.getAttribute('translate'));
    if(translatedText){
        domTranslate.innerHTML=translatedText;
    }
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
