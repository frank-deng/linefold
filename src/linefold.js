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
    canvas.width=canvas.height=16;
    ctx=canvas.getContext('2d');
}catch(e){
    console.info('HTML5 canvas not available, default canvas-based string length measuring will not work');
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
export function group(str0, matcherList=[]){
    let result=[], str=str0.slice(), prevCharProc=null;
    while(str.length){
        //使用给定的正则进行匹配，如果匹配且匹配的位置在剩余字符串头部，则单独成为一组或整体添加到上一组末尾
        let charProc=matchedStr(str,[
            ...matcherList,
            /^[^\S\r\n]+/,
            /^[A-Za-z0-9\u00a1-\u04ff]+[^\S\r\n]*/i
        ]);
        str=str.slice(charProc.length);
        if(result.length
            && '\n'!=charProc
            && '\n'!=prevCharProc
            && (HEAD_CHAR[prevCharProc]
                || TAIL_CHAR[charProc]
                || /^[^\S\r\n]+$/.test(charProc))){
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
export function split(str,maxWidth,measureFunc){
    let result=[], start=0, end=1, len=str.length;
    while(start<len && end<=len){
        let substr=str.slice(start,end);
        if(measureFunc(substr)<=maxWidth){
            end++;
        }else if(substr.length<=1){
            result.push(substr[0]);
            start++;
            end++;
        }else{
            result.push(str.slice(start,end-1));
            start=end-1;
        }
    }
    if(start<len){
        result.push(str.slice(start,len));
    }
    
    //从尾到头扫描拆分后的分组，如果遇到不全是空白字符的分组，则结束，否则删除该分组
    for(let i=result.length-1; i>=0; i--){
        let item=result.pop();
        if(item.trim().length){
            result.push(item);
            break;
        }
    }
    return result.length ? result : [str];
}
export default function(text, maxWidth, textLengthMeasure, extraRules=[]){
    //默认的测量函数，使用HTML5 canvas
    let measureFunc=function(str){
        return ctx.measureText(str).width;
    };

    //如果textLengthMeasure是字符串，则作为canvas模式的字体样式使用
    if(ctx && 'string'===typeof(textLengthMeasure)){
        ctx.font=textLengthMeasure;
    }else if('function'==typeof(textLengthMeasure)){
        //给定的测量函数
        measureFunc=textLengthMeasure;
    }else{
        throw new TypeError('Second parameter must be a function for measuring string length');
    }

    //对字符进行分组
    let groups=group(text,extraRules);

    //找出超长的分组进行拆分
    //一旦找到超长的组，拆分过程将比较耗时，因此需要避免文本中出现过长的单词
    for(let i=groups.length-1; i>=0; i--){
        let group=groups[i];
        if(measureFunc(group) <= maxWidth){
            continue;
        }
        groups.splice(i,1,...split(group,maxWidth,measureFunc));
    }

    //将分组整合成行
    let lines=[],currentLine='';
    for(let group of groups){
        if('\n'==group){
            lines.push(currentLine);
            currentLine='';
            continue;
        }
        if(measureFunc(currentLine+group) <= maxWidth){
            currentLine+=group;
            continue;
        }
        if(measureFunc(currentLine+group.replace(/\s+$/g,'')) <= maxWidth){
            lines.push(currentLine+group);
            currentLine='';
            continue;
        }
        lines.push(currentLine);
        currentLine=group;
    }
    if(currentLine.trim().length){
        lines.push(currentLine);
    }

    //Remove trailing spaces from all the generated lines
    let times=lines.length;
    for(let i=0; i<times; i++){
        lines[i]=lines[i].replace(/\s+$/g,'');
    }
    return lines;
}
