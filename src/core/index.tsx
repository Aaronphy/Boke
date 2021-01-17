import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import RootRoute from 'components/RootRoute';
import BokeContext from 'components/Context';
import DefaultLayout from '../components/DefaultLayout';
import DefaultFallBack from '../components/DefaultFallback';
import ErrorBoundary from 'components/ErrorBoundary';
import NaviLinks from '../components/NaviLinks';
import Pages from '../components/Pages';
import { LayoutProps, ContextShape, ErrorComponentProps, Options, OnRouteChange } from 'types/index';

export default class Boke {
    #options: Options;
    #root: React.FC<{}> | undefined;
    #selector: string | undefined;

    constructor({ config, ...rest }: Options) {
        this.#options = {
            ...rest,
            config: {
                ...config,
                pages: config.pages || [],
            },
        };
    }

    getConfig() {
        return this.#options.config;
    }

    layout(
        Layout: React.ComponentType<LayoutProps> = DefaultLayout,
        Fallback: React.ComponentType<ErrorComponentProps> = DefaultFallBack,
        displayedName: string = 'BokeLayout'
    ) {
        const { OnRouteChange, onError } = this.#options;
        const getConfig = () => this.getConfig();
        Layout.displayName = displayedName;

        const App: React.FC<{}> = () => (
            <HashRouter>
                <Route
                    path="/"
                    render={({ history, location }) => (
                        <RootRoute history={history} location={location} onRouteChange={OnRouteChange}>
                            <Layout Pages={Pages} NavLinks={NaviLinks} history={history} location={location}></Layout>
                        </RootRoute>
                    )}
                />
            </HashRouter>
        );

        const Root: React.FC<{}> = () => {
            const ctxValue: ContextShape = {
                getConfig,
            };
            const child: React.ReactElement = <App />;
            return (
                <ErrorBoundary componentName="root" onError={onError} FallBack={Fallback}>
                    <BokeContext.Provider value={ctxValue}>{child}</BokeContext.Provider>
                </ErrorBoundary>
            );
        };
        this.#root = Root;
    }

    start(selector = '#root', callback?: () => void) {
        const container = document.querySelector(selector);
        if (selector !== this.#selector) this.#selector = selector;
        if (!this.#root) {
            this.layout();
        } else {
            const Root = this.#root;
            ReactDOM.render(<Root />, container, callback);
        }
    }
}
