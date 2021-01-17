import * as React from 'react';
import { NotFoundRenderParams } from 'types/index';

export default function DefaultNotFounder({ location }: NotFoundRenderParams) {
    return <div>404 {location} not found</div>;
}
