import axios from 'axios'

export const ROUTER_NAV_ACTION = '@NAV/ROUTER_NAV_ACTION';
export const ROUTER_DATA_ACTION = '@NAV/ROUTER_DATA_ACTION';


export function routerChange(location) {
    return {
        type: ROUTER_NAV_ACTION,
        location
    };
}

export function routerListAction(routers) {
    return {
        type: ROUTER_DATA_ACTION,
        routers
    }
}

export function queryFooterRouters(params) {
    console.log(params,'params');
    return (dispatch, getState) => {
        axios.get('http://127.0.0.1:4000/list').then(res =>{
            console.log(res.data,'response');
            dispatch(routerListAction(res.data));
            return res
        },err =>{
            return err
        })
    }
}


// export function routerChange(location) {
//
//     return (dispatch, getState) => {
//         // const {locationPath} = getState();
//         dispatch(actions());
//
//     }
// }
























