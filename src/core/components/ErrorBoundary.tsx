import * as React from 'react';
import { onError, ErrorComponent, LoadOrRenderError } from 'types/index';

interface ErrorBoundaryProps {
    componentName: string;
    FallBack: ErrorComponent;
    onError?: onError;
}

interface ErrorBoundaryState {
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static getDerivedStateFromError(error: Error) {
        return { error };
    }
    state: ErrorBoundaryState = {
        error: null,
    };

    reload = () => this.setState({ error: null });

    getError(error: Error): LoadOrRenderError {
        const { componentName } = this.props;
        return { ...error, componentName };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        const { onError } = this.props;
        if (typeof onError === 'function') onError(this.getError(error), info);
    }

    render() {
        const { componentName, FallBack, children } = this.props;
        const { error } = this.state;
        if (error) {
            const err = this.getError(error);
            return <FallBack name={componentName} error={err} reload={this.reload} />;
        }
        return children;
    }
}
