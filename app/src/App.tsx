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
import { useEffect } from 'react'
import useErrorStore from 'utils/state/useErrorStore'

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

    const { user } = useAuthStore((state) => ({ user: state.user }), shallow)
    const { error, setError } = useErrorStore((state) => ({ error: state.error, setError: state.setError }), shallow)

    // useEffect(() => {
    //     console.log(user)
    // }, [user])

    const authLoader = () => {
        if (user) {
            return redirect('/')
        }
        return null
    }

    return (
        <ThemeProvider theme={theme}>
            <Error error={error} setError={setError} />
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
                <RouterProvider
                    router={createBrowserRouter([
                        {
                            path: '/register',
                            element: <Register />,
                            loader: authLoader,
                        },
                        {
                            path: '/login',
                            element: <Login />,
                            loader: authLoader,
                        },
                        { path: '/', element: <Home /> },
                    ])}
                />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
