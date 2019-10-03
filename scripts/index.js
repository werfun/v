var program = require('commander');

program.parse( process.argv )
require('./command/' + program.args || 'index' + '.js') // 根据不同的命令转到不同的命令处理文件
