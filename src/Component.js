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
   classInstance.updateComponent()

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
  updateComponent(){
    console.log("update component")
  }
}