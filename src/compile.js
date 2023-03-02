const pug = require('pug');
const fs = require('node:fs/promises');

const PATHS = ['./pages/auth/', './pages/reg/'];
const PATH_OUT = './templates/';

for (const path of PATHS) {
  fs.readdir(path)
    .then(async (res) => {
      for (const fileName of res) {
        if (fileName.split('.')[1] === 'pug') {
          const name = fileName.replace('.pug', '');

          const options = { name: name };

          const templateFunction = pug.compileFile(path + fileName, options);

          fs.writeFile(PATH_OUT + name + '.js', 'export ' + templateFunction);
        }
      }
    });
}
