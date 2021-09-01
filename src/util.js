/*
 * @Author: your name
 * @Date: 2021-07-02 09:34:28
 * @LastEditTime: 2021-07-04 15:47:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactproject\src\util.js
 */
import {REACT_TEXT} from './constants'

 export function wrapToVdom (element) {
     if(typeof element=="string"  || typeof element=='number'){
       return {
          type: REACT_TEXT,  
           content:  element
       }
     }else{
        return element}
 }