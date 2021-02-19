const path = require('path');

module.exports = {
    tsx: true,
    less: true,
    entry:"./src/index.tsx",
    disableCSSModules:true,
    html: {
        title: 'Aaronphy',
        template: 'public/index.html'
    },
    extraBabelPlugins:[
        [
             require('@babel/plugin-proposal-decorators').default,
             {
                 legacy: true
             }
         ],
         ["@babel/plugin-proposal-class-properties"]
    ],
    alias: {
        "components": path.resolve(__dirname, 'src/core/components/'),
        "utils": path.resolve(__dirname, 'src/core/utils/'),
        "pages": path.resolve(__dirname, 'src/pages/'),
        "servcies": path.resolve(__dirname, 'src/servcies/'),
        "types":path.resolve(__dirname, 'src/core/types/'),
        "css":path.resolve(__dirname,'src/css/')
    }
};
