
import { ROUTER_NAV_ACTION ,ROUTER_DATA_ACTION} from '../actions/router'

export function locationPath(state = {}, action) {
    switch (action.type){
        case ROUTER_NAV_ACTION:
            return Object.assign({},action.location);
        case ROUTER_DATA_ACTION:
            return [].concat(action.routers);
        default:
            return state;
    }
}

export function routers(state = [{}], action) {
    switch (action.type){
        case ROUTER_DATA_ACTION:
            return Array.isArray(action.routers) ? [].concat(action.routers): [{}];
        default:
            return state;
    }
}