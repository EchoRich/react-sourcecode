/*
 * @Author: your name
 * @Date: 2021-07-02 09:05:06
 * @LastEditTime: 2021-07-13 08:32:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactproject\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
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
 class Clock extends React.Component{
    constructor(props){
      super(props)
       this.state  ={
         date:new Date()
       }
    }
     componentDidMount() {
        this.timer  = setInterval(() => {
          this.tick()
        }, 1000);
     }
     // 组件将要卸载
     componentWillUnmount() {
       clearInterval(this.timer)
     }
     //类的属性函数这样写this永远指向组件的实例 ， 因为是es6的写法这样写的话 ， 就是箭头函数的this指向了父组件， 也就是类的实例
     tick =() => {
        console.log(333333)
       this.setState({date: new Date()})
     }
     render(){
        return (
           <div>
             时间：
             {this.state.date.toLocaleTimeString()} 
             可以看出来只是时间值跟着变化了 
             </div>  
        )
     }

 }
  let element =  <Clock />
  console.log(element)

ReactDOM.render(
element,
  document.getElementById('root')
);
