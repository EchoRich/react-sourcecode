import {findDom, compareTwoVdom} from './react-dom'
 export let updateQueue  ={
   isBatchingUpdate: false,  // 通过此变量来控制是否是批量更新
   updaters:[],
   batchUpdate() {
      for(let updater of updateQueue.updaters){
        updater.updateComponent()
      }
  }

 }
class  Updater{
   constructor(classInstance) {
     this.classInstance = classInstance;
     this.pendingState  = []
     this.callbacks =[]

   }
   addState(partialState, callback) {
     this.pendingState.push(partialState)
    if(typeof callback =="function")
       this.callbacks.push(callback)
    this.emitUpdate() //触发更新逻辑
    

   }
   emitUpdate (nextProps) {
      this.nextProps = nextProps //可能会传过来一些新的属性对象
      if(updateQueue.isBatchingUpdate){
        //批量更新这边会有很多歌this吗 每个this不一样吗 

        updateQueue.updaters.push(this)//当前处于批量更新updater实例添加到updaterqueue里面去 
        console.log(11111, updateQueue.updaters)
      }else{
        this.updateComponent()
      }
  
   }
   updateComponent() {
     let  {classInstance,  pendingState,nextProps} = this
      if(nextProps || pendingState.length> 0){
        // 如果有等待更新的队列 
        shouldUpdate(classInstance,nextProps,  this.getState())
      }

   }
   //更具老状态和 队列更新队列计算新的状态 
   getState() {
     let {classInstance,   pendingState}  = this
      let {state} = classInstance
      pendingState.forEach(nextState => {
        if(typeof nextState =="function"){
          nextState = nextState()
        }
        state = {...state, ...nextState}
      })
      pendingState.length =  0
      return state

   }

}
function shouldUpdate(classInstance, nextProps, nextState) {
  classInstance.state = nextState;
   classInstance.forceUpdate()

}
export class Component{
  static isReactComponent = true;

  constructor(props){
     this.props  = props
      this.updater  = new Updater(this)
  }
  setState(partialState, callback) {
    this.updater.addState(partialState, callback)

  }
  /**
   * 组件更新
   * 1.获取老的虚拟DOM， react元素
   * 2.根据最新的属性和状态计算出行的虚拟DOM
   * 3.然后根据比较查找差异把这些差异更新到真实DOM上面
  */
  forceUpdate(){
    let oldRenderVdom  = this.oldRenderVdom;//老的虚拟DOM
    //根据老的虚拟DOM 查找到老的真实dom
    let oldDom  =   findDom(oldRenderVdom )
    let newRenderVdom  = this.render()
     compareTwoVdom(oldDom.parentNode,oldRenderVdom, newRenderVdom)
      this.oldRenderVdom  = newRenderVdom
    
  }
}