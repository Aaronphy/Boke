import * as React from 'react';
import { LayoutProps } from '../core/entry/index';
import NaviRender from './navi';
import { layout, aside, body } from 'css/classes';


export default function Layout({Pages,NavLinks}:LayoutProps){
    return (
        <div className={layout}>
            <NavLinks className={aside} render={NaviRender}/>
            <Pages className={body}/>
        </div>
    )
}