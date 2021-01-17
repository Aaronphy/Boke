import * as React from 'react';
import { NavLink } from 'react-router-dom';
import BokeContext from 'components/Context';
import cl from 'classnames';
import { NaviLinkProps, Renderer, PageConfig } from 'types/index';

const defaultRender: Renderer<{ navs: PageConfig[] }> = ({ navs }, parentPath = '', activeClassName) => {
    return (
        <ul>
            {navs.map(({ name, title }) => {
                const path = `${parentPath}/${name}`;
                return (
                    <li key={path}>
                        <NavLink to={path} activeClassName={activeClassName}>
                            {title}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
};

export default function NaviLinks(props: NaviLinkProps) {
    const { getConfig } = React.useContext(BokeContext);
    const { className = '', render = defaultRender, activeClassName = 'boke-navilink-active' } = props;
    const { pages: navs } = getConfig!();
    return (
        <div
            className={cl('boke-navilinks', {
                [className]: className,
            })}>
            {render({ navs }, '', activeClassName)}
        </div>
    );
}
