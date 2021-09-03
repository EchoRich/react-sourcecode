let state  = {number: 0}
 let isBatchingUpdate  = false
 let updateQueue   = []
 function setState (newState) {
   if(isBatchingUpdate){
     //批量执行
     updateQueue.push(newState)
   }else{
      state ={...state, ...newState}
   }

 }
 function handleClick () {
    isBatchingUpdate  = true
    setState({number: 1})
     console.log(333, state.number)
    setState({number:2})
    console.log(444, state.number)
    state = updateQueue.reduce((newState, action) => {
       return {...newState,...action}
    },  state) // 辉县放到一个队列中执行去 ，最后使用 reduce进行求和运算
     console.log(1111, state)
     isBatchingUpdate=false
 }
  handleClick()
