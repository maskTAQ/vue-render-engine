

const path = require('path');
let config = {
    mode: 'none',
    entry: {
        main: path.join(__dirname, './src/Engine/utils/Bridge.js')
      },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // js结尾的文件，使用以下编译器
                use: {
                    loader: 'babel-loader',
                    options: {
                    }
                },
            }
        ]
    }
};
 
module.exports = config;