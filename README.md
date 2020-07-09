## 小结
1. PropTypes
    - props类型验证和默认值
    - 使用前需要先引入一个包 'prop-types'
    - 语法：
        类型验证语法：
            组件名.propTypes = {
                a:PropTypes.string,
                b:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
                c:PropTypes.Object,
                d:PropTypes.func,
                e:PropTypes.Array.isRequired
            }
        默认值语法：
            组件名.defaultProps={
                a:[1,2,3],
                e:[0]
            }


2. fetch
    - 网络请求，es6中提供的一个全新的请求方法，是浏览器内置一个请求方式，使用时不需要下载，不需要引入,直接使用即可
    - 语法：
        fetch(url,{
            method:'get/post', // 请求方式,默认是get
            data:'key=value&key=value', // 传递post请求数据
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            credentials:'same-origin'
        })
    - fetch返回值是一个promise，需要使用.then方法接收成功的响应结果，.catch接收失败响应的结果
        成功的响应结果是一个response对象，不能直接使用，需要先解析,解析方法有：
            response.text()     解析成纯文本
            response.json()     解析成json
            response.blob()     解析成二进制
        .then(res=>res.json())
    - 跨域问题
        - 前台浏览器会出现跨域问题
        - 解决跨域问题
            1. cors : 后台允许跨域
            2. jsonp: 
                使用插件 fetch-jsonp插件
                使用步骤：
                    1. 下载 : npm i fetch-jsonp
                    2. 引入到页面中
                        import fetchJsonp from 'fetch-jsonp'
                    3. 发送请求
                        fetchJsonp(url?key=value)
                        .then(res=>res.json())
                        .then(res=>{
                            console.log(res)
                        })
                后台需要支持jsonp，如果使用的是express，使用response对象的jsonp方法即可
                    res.jsonp({code:1})
            3. 代理
                1. 在package.json中配置proxy属性，实现代理
                    {
                        "proxy":"http://localhost:5000"
                    }
                    使用时，直接写接口名称即可
                    fetch('/getdata')
                2. 使用中间件
                    1. 下载中间件 http-proxy-middleware
                    2. 创建配置文件：
                        在src文件夹下创建一个 setupProxy.js 文件
                    3. 编写配置
                        import { createProxyMiddleware } from 'http-proxy-middleware'
                        module.exports = function(app){
                            app.use('/wo',createProxyMiddleware({
                                target:'http://localhost:5000',
                                changeOrigin:true,
                                pathRewrite:{
                                    '/wo':''
                                }
                            }))
                        }
            4. 传递参数
                1. get请求
                    1. 问号携带数据
                        fetch(url?key=value&key=value)
                    2. restful数据
                        fetch(url/value1/value2)
                        对应的后台必须识别restful数据,定义成动态路由
                            app.get('/user/:uid')
                2. post请求
                    fetch(url,{
                        method:'post',
                        data:'key=value&key=value',
                        headers:{
                            'Content-Type':'application/x-www-form-urlencoded'
                        }
                    })

3. 路由 react-router 5.x
    1. 安装：
        npm i react-router react-router-dom
    2. 配置路由
        引入路由标签
        import {Route,HashRouter,BrowserRouter,Switch} from 'react-router-dom'
        <HashRouter>
            <Route path='/' component={Home} />
            <Route path='/about' component={About} />
        </HashRouter>
    3. 路由的特点：
        访问一个路径时，Route会尽可能多的匹配
        如果不想让Route尽可能多的匹配，解决方法：
            1. 精准匹配
                <Route exact path='/' component={Home} />
            2. Switch标签：
                使用这个标签包裹住所有的Route，再访问一个路径时，Route匹配永远返回第一个匹配成功的路由


## 新知识点
1. react-router
    0. HashRouter和BrowserRouter区别
        1. HashRouter:地址栏中显示： #/path
           BrowserRouter： 地址栏中显示 就是一个正常路径
        2. HashRouter，后台不需要有任何特殊配置
            BrowserRouter：后台必须特殊处理路径，否则网站就挂了
        3. 底层实现是不一样的
            HashRouter：监听hash的变化实现页面切换的
            BrowserRouter：是使用h5的history对象实现的
    1. 导航
        - 调用不同的路由。进行切换页面
        - 语法：
            使用react-router-dom中提供的Link标签，来实现导航功能
            import {Link} from 'react-router-dom'
            <Link to='/'>首页</Link>
        - to属性
            to属性的属性值就是要跳转的路由名称
        - 注意：Link标签也需要写在Router内部，否则报错
            Link可以直接写在Router内部，也可以写在某个路由组件中
    2. 路由嵌套
        - 在一个路由中还有其他子级路由，点击子级路由，可以一直在父级路由中展示不同的内容
        - 语法：
            1. 只有一层嵌套：
                父级路由要把组件名称作为标签包裹子级路由，子级路由使用Route定义
                <Center path='/center'>
                    <Route path='/center/photo' component={Photo} />
                </Center>
                注意：Center组件中需要有一个组合功能( this.props.children )
            2. 有多层嵌套：
                在指定组件内部使用 props.children , Link ,Route 配合实现多层嵌套
                具体实现：
                    1. 第一层嵌套按照上面的做法实现，定义出第二层路由
                    2. 从第二层嵌套开始，需要写在指定的组件中，使用Route来定义路由，this.props.children显示路由到的内容，而且还可以把导航功能定义在这个组件中
        - 访问子级路由
            父级路由的路径/子级路由的路径

    3. 路由重定向(bug)
        - 访问a路径，真实走的是b路径
        - 语法：
            1. 引入 Redirect 组件
            2. 在Route上使用
                1. <Route path='/a' render={()=>(<Redirect to='/b' />)}>
                2. <Redirect from='' to='' />
    4. 路由参数
        - 路由跳转时，可以携带一些数据，把这些数据给跳转后的页面，这种数据就叫路由参数
        - 语法：
            1. 定义路由
                <Route path='/play/:songid/:author' />
            2. 跳转时携带数据
                <Link to={'/play/'+songid+'/'+author} >播放</Link>
            3. play组件接收songid
                this.props.match.params 这个对象来接收
    5. 高亮
        1. 引入 NavLink组件 ，导航时使用这个标签替代Link标签
        2. 定义一个css，类名active

2. 介绍react-router 3.x

3. antd 组件库

4. mock 模拟数据
