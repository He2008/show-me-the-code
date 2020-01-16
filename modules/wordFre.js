// **第 0004 题：** 任一个英文的纯文本文件，统计其中的单词出现的个数。
// word frequency 基础分词 像 "Hong Kong" 会被分开
const fs = require('fs')


function computeFre(str){
    words ={}
    arr= str.replace(/\W/g,' ').split(' ')
    arr.forEach(word => {
        if(word||word===0){
            if(words[word]){
                words[word] ++
            }else{
                words[word] =1
            }
        } 
    });
return words
}
function __main__(){
    let path = '../assests/string.txt'
    const str = fs.readFileSync(path,'utf8')    
    res = computeFre(str)
    console.log(res)
}
__main__()