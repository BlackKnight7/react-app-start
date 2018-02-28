import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Col} from '../Grid'

const Text = styled.span`
    font-size: 0.25rem;
    display: block;
    height: 1rem;
    text-align: center;
    color: #666;
`;

const IconSpan= styled.div`
  font-size: 0.66rem;
   display: block;
   height: 1rem;
   text-align: center;
   padding-top: 0.1rem;
   color: #666;
`;
// const Icon = styled.i`
//   display: block;
//   margin: 0 auto;
// `;


class FooterItem extends Component {
    state = {
        isActive: false
    };
    static defaultProps ={
        onclick:function () {},
        iconClassName:'',
        text:'',
        to:'',
        path:''
    };
    handleClick = (e) => {
        this.props.onclick(e)
    };

    render() {
        let iconClass = '';
        if(this.props.path === this.props.to){
            iconClass = 'is-Active';
        }
        return (
            <Col >
                {/*<img className='footerImg' src={this.props.src} alt={this.props.alt}/>*/}
                <Link onTouchEnd={this.handleClick} to={this.props.to}>
                    <IconSpan ><i className={ [this.props.iconClassName,iconClass].join(' ') } /></IconSpan>
                    <Text className={iconClass}>{this.props.text}</Text>
                </Link>

            </Col>
        )
    }
}

export default FooterItem;