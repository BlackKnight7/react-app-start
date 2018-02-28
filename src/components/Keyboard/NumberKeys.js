import React, {Component} from 'react';
import propType from 'prop-types'
import styled from 'styled-components'

const Board = styled.div`
    left: 0;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 5.01rem;
    background-color: #fff;
    z-index: 9999;
    border-top: solid 1px #d0d0d0;
`;

const BoardUl = styled.ul`
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
    float: left;
    width: 100%;
    height: 4rem;
`;

const BoardLi = styled.li`
    display: block;
    float: left;
    width: 33.3%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border: solid 1px #eee;
    color: #666;
    font-size: 14px;
    font-weight: bold;
    &:active{
      background-color: #f8f8f8;
    }
`;

const Header = styled.div`
    width: 100%;
    height: 0.9rem;
    font-size: 14px;
    line-height: 0.9rem;
    text-align: center;
    color: #4b4b4b;
`;
const Close = styled.span`
    color: #449fdb;
    width: auto;
    float: right;
    padding-right: 0.3rem;
`;

const KeyboardHint = styled.div`
    position: absolute;
    top:0;
    left: 0;
    width: 30%;
    height: 1.2rem;
    border: solid 3px #e7e7e7;
    border-radius: 10%;  
    text-align: center;
    line-height: 1.2rem;
    background-color: #fff; 
    z-index: 999999;
`;

class NumberKeys extends Component {
    constructor(props) {
        super(props);
        // 初始默认数据
        this.state = {
            keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            value: '',
            currentValue: '',
            hintTop: 0,
            hintLeft: 0
        };
    }
    componentWillMount() {
        // isRandom 为true 随机排序
        if (this.props.isRandom) {
            let arr = this.state.keys;
            this.setState({
                keys: arr.sort(() => (
                    0.5 - Math.random()
                ))
            })
        }
        // 注册全局关闭键盘
        document.addEventListener('touchend', this.hideBoard, false);
    }

    componentWillUnmount() {
        document.removeEventListener('touchend', this.hideBoard, false);
    }

    // 初始化数据
    init = () => {
        this.setState({
            currentValue: '',
            hintTop: 0,
            hintLeft: 0
        })
    };
    // 按住弹出提示
    handleTouchStart = (e, val, index) => {
        let top = Math.floor(index / 3), left = index % 3;
        let hintTop = 0, hintLeft = 0;
        if (index < 10) {
            hintTop = 0.9 * top - 0.2 + 'rem';
            hintLeft = 3 + 32 * left + '%'
        } else {
            hintTop = 0.9 * 3 + 'rem';
            hintLeft = 3 + 32 + '%'
        }
        this.setState({
            currentValue: val + '',
            hintTop,
            hintLeft,
        })
    };

    // 按键
    handleTouchKey(e, val) {
        this.setState({
            value: this.state.value + val,
            currentValue: ''
        });
        // 此时的state 并没改变
        this.props.changeValue(this.state.value + val);
    }

    // 删除
    handleDelete = () => {
        if (this.state.value.length > 0) {
            let val = this.state.value.slice(0, this.state.value.length - 1);
            this.setState({
                value: val
            });
            this.props.changeValue(val);
        }
    };

    // 将可以改变 display 的方法传递进来，因为父组件不能访问子组件属性与方法
    setDisplay = (e, type) => {
        // 在同一组件内使用 react 封装 event
        if (!type) {
            this.init();
        }
        e.stopPropagation();
        this.props.setDisplay(e, type);
    };
    // 全局关闭键盘，使用捕获与冒泡原理
    hideBoard = (e) => {
        this.init();
        this.props.setDisplay(e, false);
    };
    // 阻止冒泡
    stop = (e) => {
        //在不同组件内，使用 nativeEvent 的原生 event 才能阻止冒泡
        e.nativeEvent.stopImmediatePropagation();
    };

    render() {
        // 去掉最后一个值
        let keyArr = this.state.keys.slice(0, this.state.keys.length - 1);
        // 生成 9 个key
        let keys = keyArr.map((item, index) => (
            <BoardLi onTouchEnd={(e) => this.handleTouchKey(e, item)}
                     onTouchStart={(e) => this.handleTouchStart(e, item, index)}
                     key={item}> {item} </BoardLi>
        ));

        return (
            <Board style={{display: this.props.display ? 'block' : 'none'}} onTouchEnd={(e) => this.stop(e)}>
                {/* 提示信息--按键当前值 */}
                <KeyboardHint style={{
                    display: this.state.currentValue ? 'block' :
                        'none', top: this.state.hintTop, left: this.state.hintLeft
                }}>
                    {this.state.currentValue}
                </KeyboardHint>

                {/*头部*/}
                <Header> <Close onTouchEnd={(e) => this.setDisplay(e, false)}>完成</Close> </Header>

                <BoardUl>
                    {keys}
                    <BoardLi />

                    {/*最后数字*/}
                    <BoardLi key={this.state.keys[9]}
                             onTouchStart={(e) => this.handleTouchStart(e, this.state.keys[9], 10)}
                             onTouchEnd={(e) => this.handleTouchKey(e, this.state.keys[9])}>
                        {this.state.keys[9]}
                    </BoardLi>

                    <BoardLi key='del' onTouchEnd={this.handleDelete}>删除</BoardLi>
                </BoardUl>
            </Board>
        )
    }

}

NumberKeys.propTypes = {
    // 判断键盘是否要随机打乱
    isRandom: propType.bool.isRequired,
    changeValue: propType.func.isRequired,
    display: propType.bool,
    setDisplay: propType.func.isRequired
};
export default NumberKeys