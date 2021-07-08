const TAIL_CHAR={
    "!": true,
    ")": true,
    ",": true,
    ".": true,
    ":": true,
    ";": true,
    "?": true,
    "]": true,
    "}": true,
    "¨": true,
    "·": true,
    "ˇ": true,
    "ˉ": true,
    "―": true,
    "‖": true,
    "’": true,
    "”": true,
    "…": true,
    "∶": true,
    "、": true,
    "。": true,
    "〃": true,
    "々": true,
    "〉": true,
    "》": true,
    "」": true,
    "』": true,
    "】": true,
    "〕": true,
    "〗": true,
    "！": true,
    "＂": true,
    "＇": true,
    "）": true,
    "，": true,
    "．": true,
    "：": true,
    "；": true,
    "？": true,
    "］": true,
    "｀": true,
    "｜": true,
    "｝": true,
    "～": true,
    "￠": true
};
const HEAD_CHAR={
    "(": true,
    "[": true,
    "{": true,
    "·": true,
    "‘": true,
    "“": true,
    "〈": true,
    "《": true,
    "「": true,
    "『": true,
    "【": true,
    "〔": true,
    "〖": true,
    "（": true,
    "．": true,
    "［": true,
    "｛": true,
    "￡": true,
    "￥": true
};

let ctx=null;
try{
    const canvas=document.createElement('canvas');
    canvas.width=canvas.height=10;
    ctx=canvas.getContext('2d');
}catch(e){
    console.error('Failed to initialize canvas',e);
}

function matchedStr(str,matcherList=[]){
    if(!matcherList.length){
        return null;
    }
    for(let regexp of matcherList){
        try{
            let matched=regexp.exec(str);
            if(matched && 0==matched.index){
                return matched[0];
            }
        }catch(e){
            console.error(e);
        }
    }
    return str[0];
}
export function splitStr(str0, matcherList=[]){
    let result=[], str=str0.slice(), prevCharProc=null;
    while(str.length){
        //使用给定的正则进行匹配，如果匹配且匹配的位置在剩余字符串头部，则单独成为一组或整体添加到上一组末尾
        let charProc=matchedStr(str,[
            ...matcherList,
            /^[A-Za-z0-9\u0430-\u04ff]+\s*/i
        ]);
        str=str.slice(charProc.length);

        if('\n'!=charProc && (HEAD_CHAR[prevCharProc] || TAIL_CHAR[charProc] || /^\s+$/.test(charProc))){
            //将当前字符加入到最后一组中
            result[result.length-1]+=charProc;
        }else{
            //新建一个组
            result.push(charProc);
        }
        prevCharProc=charProc;
    }
    return result;
}
export default function(text, textLengthMeasure){
    //如果textLengthMeasure是字符串，则作为canvas模式的字体样式使用
    if(ctx && 'string'===typeof(textLengthMeasure)){
        ctx.font=textLengthMeasure;
    }
}
