 import {wrapToVdom} from  './util'
import {Component} from  './Component'
 function createElement(type,   config, children){
    let props  =  {...config}
    if(arguments.length>3){
      // it may have more than one child
     props.children  = Array.from(arguments).slice(2).map(wrapToVdom)
    }else if(children){

    props.children  = wrapToVdom(children) 
    }
     return  {
        type, props
     }
 }
 const React ={
    createElement,
    Component
 }
   export  default React