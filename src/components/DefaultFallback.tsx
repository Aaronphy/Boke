import * as React from 'react';
import { ErrorComponentProps } from 'types/index';

export default function DefaultFallBack({ name, error }: ErrorComponentProps) {
    return (
        <div>
            <div>Failed to render {name}</div>
            <pre>{error.message}</pre>
        </div>
    );
}
