// TODO
// eslint-disable-next-line import/no-extraneous-dependencies
const pug = require('pug');
const fs = require('node:fs/promises');

const PATHS = ['./src/pages/login/', './src/pages/reg/', './src/pages/chat/', './src/pages/error/'];

const PATH_OUT = './src/templates/';

PATHS.forEach((path) => {
    fs.readdir(path)
        .then(async (res) => {
            res.forEach((fileName) => {
                if (fileName.split('.')[1] === 'pug') {
                    const name = fileName.replace('.pug', '');

                    const templateFunction = pug.compileFile(path + fileName);

                    fs.writeFile(`${PATH_OUT + name}.js`, `export default ${templateFunction}`);
                }
            });
        });
});
