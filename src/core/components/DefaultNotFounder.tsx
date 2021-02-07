import * as React from 'react';
import { NotFoundRenderParams } from 'types/index';

export default function DefaultNotFounder({ location }: NotFoundRenderParams) {
    console.log('333');
    return <div>404 {JSON.stringify(location)} not found</div>;
}
