import React, {Component} from 'react';
import propType from 'prop-types'
import NumberKeys from './NumberKeys'

class KeyBoard extends Component {
    static defaultProps = {
        // 默认 数字键盘
        type:'number',
        // 是都打乱
        isRandom:false,
        changeValue:function () {}
    };
    render() {
        return this.props.type==='number'? <NumberKeys
            isRandom={this.props.isRandom}
            changeValue={this.props.changeValue}
            setDisplay={this.props.setDisplay}
            display={this.props.display}/> : null;
    }
}
KeyBoard.propTypes = {
    type:propType.string,
    getKeys:propType.func,
    display:propType.bool,
    changeValue:propType.func,
    setDisplay:propType.func.isRequired
};

export default KeyBoard;