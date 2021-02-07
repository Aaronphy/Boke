import * as React from 'react';
import Core from './core/entry/index';
import config from './config';

const app = new Core({
    config
});

app.layout();

app.start('#root');