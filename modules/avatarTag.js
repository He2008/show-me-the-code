//**第 0000 题：** 将你的 QQ 头像（或者微博头像）右上角加上红色的数字，类似于微信未读信息数量那种提示效果。
// 思路: 读取图片文件,获取流数据.修改,输出
// 图像处理太麻烦了 先用imagemagick
const fs = require("fs");
const gm = require("gm");

gm("../assests/images/avatar.jpg")
  .resize(50, 50)
  .font("../assests/font/font.ttc")
  .fontSize(12)
  .fill("#ffffff")
  .drawText(0, 38, "注册会员")
  .write("../assests/images/output.png", function(err) {
    if (!err) console.log("done");
  });
