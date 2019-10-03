const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const paths = require('../../config/paths');
const child_process = require('child_process')
const runtime = require('./runtime.js');

// 复制文件夹到新目录当中去
function copyFolder (sourceFolder, newFolder) {
  // 将demo目录中的代码复制一份到新的项目目录中去
  let contentInSourceFolder = fs.readdirSync(sourceFolder);
  fs.mkdirSync(newFolder);
  // 循环复制
  for (let tempPath of contentInSourceFolder) {
    let fullPath = path.resolve(sourceFolder, tempPath);
    let stat = fs.lstatSync(fullPath);
    if (stat.isDirectory()) {
      child_process.spawn('cp', ['-r', fullPath, newFolder]);
    } else {
      child_process.spawn('cp', ['-f', fullPath, newFolder]);
    }
  }
}

// 初始化
async function main () {
  let { projectName } = await inquirer.prompt([{
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称',
    validate (input) {
      if (!/^[a-zA-Z]+$/.test(input)) {
        return '请输入正确的项目名称（只能由大小写字母组成）';
      }
      if (runtime.checkProjectExist(input)) {
        return '该项目已经存在';
      }
      return true;
    }
  }]);
  let { templateName } = await inquirer.prompt([{
    type: 'list',
    name: 'templateName',
    message: '请选择模版',
    choices: runtime.allTemplate.map(templateName => {
      return {
        name: templateName,
        value: templateName
      };
    })
  }]);

  // 将demo目录中的代码复制一份到新的项目目录中去
  let newProjectPath = path.resolve(paths.projectPath, projectName);
  let sourceFolder = path.resolve(paths.templatePath, templateName);
  copyFolder(sourceFolder, newProjectPath);

  console.log('create success!')
  process.exit(0);
}

main();
