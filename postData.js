var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    qs = require('querystring');

var server = http.createServer(function(req,res){
  var urlObj = url.parse(req.url);
  if (urlObj.pathname == '/login.html') {
    var rs = fs.createReadStream('./login.html');
    rs.pipe(res);
  }else if (urlObj.pathname == '/login') {
    req.on('data',function(chunk){
      var obj = qs.parse(chunk.toString());
      console.log(obj);

      if (obj.user == '123' && obj.pass == '321') {
        var rs = fs.createReadStream('./data.json');
        rs.pipe(res);
      }else{
        res.write('{"code":0,"des":"登录失败"}');
        res.end();
      }

    });
  }else if (urlObj.pathname != '/favicon.ico') {
    var rs = fs.createReadStream('./404.html');
    res.statusCode = 404;
    rs.pipe(res);
  }
}).listen(8888,function(){
  console.log('服务器开启');
})
