import React, {Component} from 'react';
import HandToucher from '../common/handToucher'

class Tab2 extends Component {
    componentDidMount() {
        let handToucher = HandToucher(this.el);
        handToucher.on('tap',function () {
            console.log('on tap')
        })
        handToucher.on('slide',function () {
            console.log('on slide')
        })
    }

    render() {
        return (
            <div style={{position:'absolute'}}  ref={(el) => this.el = el}>tab2</div>
        )
    }
}

export default Tab2;