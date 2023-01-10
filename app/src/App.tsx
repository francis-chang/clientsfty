import Register from 'components/Register'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'utils/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from 'components/Login'

const router = createBrowserRouter([
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
])

function App() {
    const queryClient = new QueryClient()

    // QueryClient can be configurable, see belows

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
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
