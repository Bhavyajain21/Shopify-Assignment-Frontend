import React, { Component } from 'react';
const Like = (props) => {
    let classes = "fa fa-2x fa-heart";
    if(!props.liked) classes+="-o";
    return (<i onClick={props.onClick} className={`heart-icon ${classes}`}></i>);
}
 
export default Like;