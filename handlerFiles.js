// 引入相关模块
const fs = require('fs');
const path = require('path');


// 新增
function writeJson(params) {
  // path.resolve(__dirname,'..)   当前文件的上一级目录
     fs.readFile(path.join(path.resolve(__dirname, ''), 'data', 'index.json'), (err, data)=> {
      if (err) {
        return console.error(err);
      }
      let dataParams = JSON.parse(data.toString()); // 将读取的数据转成数组
      dataParams.list.push(params);
      dataParams.total = dataParams.list.length;
   
      // 转换成json字符串
      let str = JSON.stringify(dataParams, '', '\t'); // 写入文件   json格式化
      fs.writeFile(path.join(path.resolve(__dirname, ''), 'data', 'index.json'), str, (err) => {
        if (err) {
          console.error(err);
        }
        console.log('新增成功')
      })
    })
  };
   
  let params = {
    id: 3,
    name: '新增'
  };
   
  writeJson(params); 
 