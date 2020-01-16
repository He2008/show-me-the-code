/**
 *  做为 Apple Store App 独立开发者，你要搞限时促销，为你的应用**生成激活码**（或者优惠券），使用 Python 如何生成 200 个激活码（或者优惠券）
 *  关键字信息加密 比对
 *  index+时间戳 使用MD5加密
 * **第 0002 题:** 将 0001 题生成的 200 个激活码（或者优惠券）保存到 **MySQL** 关系型数据库中。 
 * https://github.com/mysqljs/mysql
    **第 0003 题：** 将 0001 题生成的 200 个激活码（或者优惠券）保存到 **Redis** 非关系型数据库中。
    https://github.com/NodeRedis/node_redis
 */

// import crypto from "crypto";
const crypto = require("crypto");
const redis = require("redis");
const mysql = require("mysql");

function createAcCode(info) {
  let arr = [];
  const saltStr = Date.now().toString() + info || "no";
  for (let i = 0; i < 200; i++) {
    let md5 = crypto.createHash("md5");
    arr.push(md5.update(i.toString() + saltStr).digest("hex"));
  }
  return arr;
}
function saveRedis(arr) {
  const redisClient = redis.createClient(6379, "127.0.0.1");
  redisClient.on("error", e => {
    console.log("redis err:" + e);
  });
  redisClient.set("codeList", JSON.stringify(arr), (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });
}

function saveMySql(arr) {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "test",
    port: "3306"
  });
  connection.connect(err => {
    if (err) {
      console.log(`mysql connect err:${err}`);
    } else {
      arr.forEach((code, i) => {
          let sql = `INSERT INTO codes(codes, id) VALUES ("${code.toString()}",${i})`
          console.log(sql)
        connection.query(sql,e=>{
            console.log(e)
        });
      });
    }
  });
//   connection.end();
}

function __main__() {
  let arr = createAcCode();
  saveRedis(arr);
  saveMySql(arr);
}
__main__();
