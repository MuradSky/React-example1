//genered
import type { RouteObject } from 'react-router-dom'
import certificateRoutes from 'views/certificate/routes'
import homeRoutes from 'views/home/routes'
import personalRoutes from 'views/personal/routes'

const routes: RouteObject[] = [
  ...certificateRoutes, ...homeRoutes, ...personalRoutes, 
]

export default routes
