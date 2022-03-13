import React from 'react'
import type { RouteObject } from 'react-router-dom'

import { Loader } from 'components/Loader'

const Home = React.lazy(() => import("views/home/page/Home"))

const routes: RouteObject[] = [
    {
        path: "/",
        element: <React.Suspense fallback={<Loader />}>
            <Home />
        </React.Suspense>
    }
]

export default routes