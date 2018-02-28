import React, {Component} from 'react';
// import HandToucher from '../common/handToucher'
import {Keyboard} from '../components'

class Tab2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShow: false,
            value:''
        };
    }
    setDisplay = (e,type) =>{

        this.setState({
            isShow : type
        });
        if(e){

            if(e.nativeEvent){
                // 全局取消冒泡
                e.nativeEvent.stopImmediatePropagation();
                // 取消默认行为
                e.nativeEvent.preventDefault();
                // e.nativeEvent.target.focus();
            }
        }
    };
    getKeys = (val) =>{
        this.setState({
            value:val
        })
    };

    render() {
        return (
            <div ref={(el) => this.el = el}>
                <input type="text" className='damo'
                       value={this.state.value}
                       onTouchEnd={(event)=>  this.setDisplay(event,true)}
                       placeholder='h5键盘例子'
                />
                <Keyboard isRandom={true} display={this.state.isShow} setDisplay={this.setDisplay} changeValue={this.getKeys}/>
            </div>
        )
    }
}

export default Tab2;