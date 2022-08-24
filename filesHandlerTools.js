// 引入相关模块
const fs = require('fs')
const path = require('path')

function commonApi (type, pathStr, callback) {
   pathStr = path.join(path.resolve(__dirname, ''), 'data', 'data.json');

  // 读取文件内容
  fs.readFile(pathStr, (err, data) => {
    if (err) return console.error('读取文件失败！！！', err);
    if (type=== 3) return console.log('查询数据')
    console.log('读取文件内容', data)
    let dataContext = JSON.parse(data.toString())
    let newData = callback(dataContext)
    let dataStr = JSON.stringify(newData, '', '\t')
    // 写入新信息
    fs.writeFile(path, dataStr, err => {
      if (!err) console.log(`${filterHandlerType(type)}操作成功`)
    })
  })
}

// 通过type值来实现对应的操作。
function filterHandlerType (type,index) {
  // 操作列表
  let typeEn =[
    insertHandler,
    deleteHandler,
    changeHandler,
    searchHandler
  ]
  let typeZn = [
    '增加数据', 
    '删除数据', 
    '修改数据', 
    '查找数据'
  ]

  return [`type${type}`][index]
}


// 增加数据
function insertHandler (path='', params) {
  console.log('增加数据')
  // 功能：向数组中指定位置插入数据，
  let curType = 0
  commonApi(curType,path,data=>{
    data.list.push(params)
    data.total = data.list.length;
    return data;
  })
}

// 删除数据
function deleteHandler (path='',dataId) {
  console.log('删除数据')
  let curType = 1
  commonApi(curType,path,data=>{
    let idIndex = data.list.findIndex(item=>item.id ===dataId)
    if(idIndex!= -1){
      data.list.splice(idIndex,1)
      data.total = data.list.length
      return data
    }else{
      console.log('数据不存在！！！')
      return
    }
  })

}

// 修改数据
function changeHandler (path='',id, params) {
  console.log('修改数据')
  let curType = 2
  commonApi(curType,path,data=>{
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

// 查找数据
function searchHandler (path='',p,s) {
  console.log('查找数据')
  let curType = 3
  commonApi(curType,path,data=>{
    let params = JSON.parse(data.toString());
    let listData = params.list.slice(p * s, (p + 1) * s); 
    console.log(listData);
    console.log(params)
  })

}

// 文件处理器--我的小心思哦
// params: type,1234/增删改查
// 后续参数根据操作的不同入参不同
// 增加，可以选择增加位置默认为list最后
const filesHandler = function (options) {
  let {
    type //操作类别
  } = options
  filterHandlerType('En',type)();
}

module.exports = filesHandler
