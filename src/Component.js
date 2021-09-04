import {findDom, compareTwoVdom} from './react-dom'
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
   emitUpdate () {
    this.updateComponent()
   }
   updateComponent() {
     let  {classInstance,  pendingState} = this
      if(pendingState.length> 0){
        // 如果有等待更新的队列 
        shouldUpdate(classInstance,  this.getState())
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
function shouldUpdate(classInstance,  nextState) {
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