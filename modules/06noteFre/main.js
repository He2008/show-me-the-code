// **第 0006 题：** 你有一个目录，放了你一个月的日记，都是 txt，为了避免分词的问题，假设内容都是英文，请统计出你认为每篇日记最重要的词

const fs = require('fs');

function computeFre(str){
    words ={}
    max=[]
    arr= str.replace(/\W/g,' ').split(' ')
    arr.forEach(word => {
        if(word||word===0){
            if(words[word]){
                words[word] ++
            }else{
                words[word] =1
            }
        } 
    })
    for (let word in words){
        max.push({
            word,
            time:words[word]
        })
    }
   
return max.sort((a,b)=>b.time-a.time).slice(0,20) 
}


async function __main__(){
    let notes = {}
    const notePath = './note'
    let dir = fs.opendirSync(notePath)
    for await (let ent of dir){
        let note = fs.readFileSync(notePath+ '/' + ent.name,'utf-8')
        notes[ent.name] = computeFre(note)
    }
    console.log(notes)
}
__main__()



