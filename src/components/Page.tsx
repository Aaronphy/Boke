import * as React from 'react';
import { Route } from 'react-router-dom';
import { Location } from 'history';
import cl from 'classnames';
import { PageConfig, PageProps } from 'types/index';
import BokeContext from 'components/Context';
import DefaultNotFounder from 'components/DefaultNotFounder';

const pagesVM = new WeakMap();

const wrapPages = (pages: PageConfig[], result: PageConfig[] = [], parentPath = '') => {
    pages.forEach((page) => {
        const computedPath = `${parentPath}/${page.name}`;
        page.__computedPath = computedPath;
        result.push(page);
    });
    return result;
};

const findMatch = (pages: PageConfig[], pathname: string) => {
    const pathWithoutTrailingSlash = pathname.replace(/\/$/, '');
    return pages
        .filter((page) => {
            const { computedPath } = pagesVM.get(page);
            let match = false;
            const parts = pathname.split('/');
            do {
                match = computedPath === parts.join('/');
                if (match) break;
                parts.pop();
            } while (parts.length);
            return match;
        })
        .map((page) => {
            const { computedPath } = pagesVM.get(page);
            return {
                path: computedPath,
                params: { pathname: page.name },
                isExact: computedPath === pathWithoutTrailingSlash,
            };
        });
};

export default function Page({ notFoundRender = DefaultNotFounder, className = '' }: PageProps) {
    const { getConfig } = React.useContext(BokeContext);

    const { pages } = getConfig!();

    const listPages = React.useMemo(() => {
        return wrapPages(pages);
    }, [pages]);

    listPages.forEach((page: PageConfig) => {
        if (pagesVM.has(page)) return;
        pagesVM.set(page, { Component: page.render, computedPath: page.__computedPath });
    });

    const renderPage = (locaiton: Location) => {
        const matches = findMatch(listPages, locaiton.pathname);
        return (
            <>
                {listPages.map((page) => {
                    const { Component, computedPath } = pagesVM.get(page);
                    const match = matches.find((p) => p.path === computedPath) || null;
                    if (match) {
                        return <Component key={computedPath} match={match} location={locaiton} />;
                    }
                    return null;
                })}
                {!matches.length && notFoundRender({ location })}
            </>
        );
    };

    return (
        <div
            className={cl('Boke-page', {
                [className]: className,
            })}>
            <Route path="/:pathname?" render={({ location }) => renderPage(location)} />
        </div>
    );
}
