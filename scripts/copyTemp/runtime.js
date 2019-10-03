const fs = require('fs');
const path = require('path');
const paths = require('../../config/paths');

// 获取当前目录所有文件夹
const allProject = fs.readdirSync(paths.projectPath).filter(tempFileName => {
  let stat = fs.lstatSync(path.resolve(paths.projectPath, tempFileName));
  return stat.isDirectory();
});

// 获取tempalte目录下所有的文件夹
const allTemplate = fs.readdirSync(paths.templatePath).filter(tempFileName => {
  let stat = fs.lstatSync(path.resolve(paths.templatePath, tempFileName));
  return stat.isDirectory();
});

module.exports = {
  allTemplate,
  // 检查项目是否已经存在
  checkProjectExist (project) {
    return allProject.indexOf(project) > -1;
  }
}
