// 首先将传递进来的数组 获取英文首字母 然后将首字母组成一个链表
// 每个节点对应一个数组，将对应的数据存放到节点数组中
// 创建链表节点
 function Entry(next,data) {
   this.next = next
   this.data = data
 }
 function LinkList() {
   let length = 0
   this.header = new Entry(null,null)
   this.end = new Entry(null,null)
   this.add = function (data) {
      let newEntry = new Entry(null,data)
     if(this.header.data){
       this.end.next = newEntry
       this.end = newEntry
     }else{
       this.header = newEntry
       this.end = newEntry
     }
     length ++
   }
   this.size = function () {
     return length
   }
   this.getValue = function (index) {
     let current = this.header
     if(index>0 && index<length){
       for (let i = 0;i<index;i++){
         current = current.next
       }
     }else if(index<0 || index>=length){
       return
     }
     return current
   }
 }

 export default LinkList

// const linkList =  new LinkList()
// const array = 'abcdefghijklmnopqrstuvwxyz'.split('')
// array.map(item=>linkList.add(item))
//
// console.log(linkList.getValue(2))
