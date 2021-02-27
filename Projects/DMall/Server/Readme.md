## 创建项目

```
npm init -y
```

## 添加 expres
```
npm i express -S
```

## 创建WebServer
```
const express=require('express')
const app=express()

app.use(express.static('./dist'))

app.listen(80,()=>{
    console.log('Server running at http://127.0.0.1');
})
```

## 启用GZIP
通过服务器端使用Express做gzip压缩
```
// 安装相应包
npm install compression -D

//导入包
const compression=require('compression')

//启用中间件
app.use(compression())
```

## 配置Https服务
- 申请SSL证书（http://freessl.org）
- 下载SSL证书，full_chain.pem公钥，private.key私钥

```node
const https=require('https')
const fs=require('fs')
const options={
    cert:fs.readFileSync('./full_chain.pem'),
    key:fs.readFileSync('./private.key')
}
https.createServer(options,app).listen(443)
```

## 使用pm2管理应用

### 安装pm2
```
//服务器安装pm2
npm i pm2 -g
```
### 启动项目 
```
pm2 start 脚本 --name 自定义名称
```

### 查看运行项目
```
pm2 ls
```

### 重启项目 
```
pm2 restart  自定义名称
```

### 停止项目 
```
pm2 stop  自定义名称
```

### 删除项目 
```
pm2 delete  自定义名称
```
