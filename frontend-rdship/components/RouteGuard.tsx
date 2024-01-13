import { MESSAGE } from '@/config/message';
import { AlertMessageService } from '@/services/alertmessage.service';
import { AuthService } from '@/services/auth.service';
import { LoaderService } from '@/services/loader.service';
import { setIsAuthenticated } from '@/stores/reducers/authenticationSlice';
import { setUserDetails } from '@/stores/reducers/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RouteGuard = ({ children }: any) => {
    const authService = new AuthService();
    const alertMessage = new AlertMessageService();
    const loaderService = new LoaderService();
    const dispatch = useDispatch();
    const pathName = usePathname();
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.authenticationReducer.isAuthenticated);
    console.log('isAuthenticated', isAuthenticated)

    useEffect(() => {
        console.log("Path is changing to:", pathName);

        if (isAuthenticated) {// done
            return
        }
        else {
            if (pathName.includes('account')) {
                if (localStorage.getItem('_id')) {//done
                    getAuthData();
                } else {//done
                    alertMessage.addError(MESSAGE.ERROR.LOGIN_FIRST).show();
                    router.push('/login', { scroll: false });
                }
            } else if (!pathName.includes('login')) {
                if (localStorage.getItem('_id')) { // done
                    getAuthData();
                } else {
                    console.log('show login tooltip and continue');
                }
            }
        }
    }, [pathName]);

    const getAuthData = () => {
        loaderService.showLoader();
        authService.getAuthData(localStorage.getItem('_id'))
            .then((res: any) => {
                if (res?.status == 200 && res?.success) {
                    let responce: any = res?.data;
                    let isAuthenticated: any = true;
                    dispatch(setIsAuthenticated(isAuthenticated));
                    dispatch(setUserDetails(responce));
                    loaderService.hideLoader();
                } else {
                    alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                }
            })
            .catch((err: any) => {
                alertMessage.addError(MESSAGE.ERROR.SOMETHING_WENT_WRONG).show();
                loaderService.hideLoader();
            })
    }

    return children;
}


export default RouteGuard