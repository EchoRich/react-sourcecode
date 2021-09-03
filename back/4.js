let queue  = [] 
 queue.push(state =>({number: state.number+1}))
 queue.push(state => ({number: state.number+1}))
  let state={number: 0}
 queue.reduce((newState, action) => {
   return action(newState) // 执行之后返回新状态在让action执行 
 }, state)
