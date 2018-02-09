import React, {Component} from 'react';

class Col extends Component {
    state = {
        i:0
    }
    static defaultProps = {
        // 当 span <= 0 时，或非整数则 display:none
        span:1,
        offset:0,
        pull:0,
        push:0
    };
    render() {
        let wx = (this.props.span > 0 && this.props.span % 1 === 0) ? `col-${this.props.span}` : 'hide';
        return (
            <div className={['col',wx].join(' ')} >
                {this.props.children}
            </div>
        )
    }
}

export default Col;