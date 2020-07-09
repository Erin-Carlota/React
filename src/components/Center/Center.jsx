import React, { Component } from 'react'

export default class Center extends Component {
    render() {
        return (
            <div>
                个人中心
                <div>
                    <h1>子级内容</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
