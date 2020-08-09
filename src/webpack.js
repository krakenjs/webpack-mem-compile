/* @flow */

import MemoryFS from 'memory-fs';

import { getTempFile } from './util';

// eslint-disable-next-line flowtype/require-exact-type
type WebpackConfig = {
    entry? : string,
    mode? : string,
    output? : {|
        path : string,
        filename : string
    |}
};

type Webpack = (WebpackConfig) => {|
    outputFileSystem : {|
        data : {
            [string] : string
        }
    |},
    run : ((
        err : Error,
        stats : {|
            hasErrors : () => boolean,
            hasWarnings : () => boolean,
            toString : ({| errorDetails : boolean, warnings : boolean |}) => string
        |}
    ) => void) => void
|};

export async function webpackCompile({ webpack, config = { mode: 'production' }, code } : {| webpack : Webpack, config? : WebpackConfig, code? : string |}) : Promise<string> {
    
    const webpackConfig = {
        ...config,
        output: {
            ...config.output,
            path:     '/',
            filename: 'output.js'
        }
    };

    let tempFile;

    if (code) {
        tempFile = getTempFile();
        await tempFile.write(code);
        webpackConfig.entry = tempFile.filepath;
    }
    
    const compiler = webpack(webpackConfig);

    compiler.outputFileSystem = new MemoryFS();

    const result = await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }

            if (stats.hasErrors()) {
                return reject(new Error(stats.toString({
                    errorDetails: true,
                    warnings:     true
                })));
            }

            resolve(compiler.outputFileSystem.data['output.js'].toString());
        });
    });

    if (tempFile) {
        await tempFile.remove();
    }
    
    return result;
}
