import * as React from 'react';
import './style.less';

export interface ILogo {
    text:string
}

export default function ({text}:ILogo){
    return <div data-text={text} className="logo bg-blue-400">{text}</div>
}