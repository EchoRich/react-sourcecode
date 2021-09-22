/*
 *@functionName: JS
 *@params1: 参数1
 *@params2: 参数2
 *@params3: 参数3
 *@version: V1.0.5
*/
 import {updateQueue} from './Component'
export  function addEvent(dom, eventType,  handler) {
  let store ; 
   if(dom.store){ //单例模式了 
      store  = dom.store
   }else {
      dom.store  = {}
      store  = dom.store
   }
    store[eventType] = handler
     if(!document[eventType])// 如果有很多个元素都绑定了click时间只挂一次就可以了 
    document[eventType] = dispatchEvent

}
 function dispatchEvent(event) {
    let {target, type}  = event
     let eventType =   `on${type}`
     updateQueue.isBatchingUpdate = true
      let syntheticEvent  = createSyntheticEvent(event)
      //模拟冒泡过程
     while(target){
      let {store} =   target
      let handler  = store&&store[eventType]
      handler&&handler.call(target,syntheticEvent)
     
      target = target.parentNode

     }
     updateQueue.isBatchingUpdate = false
     updateQueue.batchUpdate()

 }
 //源码里做了一些了浏览器兼容性的适配 
  function createSyntheticEvent(event) {
     let syntheticEvent  = {}
     for(let key in event){
       syntheticEvent[key] = event[key]
     }
     return syntheticEvent

  }