import React from 'react';
import './App.css';
import {Route,HashRouter, BrowserRouter,Switch, Link, Redirect,NavLink} from 'react-router-dom'
import Home from '../Home/Home'
import Center from '../Center/Center';
import List from '../List/List';
import Shoucang from '../Center/Shoucang/Shoucang'
import Photo from '../Center/Photo/Photo'
import Setting from '../Center/Setting/Setting';
import Play from '../Play/Play'

function App() {
  let song_id = '2345743546'
  return (
    <div className="App">
      <BrowserRouter>
      <NavLink to={'/play/'+song_id} >播放</NavLink>
      <NavLink exact={true} to='/' >首页</NavLink>
        <NavLink to='/center' >个人中心</NavLink>
        <NavLink to='/list' >列表页</NavLink>
        <Switch>
          <Route path='/' exact component={Home} />
          {/* 路由嵌套，只有一层嵌套写法 */}
          {/* <Route path='/center' component={Center} /> */}
          <Redirect from='/center' to='/center/shoucang' />
          <Center path='/center' >
            <Route path='/center/shoucang' component={Shoucang}></Route>
            <Route path='/center/photo' component={Photo}></Route>
            <Route path='/center/setting' component={Setting}></Route>
          </Center>
          <Route path='/list' component={List} render={()=>(<Redirect to='/center/photo' />)} />
          {/* 路由传参 */}
          <Route path='/play/:id' component={Play} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
