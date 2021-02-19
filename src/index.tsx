import * as React from 'react';
import Core from './core/entry/index';
import config from './config';
import layout from './layout/index';

const app = new Core({
    config
});

app.layout(layout);

app.start('#root');