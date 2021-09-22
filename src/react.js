 import {wrapToVdom} from  './util'
import {Component} from  './Component'
 function createElement(type,   config, children){
    let props  =  {...config}
     let ref;
     let key;
      if(config){
        delete config.__source; 
        delete config.__self;
        ref =  config.ref;
        key  = config.key;
        delete config.key
      }
    if(arguments.length>3){
      // it may have more than one child
     props.children  = Array.from(arguments).slice(2).map(wrapToVdom)
    }else {

    props.children  = wrapToVdom(children) 
    }
     return  {
        type, props,ref 
     }
 }
  function createRef () {
     return  {
       current: null
     }
  }
  function forwardRef(FunctionComponent){
    return class extends React.Component{
      constructor(props){
        super(props)
      }
      render() {
         return FunctionComponent(this.props, this.props.ref)
      }
    }
  }
 const React ={
    createElement,
    createRef,
    forwardRef,
    Component
 }
   export  default React