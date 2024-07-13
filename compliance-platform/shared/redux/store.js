import { configureStore } from "@reduxjs/toolkit"
import {UserData, SiteData ,LOBData} from "./action"

export const Store = configureStore({
    reducer: {
        UserData,
        SiteData,
        LOBData
    },
})