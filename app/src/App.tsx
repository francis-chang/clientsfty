import Register from 'components/Register'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'utils/theme'

const router = createBrowserRouter([{ path: '/register', element: <Register /> }])

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
