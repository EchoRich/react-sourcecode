/*
 * @Author: your name
 * @Date: 2021-07-02 09:07:30
 * @LastEditTime: 2021-07-13 08:32:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactproject\src\reactdom.js
 */


import {REACT_TEXT} from  './constants'
 function render(vdom, container){
    let newDom  = createDom(vdom)
     container.appendChild(newDom)
 }
  function mountFunctionComponent(vdom){
     let {type, props} = vdom;
     let renderVdom  = type(props)// {h1,  {}, children: 
     vdom.oldRenderVdom = renderVdom
     return  createDom(renderVdom)


  }
   function mountClassComponent (vdom){
      let {type, props} = vdom;
       let classInstance  = new type(props)
        let renderVdom  = classInstance.render() 
        classInstance.oldRenderVdom  = vdom.oldRenderVdom = renderVdom; 
        return createDom(renderVdom)

   }
  function createDom(vdom){
     const  {type, props} = vdom
     let dom
      if(type=== REACT_TEXT){
         dom  = document.createTextNode(vdom.content)
      }else if(typeof type=="function"){// 说明这是一个创建function 的函数
   
         if(type.isReactComponent){
          //  this is class component
          return mountClassComponent(vdom)
         }else{
             return mountFunctionComponent(vdom)
         }
      

      }else{
         dom  = document.createElement(type)
        }

         if(props){ // 如果含有其他属性的话
           updateProps(dom ,{},  props)
           if(props.children){
            if(typeof props.children&&props.children.type){
              // it  has only one child
              render(props.children, dom)
            }else{
              renderConceilChildren (props.children, dom)
            }
            }
         }
         //让虚拟dom的=dom属性只想他的真实dom
         vdom.dom = dom;
          return dom 
  }
   function updateProps(dom,oldProps, newProps) {
      for(let key in newProps){
         if(key==="children"){
            continue
         }else if(key==="style"){
           let styleObject  =  newProps[key]
            for(let attr  in  styleObject){
               dom.style[attr] = styleObject[attr]
            }
         }else if(key.startsWith("on")){
           dom[key.toLocaleLowerCase()]=newProps[key]
         }else{
            dom[key] = newProps[key]
         }
      }
   }
   function renderConceilChildren (childrenVdom, parentDom){
      childrenVdom.forEach(childDom => {
         render(childDom, parentDom)
      })

   }
   //根据虚拟dom找到真实的dom

 export  function findDom (vdom) {
    let {typoe}  = vdom
     let dom  ;
      if(typeof type ==="function"){
        dom  = findDom(vdom.oldRenderVdom)
      }else{
         dom  = vdom.dom
      }
       return dom

 }
  export  function compareTwoVdom(parentDom, oldVdom, newVdom){
     let oldDom  =  findDom(oldVdom)
      let newDom  = createDom(newVdom)
      parentDom.replaceChild(newDom, oldDom)

  }

   const ReactDom  ={
      render
   }
    export default ReactDom