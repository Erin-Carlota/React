import React, { Component } from 'react'

export default class Play extends Component {
    render() {
        // 接收传来的参数
        console.log(this.props.match.params)
        return (
            <div>
                Play
            </div>
        )
    }
}
