import React from 'react'
import type { RouteObject } from 'react-router-dom'

import { Loader } from 'components/Loader'
import { RequireAuth } from 'modules/Auth'

const Personal = React.lazy(() => import("views/personal/page/Personal"))
const Passport = React.lazy(() => import("views/personal/page/Passport"))

const routes: RouteObject[] = [
    {
        path: "/personal",
        element: <RequireAuth>
            <React.Suspense fallback={<Loader />}>
                <Personal />
            </React.Suspense>
        </RequireAuth>
    },
    {
        path: "/personal/passport",
        element: <RequireAuth>
            <React.Suspense fallback={<Loader />}>
                <Passport />
            </React.Suspense>
        </RequireAuth>
    }
]

export default routes