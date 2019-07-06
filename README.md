# 成绩查询系统

登录自己的教务系统账号，查 **任何** 人的成绩。


> 现仅支持中南大学，理论上其他使用了强智科技开发的教务系统的的学校都可用。 只需修改 grade.js 和 scripts/serve.js 中 getToken、getGrade 两个函数的 url 即可。

> 基于强智科技教务系统系统漏洞。 如有不爽/侵权/违规，立马删除（haoye999han@gmail.com）！！

## feature

只要知道学号

- 查任何人的成绩！！！

- 查任何人的成绩！！！

- 查任何人的成绩！！！

## Installing

```
git clone git@github.com:haoye999/query-grade.git
cd query-grade
npm i
```

## Usage
本地使用
```
npm run start
```

构建静态文件
```
npm run build
```

使用静态文件 / 部署到服务器
```
node grade.js
```

部署时（以pm2为例）
```
pm2 start grade.js --watch
```