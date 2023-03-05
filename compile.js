import { compileFile } from 'pug';
import { readdir, writeFile } from 'node:fs/promises';

const PATHS = ['./src/pages/auth/', './src/pages/reg/', './src/pages/Chat/'];
  
const PATH_OUT = './src/templates/';

for (const path of PATHS) {
  readdir(path)
    .then(async (res) => {
      for (const fileName of res) {
        if (fileName.split('.')[1] === 'pug') {
          const name = fileName.replace('.pug', '');

          const templateFunction = compileFile(path + fileName);

          writeFile(PATH_OUT + name + '.js', 'export default ' + templateFunction);
        }
      }
    });
}
