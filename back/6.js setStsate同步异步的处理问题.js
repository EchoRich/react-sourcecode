// 如果没有newPromisj或者是setTimeout的话， 那么就先放到一个队列中去， 否则就直接处理了 
import React from './react';
import ReactDOM from './react-dom';
// class Welcome extends React.Component{
//   render() {
//      return (    
//        <h1 className="title" style={{color: 'red'}}>
//          <span>hello</span>
//          {this.props.name}
//        </h1>
      
//      )
//   }

// }
//  let element =  <Welcome name="yuting"/>
//   console.log(element)

// ReactDOM.render(
// element,
//   document.getElementById('root')
// );
class Counter extends React.Component{
  state={
    number: 0
  } // 定义状态有两种方法 ， 一个是constructor
  handleClick=() => {
    this.setState({
    number:this.state.number+1 })
     console.log(1111, this.state.number)
     this.setState({
       number: this.state.number+1 // 这个时候的state.number还是0 所以最后还是1 ， 这样最后的结果是 0023
     })
     console.log(222, this.state.number)
     setTimeout(() => {
        this.setState({
          number: this.state.number+1
        })
         console.log(33333, this.state.number)
        this.setState(
          {
            number: this.state.number+1
          }
        )
        console.log(33333, this.state.number)
       
     });
  }
  render(){
     return (
        <div>
   <p>{this.state.number}</p>
   <button onClick={this.handleClick}>+</button>
    
          
        </div>
     )
  }


}
  let element =  <Counter />
  console.log(element)

ReactDOM.render(
element,
  document.getElementById('root')
);
