## 项目描述
通过github api搜索仓库，根据关键词，开发语言，过滤关键词，定时搜索最新提交仓库，并clone到本地或者阿里云codeup。

## 演示地址 
**联系客服发送star截图免费获取最新代码**

http://gitclone.16688.online/#/repo-watch-task

test/123456

**注意：演示地址，测试账号，限制只能监控生成1条数据，如有其他需求，请联系开发人员或者部署新服务器**

**联系客服发送star截图免费获取最新代码**
![weixinkefu.png](image%2Fweixinkefu.png)
## 依赖版本
1. jdk>=17
2. vue3
2. nodejs>=18.17.1
## 项目地址
[【后端】【github】 https://github.com/mengyou658/git-repo-search-watch](https://github.com/mengyou658/git-repo-search-watch)

[【后端】【gitee】 https://gitee.com/mengyou/git-repo-search-watch](https://gitee.com/mengyou/git-repo-search-watch)

[【前段】【github】 https://github.com/mengyou658/git-repo-search-watch-ui](https://github.com/mengyou658/git-repo-search-watch-ui)

[【前段】【gitee】 https://gitee.com/mengyou/git-repo-search-watch-ui](https://gitee.com/mengyou/git-repo-search-watch-ui)

## 现有功能
1. 搜索任务管理，设置搜索关键词，开发语言，过滤关键词，定时搜索，定时clone到本地或者阿里云codeup
2. 搜索结果管理，显示搜索结果，访问仓库，访问codeup仓库
3. 仓库配置，配置仓库的clone地址，clone到本地或者阿里云codeup，配置秘钥，配置开发
4. 定时搜索任务，定时clone到本地或者阿里云codeup
5. **github trending 抓取**
6. **自动更新github dns ip至hosts**
6. **github 仓库readme展示**
6. **增加标签和归档**
6. **增加获取star数**
6. **codeup里面缺少的仓库补全**
6. **github目录树**
6. **TODO 监控任务默认搜索模式和自定义搜索模式**
6. **TODO 监控任务搜索结果测试**
6. **TODO 小程序**
## 截图
1. ![仓库配置.png](/image/仓库配置.png)
2. ![仓库监控.png](/image/仓库监控.png)
3. ![监控结果.png](/image/监控结果.png)
4. ![定时任务.png](/image/定时任务.png)
## TODO 
2. TODO 其他仓库搜索抓取，比如gitee，gitlab等
3. TODO 其他待补充
## 第三方接口说明
1. github api 调用：目前使用用户名密码配置方式调用api，配置【仓库配置】菜单
2. aliyun codeup api 需要申请ak和sk，尽量使用AccessKey管理，注意需要给仓库新增和删除的权限，同时开启管理员删除仓库权限，具体参考[阿里云codeup](https://help.aliyun.com/document_detail/460575.html?spm=a2c4g.153784.0.0.69bb76185fkjAH)
3. 爬虫方式代码已经实现（暂未测试）暂时还没有使用，后续github trending 抓取会添加测试
## 参考依赖
基于 【完整版】[ruoyi-vue-pro](https://gitee.com/zhijiantianya/ruoyi-vue-pro) 开发

## sql
sql/mysql/ruoyi-vue-pro.sql
sql/mysql/git-repo.sql
