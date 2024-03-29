import Register from 'components/Register'
import { createBrowserRouter, redirect, Router, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'utils/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from 'components/Login'
import Home from 'components/Home'
import useAuthStore from 'utils/state/useAuthStore'
import { shallow } from 'zustand/shallow'

import MockDraft from 'components/MockDraft'
import { auth } from 'utils/api/auth'

import NBAFantasy from 'components/Home/NBAFantasy'
import NBAStats from 'components/Home/NBAStats'
import NFL from 'components/Home/NFL'
import Settings from 'components/Home/Settings'
import CreateNBAGame from 'components/Home/NBAFantasy/CreateNBAGame'
import FantasyGame from 'components/Home/NBAFantasy/FantasyGame'
import GameSettings from 'components/Home/NBAFantasy/FantasyGame/Settings'
import FindGames from 'components/Home/NBAFantasy/FindGames'
import Draft from 'components/Draft'

function App() {
    const queryClient = new QueryClient()

    const { setUser } = useAuthStore((state) => ({ setUser: state.setUser }), shallow)
    // const { error, setError } = useErrorStore((state) => ({ error: state.error, setError: state.setError }), shallow)

    const authLoader = async () => {
        const response = await auth()
        if (response) {
            setUser(response)
            return redirect('/')
        }
        setUser(null)
        return null
    }
    const authLoaderLoggedIn = async () => {
        const response = await auth()
        if (response) {
            setUser(response)
            return null
        } else {
            setUser(null)
            return redirect('/login')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {/* <Error error={error} setError={setError} /> */}
            <QueryClientProvider client={queryClient}>
                <RouterProvider
                    router={createBrowserRouter([
                        {
                            path: '/draft/:draftId',
                            element: <Draft />,
                        },
                        {
                            path: '/register',
                            element: <Register />,
                            // loader: authLoader,
                        },
                        {
                            path: '/login',
                            element: <Login />,
                            // loader: authLoader,
                        },

                        { path: '/mockdraft', element: <MockDraft /> },
                        {
                            path: '/',
                            element: <Home />,
                            loader: authLoaderLoggedIn,
                            children: [
                                {
                                    path: 'nbafantasy',
                                    element: <NBAFantasy />,
                                    children: [
                                        { path: 'findgames', element: <FindGames /> },
                                        { path: 'create', element: <CreateNBAGame /> },
                                    ],
                                },
                                {
                                    path: 'nbafantasygame/:gameId',
                                    element: <FantasyGame />,
                                },
                                { path: 'nbastats', element: <NBAStats /> },
                                { path: 'nflfantasy', element: <NFL /> },
                                { path: 'nflstats', element: <NFL /> },
                                { path: 'settings', element: <Settings /> },
                            ],
                        },
                    ])}
                />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
