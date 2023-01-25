import Register from 'components/Register'
import { createBrowserRouter, redirect, Router, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'utils/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from 'components/Login'
import Home from 'components/Home'
import useAuthStore from 'utils/state/useAuthStore'
import { shallow } from 'zustand/shallow'
import Error from 'components/Error'
import useErrorStore from 'utils/state/useErrorStore'
import MockDraft from 'components/MockDraft'
import { auth } from 'utils/api/auth'
import Confirm from 'components/Register/Confirm'
import GoogleOauth from 'components/Register/GoogleOauth'

// QueryClient can be configurable, see below

// const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         refetchOnWindowFocus: false,
//         refetchOnmount: false,
//         refetchOnReconnect: false,
//         retry: false,
//         staleTime: 5*60*1000,
//       },
//     },
//   });

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
            console.log(response)
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
                        { path: '/', element: <Home />, loader: authLoaderLoggedIn },
                    ])}
                />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
