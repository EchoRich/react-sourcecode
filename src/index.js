/*
 * @Author: your name
 * @Date: 2021-07-02 09:05:06
 * @LastEditTime: 2021-07-13 08:32:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactproject\src\index.js
 */
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
