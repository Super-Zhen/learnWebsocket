let dbName = 'learnWebsocket';//数据库名
let version = 2; //版本号
// window.onload = function () {
  const request = window.indexedDB.open(dbName, version);
  request.onerror = function (event) {
    console.log('数据库打开报错');
  };
  request.onsuccess = function (event) {
    let db = request.result;
    console.log('数据库打开成功');
    //数据库打开成功之后 获取
  };

  request.onupgradeneeded = function (event) {
    console.log(111)
    alert("version Change");
    let db = event.target.result;//获取到的数据库
    //在数据库下面创建对象空间
    if (!db.objectStoreNames.contains("messages")) {
      var objStore = db.createObjectStore("messages", {keyPath: 'info.uid', autoIncrement: false})
      console.log("对象仓库创建成功" + objStore);
      //在对象仓库下面创建索引表
      objStore.createIndex('roomIdIndex', 'roomId', {unique: false});
      objStore.createIndex('uid', 'info.uid', {unique: false});
      console.log('索引表创建成功');
    }
    if (!db.objectStoreNames.contains("rooms")) {
      var objStore = db.createObjectStore("rooms", {keyPath: 'roomId', autoIncrement: false})
      console.log("对象仓库创建成功" + objStore);
      //在对象仓库下面创建索引表
      objStore.createIndex('roomid', 'roomId', {unique: true});
      console.log('索引表创建成功');
    }

  }


// }
// 数据库添加数据
/*
 @ params dbname 数据库名称
 @ params objStoreName 数据库表名称
 @ data  数据
 */
function addData({dbName='learnWebsocket', objStoreName='', data=''}) {
  let openRequest = indexedDB.open(dbName, version);
  openRequest.onsuccess = function (event) {
    let db = event.target.result;

    //创建事务
    let transaction = db.transaction(objStoreName, 'readwrite');

    //获取对象仓库
    let objStore = transaction.objectStore(objStoreName);

    //添加数据
    objStore.add(data);
    // for (var i=0;i<students.data.length;i++){
    //     objStore.add(students.data[i]);
    //     alert("添加数据成功！！！");
    // }
  }
}
// 从数据库获取数据
function showMessage({dbName='learnWebsocket', objStoreName='',cb='',roomId=''}){
  let openRequest = window.indexedDB.open(dbName, version);
  openRequest.onerror = function () {
    alert("打开数据库失败！！！");
  }
  openRequest.onsuccess = function (ev) {
    //获取数据库
    let db = ev.target.result;
    let count = 0
    //创建事务
    let transaction = db.transaction(objStoreName);
    //获取对象仓库
    let objStore = transaction.objectStore(objStoreName);
    //通过游标的方式遍历数据
    // var range = IDBKeyRange.lowerBound(1, false);
    // let cursorRequest = objStore.openCursor(range,'prev');
    // cursorRequest.onsuccess = function (event) {
    //   count++
    //   let cursor = event.target.result;
    //   if (cursor) {
    //     console.log(cursor);
    //     count <20 &&cursor.continue();
    //   } else {
    //     console.log('没有更多数据了！');
    //   }

      // cb(result)
    // }
    let flag = true
    var index = objStore.index("roomIdIndex")
    var range = IDBKeyRange.only(roomId);
    let cursorRequest = index.openCursor(range,'prev');
    let result = []
    cursorRequest.onsuccess = function (event) {
      count++
      let cursor = event.target.result;
      if (!cursor && cb) {
        cb(result);

      } else {
        result.push(cursor.value)
        count <20 &&cursor.continue();
      }

      // cb(result)
    }
    // index.get("0f7213d0-69df-11eb-bb21-97023e5ce2d8").onsuccess = function(e){//通过索引回调获得“小B”的信息对象
    //   var cursor = e.target.result;
    //   console.info(cursor);
    //     if (cursor) {
    //       console.log(cursor);
    //       count <20 &&cursor.continue();
    //     } else {
    //       console.log('没有更多数据了！');
    //     }
    // };
  }
}
// 更新数据每一条消息得状态
function changeStatus({dbName='learnWebsocket', objStoreName='', version='',uid=''}){
  let openRequest = window.indexedDB.open(dbName, version);
  openRequest.onerror= function () {
    alert("打开数据库失败！！！");
  }
  openRequest.onsuccess = function (ev) {
    //获取数据库
    let db = ev.target.result;
    //创建事务
    let transaction = db.transaction(objStoreName, 'readwrite');
    //获取对象仓库
    let objStore = transaction.objectStore(objStoreName);
    let result = objStore.get(uid)
    result.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        cursor.info.status = 'success'
        objStore.put(cursor)
      } else {
        console.log('没有更多数据了！');
      }
    }
  }
}
// 更改房间进入时间
function changeTime({dbName='learnWebsocket', objStoreName='',roomId=''}){
  let openRequest = window.indexedDB.open(dbName, version);
  openRequest.onerror= function () {
    alert("打开数据库失败！！！");
  }
  openRequest.onsuccess = function (ev) {
    //获取数据库
    let db = ev.target.result;
    //创建事务
    let transaction = db.transaction(objStoreName, 'readwrite');
    //获取对象仓库
    let objStore = transaction.objectStore(objStoreName);
    let result = objStore.get(roomId)
    result.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        cursor.time = Date.now()
        objStore.put(cursor)
      } else {
        console.log('没有更多数据了！');
      }
    }
  }
}
function getRooms({dbName='learnWebsocket', objStoreName='',cb=''}){
  let openRequest = window.indexedDB.open(dbName,version)
  openRequest.onerror = function () {
    alert("打开数据库失败！！！");
  }
  openRequest.onsuccess = function (ev) {
    let db = ev.target.result
    let objStore = db.transaction(objStoreName).objectStore(objStoreName)
    objStore.getAll().onsuccess =function (event) {
      let cursor = event.target.result
      debugger
      let result = []
      if(cursor){
        cb(cursor)
      }else{
        cb({msg:null})
      }
    }
  }
}
module.exports = {
  addData,
  showMessage,
  changeStatus,
  changeTime,
  getRooms
}
