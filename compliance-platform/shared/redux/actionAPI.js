import { getUsers, gettingUserListLoading, gettingUserListSuccess, gettingUserListFailed, gettingUserListClear } from './action/Users/UserSlice'
import { getSites, gettingSiteListLoading, gettingSiteListSuccess, gettingSiteListFailed, gettingSiteListClear } from './action/Sites/SiteSlice'
import { getLOBs, gettingLOBListLoading, gettingLOBListSuccess, gettingLOBListFailed, gettingLOBListClear } from './action/LOBs/LOBSlice'
import { getRoles, gettingRoleListLoading, gettingRoleListSuccess, gettingRoleListFailed, gettingRoleListClear } from './action/Roles/RolesSlice'
import { getFormTemplates, gettingFormTemplateListLoading, gettingFormTemplateListSuccess, gettingFormTemplateListFailed, gettingFormTemplateListClear } from './action/FormTemplate/FormTemplateSlice'
import { getCoachingLookups, gettingCoachingLookupListClear, gettingCoachingLookupListFailed, gettingCoachingLookupListLoading, gettingCoachingLookupListSuccess } from './action/CoachingLookups/CoachingLookupSlice'
import { getCoaching, gettingCoachingListClear, gettingCoachingListFailed, gettingCoachingListLoading, gettingCoachingListSuccess } from './action/Coaching/CoachingSlice'

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
    gettingLOBListClear,
    getRoles, 
    gettingRoleListLoading, 
    gettingRoleListSuccess, 
    gettingRoleListFailed, 
    gettingRoleListClear,
    getFormTemplates, 
    gettingFormTemplateListLoading, 
    gettingFormTemplateListSuccess, 
    gettingFormTemplateListFailed, 
    gettingFormTemplateListClear,
    getCoachingLookups, 
    gettingCoachingLookupListClear, 
    gettingCoachingLookupListFailed, 
    gettingCoachingLookupListLoading, 
    gettingCoachingLookupListSuccess,
    getCoaching, 
    gettingCoachingListClear, 
    gettingCoachingListFailed, 
    gettingCoachingListLoading, 
    gettingCoachingListSuccess
}