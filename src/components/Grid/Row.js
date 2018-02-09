import React, {Component} from 'react';

class Row extends Component {

    static defaultProps = {
        /*
        * type: (默认为 row)
        * flex                - 使用 flex 布局，在row方向排列
        * flex-column         - flex column 方向排列
        * flex-reverse        - flex row 方向顺序颠倒排列
        * flex-column-reverse - flex column 方向顺序颠倒排列
        * */
        type:'',
        align:'',
        gutter:'',
        justify:''
    };

    render() {
        let rowClassType = this.props.type === 'flex'? 'flex-row':
                this.props.type === 'flex-column'? 'flex-column':
                    this.props.type === 'flex-reverse'? 'flex-row-reverse':
                        this.props.type === 'flex-column-reverse'? 'flex-column-reverse':'row';

        return <div className={[rowClassType].join(' ')} >
            {this.props.children}
        </div>;
    }
}

export default Row;