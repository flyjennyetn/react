
#  New Project Specification &  Use & Problem
##  Specification 

### Project  Name
   文件名必须是项目首拼加创建时间，且文件名是唯一的，`Jenkins`、`Git`和项目中都会用这个文件名
君英会：`JYH180315`
###  Tree
 - `Utils`中不允许添加新的文件，如果需要新增公共方法，请在对应文件中添加
 - 项目中的所有公共字体、图片、插件、样式和`logo`，都在`assets`文件夹中
```sh  
├─ JYH180315                      项目名  
	├─ app                        项目配置文件       
        ├── components            组件库  
        ├── pages                 容器/页  
        ├── reducers              负责处理action的state更新。  
        ├── sagas             	  负责协调那些复杂或异步的操作。  
        ├─ utils                  工具库  
		    ├── axios.js          js http库/ajax库
		    ├── cache.js          缓存处理  
		    ├── config.js         服务器、接口配置
		    ├── crypto.js         加密解密
		    ├── fetch.js          js http库/ajax库 参数格式不同 
		    ├── index.js          公共方法
		    ├── jyt.js            js http库/ajax库 参数格式不同
		    ├── native.js         原生方法   
		    ├── service.js        接口配置
		    ├── upload.js         图片上传   
		    ├── verification.js   正则校验   
		    ├── wxapi.js          调用微信方法：分享、获取地理位置等
        ├── Routes.js             路由
	    ├── template.htm          入口页  
	├── assets          		  资源库   
		├── fonts                 字体库
	    ├── images           	  图片库  
	    ├── js               	  第三方组件
		    ├── xback.js          Android 返回
	    ├── scss             	  公共样式
	    ├── favicon.ico      	  logo 
	├── client          		  客户端配置  
		├── entry.dev.js          
	    ├── entry.js           	  
	    ├── entry.prod.js               	
	    ├── index.js             	
	    ├── server.js      	      端口号
	├── .babelrc                  [babel配置文件](https://inv-veri.chinatax.gov.cn) 
	├── .gitignore          		  忽略文件
	├── favicon.ico        	  	  项目icon
	├── package.json              包配置  
	├── postcss.config.js     
	├── README.md     
	├── webpack.build.js  
	├── webpack.config.js  
```

###   Param
在接口请求中，向后台传非必传参数或者没有`value`的参数时，应传空，而不是`null`等其他值
```js
    "messageId": ""
```
###   Data   Statement
初始化数据在`reducers`里，声明根据数据类型定义

	    string:'',  
	    object:{},  
	    Array:[]
    
###  Data  Processing
数据返回格式统一处理，在`saga`文件中，并且`saga`只会返回业务层数据，不管错误、成功或失败。在创建新的页面时，请把页面中没有用到的其他引用都删除
  ```js
    yield put({type:'gstates/set/loading',isLoading: true});  
    const response = yield call(postApi,{  //请求格式统一  
	      params: queryPolicy,   //配置文件服务层
	      info:{                 //参数层
		     "rows":"10",  
		      "page":"1",  
		      "holderCercode":"XXXX",
			  "holderName":"XXXX"
	      }  
    });  
    yield put({type:'gstates/set/loading',isLoading: false});  

    //统一返回处理数据  
  
    <b>if(response && response.resultCode == '10'){</b>  
       console.log('成功')  
       yield put({  
	      type:'news/set/premQuery' , //行动名称 news ==> 模块名  premQuery ==> 表述含义
	      monPrem:response.list[0].monPrem
	   });
    }else {  
       console.log('失败')  
    }
  ```
  
###  Interface Configuration
`config.js`文件中，配置好了打包命令并且不允许修改。项目中所有用到的接口，也在该文件中增删改
```js
    //服务器配置 前面项目名字首拼 JYH 后面是项目启动日期 171229   
    function configPro (data){  
        switch (process.env.NODE_ENV){  
            case "dev":  
                return data.dev;  
                break;  
            case "uat":  
                return data.uat;  
                break;          
            case "production":  
                return data.production;  
                break;  
            default :  
                return data.dev;  
        }  
    }
  
    export const JYH171229 = {  
        API_HOST: configPro({  
            dev:'http://test.jklife.com:8888/ja-jyh-app',      //测试地址
            uat:'http://test.jklife.com:8888/ja-jyh-app-uat', //uat地址  
            production:'https://mip.jklife.com/ja-jyh-app'   //生产地址
      }),  
        APPID: configPro({  
            dev:'JA-JYH-APP',  
            uat:'JA-JYH-APP',  
            production:'JA-JYH-APP'  
      }),  
        APPKEY: configPro({  
            dev:'3O87qylsi9',  
            uat:'gLxYhKsCHb',  
            production:'gLxYhKsCHb'  
      })  
    };
```

##  Use

###  Global Data
如果需要引用其他页面中的数据，在页面中引入：
```js
    @connect(({global})=> {  
        return {global}  
    })
```
###  Images
此框架下，页面需要的图片都以下面的方式引入：
```js
   import logo from 'assets/images/logo.png';
   import login_sjh from 'assets/images/mobileIcon.png';
```    
页面引用
```js
   <img  src={logo} style={{backgroundImage: `url(${login_sjh })`}}/>
```  
    
###  Android Back
监听安卓的返回按钮文件在`xback.js`中，页面中如果需要使用直接引入，[示例](https://github.com/iazrael/xback)
```js
	 XBack.listen(()=>{  
	     alert('android 返回了');  
	     this.props.router.push('/news/details')  
	     return false;  
	 });
```  
##  Problem

###  Port  Number

  如果端口号冲突，请在`server.js`文件中修改，共两处
```js
    listen(3333, 'localhost', function (err) {  
        if (err) {  
            console.log(err);  
        }  
        console.log('Listening at http://localhost:3333');  
    });
```
###  Gitignore
`Git`中要忽略的文件或者文件夹，新建`.gitignore`文件，在`.gitignore`中编辑要忽略的文件名，或者在`sourcetree`中设置
 - `.gitignore`
  输入文件或文件夹的名字就可以忽略
  ![enter image description here](ignoreName.png)
 
 - `sourcetree`
 设置==>高级==>编辑
 ![enter image description here](setIgnore.png)

###  Android Upload Images
`Android` 上传图片取消或者返回再无反应，请联系原生解决`WebView`的问题
