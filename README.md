# simple-doc
a simple API Document Server.

这是一个本地部署的轻量API文档服务。通过编写doc目录下json文件生成可以阅读的API文档。

支持自动刷新，实时修改，不需要重启服务。

服务端使用nodejs+express，前端使用vue+element，实时刷新使用websocket协议

#使用方法
##启动服务
clone项目地址到本地，进入server目录，启动服务

默认占用3000和3001端口
~~~
git clone https://github.com/RichardLitt/standard-readme.git
cd server
npm install
npm start
~~~
如果后台常驻服务可以使用pm2模块启动
##配置文档
doc目录下为文档的参数
每个json文件为一个模块，文件内必须是一个Json数组。
数组中的对象是每个API的描述对象，包括接口的名称、说明、请求参数、响应参数。
####API对象的结构
|字段|类型|说明|
|:---:|:---:|:---:|
|name|String|接口名称|
|description|String|接口描述|
|request|Object|请求对象|
|response|Array|响应参数的数组|
####请求对象的结构
|字段|类型|说明|
|:---:|:---:|:---:|
|path|String|请求路径|
|method|String|请求路径方法 只能是GET POST PUT DELETE|
|body|Array| method为POST/PUT时请求参数的数组|
|query|Array| method为GET/DELETE时请求参数的数组|
####请求参数的结构
|字段|类型|说明|
|:---:|:---:|:---:|
|key|String|参数名称|
|type|String|参数类型|
|required|Boolean|是否必填|
|description|String|参数描述|
####响应参数的结构
|字段|类型|说明|
|:---:|:---:|:---:|
|key|String|参数名称|
|type|String|参数类型|
|description|String|参数描述|
###查看文档
使用浏览器打开http://localhost:3000,即可查看API文档

#自定义文档样式
前端项目使用vue-cli生成，源码在web目录下。
可以通过修改这个项目自定义自己的样式，修改后使用build命令发布到server的public文件夹下
~~~
cd web
npm install
npm run build
~~~