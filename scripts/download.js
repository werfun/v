const downloadGitRepo = require('download-git-repo')

// 把目标项目下载到当前目录下的test下
downloadGitRepo('wenfangcao/happyError', './src', false, err => {
  console.log(err ? 'SUCCESS' : "FAIL");
})
