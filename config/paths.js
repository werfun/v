const path = require('path');
let projectPath = path.resolve('./');
let templatePath = path.resolve(__dirname, '..', 'template');
module.exports = {
  projectPath,
  templatePath
}
