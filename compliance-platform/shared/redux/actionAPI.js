import { getUsers, gettingUserListLoading, gettingUserListSuccess, gettingUserListFailed, gettingUserListClear } from './action/Users/UserSlice'
import { getSites, gettingSiteListLoading, gettingSiteListSuccess, gettingSiteListFailed, gettingSiteListClear } from './action/Sites/SiteSlice'
import { getLOBs, gettingLOBListLoading, gettingLOBListSuccess, gettingLOBListFailed, gettingLOBListClear } from './action/LOBs/LOBSlice'

export const actionAPI = {
    getUsers, 
    gettingUserListLoading, 
    gettingUserListSuccess, 
    gettingUserListFailed, 
    gettingUserListClear,
    getSites, 
    gettingSiteListLoading, 
    gettingSiteListSuccess, 
    gettingSiteListFailed, 
    gettingSiteListClear,
    getLOBs, 
    gettingLOBListLoading, 
    gettingLOBListSuccess, 
    gettingLOBListFailed, 
    gettingLOBListClear
}