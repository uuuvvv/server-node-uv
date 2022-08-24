
// 公用方法
// __dirname 用来获取当前文件路径
function commApi(callback) {
  let pathList = path.join(path.resolve(__dirname, '..'), 'data', 'data.json');
  fs.readFile(pathList, (err, data) => {
    if (err) return console.error(err);
    let itemData = JSON.parse(data.toString());
    let dataList = callback(itemData) || '';
    let str = JSON.stringify(dataList, '', '\t');
    fs.writeFile(pathList, str, err => {
      if (!err) console.log('操作成功~')
    })
  })
}


function writeJson(params) {
  commApi(data => {     // 使用公共的方法
   data.list.push(params);
   data.total = data.list.length;
   return data;
 })
}
writeJson({id:1,name:'haha'})  // 执行一下


// 删除
function deleteJson(id) {
  commApi(data => {
    let idx = data.list.findIndex(item => item.id === id);
    if (idx != -1) {
      data.list.splice(idx, 1);
      data.total = data.list.length;
      return data;
    } else {
      console.log('id is not exist');
      return;
    }
  })
}
 
// 修改
function changeJson(id, params) {
  commApi(data => {
    let items = data.list.find(item => item.id == id);
    for (var key in params) {
      if (items[key]) {
        items[key] = params[key];
      }
    }
    data.total = data.list.length;
    return data;
  })
}


function pageSearch(p,s) {
  // p 代表当前的页数   s代表每页的个数
  fs.readFile(path.join(path.resolve(__dirname, '..'), 'data', 'data.json'), (err, data) => {
  if (err) return console.error(err);
  let params = JSON.parse(data.toString());
  // let listData = params.list.splice(p*s,s);   //0,5   5,10
  let listData = params.list.slice(p * s, (p + 1) * s); //0,5   5,10
  console.log(listData);
  console.log(params)
})
}

pageSearch(0,6);  // 执行一下
//pageSearch(1,6);


