import React, { Component } from 'react'
import Common from './Common/Common'
import Yinsi from './Yinsi/Yinsi'
import {Route,Link} from 'react-router-dom'


export default class Setting extends Component {
    render() {
        return (
            <div>
                setting
                <div>
                    <Link to='/center/setting/common'>通用</Link>
                    <Link to='/center/setting/yinsi'>隐私</Link>
                    <h3>第三级路由</h3>
                    {this.props.children}
                </div>
                {/* 定义子级路由 */}
                <Route path='/center/setting/common' component={Common} />
                <Route path='/center/setting/yinsi' component={Yinsi} />
            </div>
        )
    }
}
