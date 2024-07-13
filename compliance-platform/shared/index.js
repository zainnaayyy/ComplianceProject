import { AuthContext, AuthProvider, useAuth } from './context'
import { useLocalStorage } from './hooks';
import { url } from './constants'
import { blobValidation, isEmpty, isEmptyTime, isEmptyZero, removeTrailingZeros, unescapeHTML } from './utils'
import { Store } from "./redux/store";
import { useSelector, useDispatch } from 'react-redux'
import {actionAPI} from './redux/actionAPI'

const useSharedDispatcher = () => useDispatch()
const useSharedSelector = useSelector

export {
  AuthContext,
  AuthProvider,
  useAuth,
  useLocalStorage,
  url,
  blobValidation,
  isEmpty, 
  isEmptyTime, 
  isEmptyZero, 
  removeTrailingZeros, 
  unescapeHTML,
  Store,
  useSharedDispatcher,
  useSharedSelector,
  actionAPI
};