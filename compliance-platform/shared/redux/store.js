import { configureStore } from "@reduxjs/toolkit"
import {UserData, SiteData ,LOBData, RolesData, FormTemplateData} from "./action"

export const Store = configureStore({
    reducer: {
        UserData,
        SiteData,
        LOBData,
        RolesData,
        FormTemplateData
    },
})