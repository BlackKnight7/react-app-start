import React, {Component} from 'react';
import HandToucher from '../common/handToucher'

class Tab2 extends Component {
    componentDidMount() {

        function an(tem,a,b) {
            console.log(tem,a,b)
        }
        requestAnimationFrame(an)


        // let handToucher = HandToucher(this.el);
        // // console.log(window.getComputedStyle(this.el),444);
        // handToucher.on('tap',function () {
        //     console.log('on tap')
        // })
        // handToucher.on('slide',function () {
        //     console.log('on slide')
        // })
    }

    render() {
        return (
            <div ref={(el) => this.el = el}>tab2</div>
        )
    }
}

export default Tab2;