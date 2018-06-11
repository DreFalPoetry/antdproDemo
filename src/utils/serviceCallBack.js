import { setAuthority } from './authority';
import { reloadAuthorized } from './Authorized';
import { notification  } from 'antd';
import { routerRedux } from 'dva/router';

export function sessionInvalid(){
    sessionStorage.removeItem('loginUserInfo');
    setAuthority('guest');
    reloadAuthorized();
    this.props.history.push('/user/login');
    // routerRedux.push('/user/login')
}

export function errorCallBack(json){
    notification.error({
        message: 'Request an error',
        description: json.info,
    });
}

export function callbackDeal(response){
    if(response.code!=null && response.code!= undefined){
        if (response.code == 0) {
            return 'successCallBack';
        }else if(response.code == 1){
            sessionStorage.removeItem('loginUserInfo');
            setAuthority('guest');
            reloadAuthorized();
            routerRedux.push('/dashboard/analysis')
            // this.props.history.push('/user/login');
        }else{
            notification.error({
                message: 'Request an error',
                description: response.info,
            });
        }
    }  
}