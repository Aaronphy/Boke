import * as React from 'react';
import { Location } from 'history';

export type ErrorComponentProps = {
    name: string;
    error: LoadOrRenderError;
    reload: () => void;
};

export type LoadingComponent = React.ComponentType<{}>;

export type ErrorComponent = React.ComponentType<ErrorComponentProps>;

export interface LoadOrRenderError extends Error {
    componentName: string;
    url?: string;
}

export type onError = (error: LoadOrRenderError, info?: React.ErrorInfo) => void;

export type Renderer<T> = (arg0: T, ...args: any[]) => React.ReactNode;

export interface PageConfig {
    name: string;
    showMenu: boolean;
    render?: React.ComponentType<{}>;
    [key: string]: any;
}

export interface ConfigOption {
    homepage?: string;
    pages: PageConfig[];
    token: string;
}

export interface ContextShape {
    getConfig?: () => ConfigOption;
}

export interface NotFoundRenderParams {
    location: Location;
}

export interface PageProps {
    className?: string;
    notFoundRender?: (arg: { location: Location | any }) => React.ReactNode;
}

export type OnRouteChange = (location: Location) => void;

export interface NaviLinkProps {
    render?: Renderer<{ navs: PageConfig }>;
    className?: string;
}

export interface LayoutProps {
    Pages: React.ComponentType<PageProps>;
    NavLinks: React.ComponentType<NaviLinkProps>;
    history: History;
    location: Location;
}
