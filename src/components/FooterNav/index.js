import React, {Component} from 'react';
import styled from 'styled-components';
import {Row} from '../Grid'
import FooterItem from './FooterItem'



const Foot = styled.footer`
     width:100%;
     position: fixed;
     bottom: 0;
     left: 0;
     background-color: #fff;
     border-top: 1px solid #eee;
     height: 1.6rem;
`;


class FooterNav extends Component {
    // React组件的构造函数将会在装配之前被调用
    constructor(props) {
        // super 必须
        // state 与 props 都是异步
        super(props);
        this.state = {
            pathname:''
        };
        console.log('constructor')
    }

    //在装配发生前被立刻调用。其在render()之前被调用
    //在此设置状态将不会触发重渲
    //这是唯一的会在服务端渲染调起的生命周期钩子函数
    // 建立设置属性导致
    componentWillMount(){
        console.log('componentWillMount')
    }

    // 在组件被装配后立即调用
    // 设置状态将会触发重渲
    componentDidMount(){
        console.log('componentDidMount')
    }

    //在装配了的组件接收到新属性前调用
    // 可以用测函数进行与 this.props 与nextProps 对比
    // 可使用this.setState()处理状态改变
    // 也已相当于 watch （不建议相当于watch使用）
    componentWillReceiveProps(nextProps){
        console.log(nextProps,'componentWillReceiveProps')
    }

    //渲染前被调用,默认true
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        return true || false;
    }
    // 当接收到新属性或状态时,在渲染前被立即调用,
    // 不会在初始化渲染时调用,不能在这调用this.setState()
    componentWillUpdate(nextProps, nextState){
        console.log('componentWillUpdate')

    }
    // 在更新发生后立即被调用
    // 该方法是操作DOM的一次机会
    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate')
    }
    // 在组件被卸载和销毁之前立刻调用
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }


    handleClick = (index,e) =>{
      console.log(index,e.target);
    };


    render() {
        console.log('render')
        return (
            <Foot>
                <Row type='flex'>
                    {
                        this.props.routers.map((item,index)=>
                                <FooterItem
                                    key={index}
                                    iconClassName={item.iconClassName}
                                    text={item.text}
                                    to={item.path}
                                    path={this.props.pathname}
                                    onclick={(e) => this.handleClick(index,e)}
                                />
                            )
                    }
                </Row>
            </Foot>
        )
    }
}

export default FooterNav;