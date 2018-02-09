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
    state = {
        pathname:''
    };

    handleClick = (index,e) =>{
      console.log(index,e.target);
    };


    render() {
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
                                    onclick={this.handleClick.bind(this,index)}
                                />
                            )
                    }
                </Row>
            </Foot>
        )
    }
}

export default FooterNav;