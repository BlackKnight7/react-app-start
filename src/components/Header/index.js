import React, {Component} from 'react';
import styled from 'styled-components';
import propType from 'prop-types'

const Head = styled.header`
  width: 10rem;
  height: 1.2rem;
  background-color: rgba(0,153,229,.9);
  color: #fff;
`;

const Back = styled.div`
  display: block;
  float: left;
  width: 1.5rem;
  height: 1.2rem;
  padding-left: 0.1rem;
`;

const BackIcon = styled.i`
  display: block;
  line-height: 1.2rem;
  float: left;
  font-size: 0.9rem;
`;

const Title = styled.div`
  display: block;
  float: left;
  width: 7rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.45rem;
`;

const HeadRt = styled.div`
    display: block;
    float: right;
    height: 1.2rem;
    line-height: 0.6rem;
    text-align: center;
    width: 1.5rem;
    
`;


class Header extends Component {

    handleTouchend = ()=>{
        console.log('t')
        const {history} =this.props;
        history.go(-1);
    };
    handleClick = ()=>{
        console.log('c')
    };

    render() {
        const {pathname,routers} = this.props;
        let text = '';
        routers.map(route =>{
            if(pathname===route.path){
                text = route.text
            }
        });
        return (
            <Head>
                <Back onTouchEnd={this.handleTouchend} onClick={this.handleClick}>
                    <BackIcon className='icon-angle-left'/>
                </Back>
                <Title>{text}</Title>
                <HeadRt>...</HeadRt>
            </Head>
        )
    }
}

Header.propTypes = {
    pathname:propType.string.isRequired,
    routers:propType.array.isRequired
};

export default Header;