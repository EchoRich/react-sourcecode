// 如果没有newPromisj或者是setTimeout的话， 那么就先放到一个队列中去， 否则就直接处理了 
import React from './react';
import ReactDOM from './react-dom';
//  class TextInput extends React.Component{
//     constructor(props){
//       super(props)
//       this.inputRef  = React.createRef()

//     }
//     getFocus =() => {
//       this.inputRef.current.focus()
//     }
//     render(){
//        return (
//          <>
//          <input type="text" ref={this.inputRef}/>
//          </>
//        )
//     }
//  }
 function TextInput (props,ref) {
    return (
      <>
      <input type="text" ref={ref}/>
      </>
    )
 }
 let ForwardTextInpur  = React.forwardRef(TextInput)
class Form extends React.Component{
  constructor (props) {
    super(props)
    this.textInputRef  = React.createRef()

  }
  getTextInpuFocus=() => {
    this.textInputRef.current.focus()
  }
  render() {
     return (
       <>
       <ForwardTextInpur ref ={this.textInputRef}>
       </ForwardTextInpur>
       <button onClick={this.getTextInpuFocus}> getFocus</button>
       </>
     )
  }
}
  let element =  <Form />
  console.log(element)

ReactDOM.render(
element,
  document.getElementById('root')
);
