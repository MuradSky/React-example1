import routes from 'generated/routes.json'

export type TRoutes = typeof routes
export type TRoute = keyof TRoutes

export const routeName = (name: TRoute, ...args: (string | number)[]): string => {
    try {
        const baseUrl = '/'
        return (
            baseUrl +
            routes[name]
                .split('/')
                .map((s) => (s[0] === '{' ? args.shift() : s))
                .join('/')
        )
    } catch (e) {
        console.error(e)
        return ''
    }
}
