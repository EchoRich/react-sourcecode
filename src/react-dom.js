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
     let renderVdom  = type(props)// {h1,  {}, children: ["hello", props.name]}
     return  createDom(renderVdom)


  }
   function mountClassComponent (vdom){
      let {type, props} = vdom;
       let classInstance  = new type(props)
        let renderVdom  = classInstance.render()
        return createDom(renderVdom)

   }
  function createDom(vdom){
     const  {type, props} = vdom
     let dom
      if(type=== REACT_TEXT){
         dom  = document.createTextNode(vdom.content)
      }else if(typeof type=="function"){// 说明这是一个创建function 的函数
        debugger
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

// function render(vdom,  container){
//    let newDom  = createDom(vdom)
//     container.appendChild(newDom)
  
// }
//  function createDom (vdom) {
//     let {type, props} = vdom
//      let dom ;  
//       if(type==REACT_TEXT){ // 如果是一个文本 ， 就创建一个文本节点
//         dom = document.createTextNode(props.content)
//       }else{
//          dom  = document.createElement(type) // 原声Dom类型
//       }
//        if(props){
//          updateProps(dom, {},  props)
//         if(typeof props.children =="object"&&props.children.type){
// //如果是一个对象的话 ， 只有一个儿子
//         render(props.children, dom)
//         }else if(Array.isArray(props.children)){
//           //如果是一个数组的话 
//           renderconcileChildren(props.children, dom)

//         }

//        }
//        vdom.dom  = dom
// return dom


//  }
//   function renderconcileChildren  (childrenVdom, parentDom){
//     for(let i  =  0 ; i<childrenVdom.length; i++){
//        let childVdom  =   childrenVdom[i]
//        render(childVdom, parentDom)
//     }
//   }
//   function updateProps(dom,  oldProps, newProps){
//      for(let key  in newProps){
//         if(key=="children"){continue}
//          if(key=="style"){
//             let styleObj = newProps[key]; 
//             for(let attr  in styleObj){
//               dom.style[attr] = styleObj[attr]
//             }
//          }else{
//             dom[key] = newProps
//          }
//      }

//   }

   const ReactDom  ={
      render
   }
    export default ReactDom