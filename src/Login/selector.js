import { initialState } from './reducer';
import get from 'lodash/get';
import {createSelector} from "reselect";


export const selectLoginContainer = (state: any)  =>  initialState;
export const selectLoading = createSelector(selectLoginContainer,(subState)=>get(subState,"loading"))
export const selectError = createSelector(selectLoginContainer,(subState)=>get(subState,"loginError"))
export const selectUserInfo = createSelector(selectLoginContainer,(subState)=>get(subState,"userInfo"))
export const selectUserToken = createSelector(selectLoginContainer,(subState)=>get(subState,"userToken"))