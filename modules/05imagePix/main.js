// 有个目录，装了很多照片，把它们的尺寸变成都不大于 iPhone5 分辨率的大小。1136*640 
// 批量图片裁剪
const fs = require('fs');
const path = require('path');
const gm = require('gm');
async function __main__(){
    let path = './img'
    const dir = await fs.promises.opendir(path)
    for await(const dirent of dir){
      if(dirent.isFile()){
        console.log(dirent)
        handleImages(dirent.name)

      }
    }

}
function handleImages(name){
  gm('./img'+'/'+name)
  .resize(1136,640,'>')
  .setFormat('JPEG')
  .write('./img/'+name.split('.')[0]+'.jpeg',(err,v)=>{
    console.log(err,v)
  })

}
__main__()
// const fs = require('fs');

// async function print(path) {
//   const dir = fs.readdirSync(path);
//   console.log(dir)

// }
// print('./img').catch(console.error);