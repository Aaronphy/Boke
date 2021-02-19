import * as React from 'react';
import { PageConfig, Renderer } from 'types/index';
import { MenuOutlined, CloseOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import Logo from './logo';
import { link, activeLink, linkIcon, linkText, popUpMenuHide, popUpMenuShow } from 'css/classes';



const  NaviRender:Renderer<{ navs: PageConfig[] }> =({ navs }, parentPath = '', activeClassName)=>{
    const [visible,setVisible] = React.useState(false);
    return (
        <div className="flex flex-row sm:flex-col justify-between">
            <Logo text='Aaronphy'/>
            <ul className="flex-col py-4 space-y-1 hidden sm:flex">
                {navs.map(({ name, title, icon }) => {
                    const path = `${parentPath}/${name}`;
                    const Icon = icon;
                    return (
                        <li key={path}>
                            <NavLink to={path} className={link} activeClassName={activeLink}>
                                <Icon className={linkIcon} />
                                <span className={linkText}>{title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <div className={`sm:hidden h-12 p-2`}>
              {visible ?
              <CloseOutlined onClick={()=>setVisible(false)} className="text-gray-900 w-6 h-6"/> :
              <MenuOutlined onClick={()=>setVisible(true)} className="text-gray-900 w-6 h-6"/>}
            </div>
            <div className={visible?popUpMenuShow:popUpMenuHide}>
               <ul className="flex-col py-4 space-y-1 flex">
                {navs.map(({ name, title, icon }) => {
                    const path = `${parentPath}/${name}`;
                    const Icon = icon;
                    return (
                        <li key={path}>
                            <NavLink to={path} className={link} activeClassName={activeLink}>
                                <Icon className={linkIcon} />
                                <span className={linkText}>{title}</span>
                            </NavLink>
                        </li>
                    );
                })}
                </ul>
            </div>
        </div>
    )
}

export default NaviRender;