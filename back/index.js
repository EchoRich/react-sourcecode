/*
 * @Author: your name
 * @Date: 2021-07-02 09:05:06
 * @LastEditTime: 2021-07-09 09:35:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactproject\src\index.js
 */
import React from './react';
import ReactDOM from './react-dom';
//  let element  = React.createElement('div', {
//     className: "title", 
//     style: {
//        color: 'red'
//     }
//  }, React.createElement("span",null,  'hello'),  'world')

function Welcome(props){
  //  return <h1> hello, {props.name}</h1>
   let element =  React.createElement("h1", {}, "hello", props.name)
   console.log(1111, element)
   return element
}
 let element = React.createElement(Welcome,{
   name:'zhufeng'
 })
  console.log(element)
ReactDOM.render(
element,
  document.getElementById('root')
);
