import baseStyled, { createGlobalStyle, ThemedStyledInterface } from 'styled-components'

// styled-components/polished had way too much in library to justify the use for just darken and lighten

export const colors = {
    dark4: '#16191d',
    dark3: '#1b1f24',
    dark2: '#2c323a',
    dark1: '#4d5866',
    dark25: '#21262c',

    light1: '#e2e5e9',
    light2: '#c5cbd3',
    light3: '#99a5b2',
    light4: '#7c8b9c',

    lightblue0: '#6bbcf2',
    lightblue1: '#6394e9',
    lightblue2: '#4c8ffc',

    blue1: '#1d5cc9',
    blue2: '#154494',
    blue3: '#133d86',

    orange1: '#f7a354',
    orange2: '#f47c0b',

    green1: '#aef99f',

    red1: '#f75252',
}

export const sizes = {
    maxWidth: '800px',
    minPadding: '0.4rem',
    regPadding: '0.7rem',
    lgPadding: '1rem',
    regButtonPadding: '0.7rem 2rem',
    minButtonPadding: '0.7rem 1.5rem',
}

export const theme = {
    colors: { ...colors },
    sizes: { ...sizes },
}

export type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>

const viewportSizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
}

export const device = {
    mobileS: `(min-width: ${viewportSizes.mobileS})`,
    mobileM: `(min-width: ${viewportSizes.mobileM})`,
    mobileL: `(min-width: ${viewportSizes.mobileL})`,
    tablet: `(min-width: ${viewportSizes.tablet})`,
    laptop: `(min-width: ${viewportSizes.laptop})`,
    laptopL: `(min-width: ${viewportSizes.laptopL})`,
    desktop: `(min-width: ${viewportSizes.desktop})`,
    desktopL: `(min-width: ${viewportSizes.desktop})`,
}

export const Button = styled.button`
    padding: ${({ theme }) => theme.sizes.regButtonPadding};
    background-color: ${({ theme }) => theme.colors.blue2};
    color: ${({ theme }) => theme.colors.light2};
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
    text-transform: uppercase;
    transition-timing-function: ease;
    transition-duration: 150ms;
    &:hover {
        background-color: ${({ theme }) => theme.colors.blue1};
    }
`

export const Div = styled.div`
    @media ${device.mobileM} {
        padding: ${({ theme }) => theme.sizes.minButtonPadding};
    }
`

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    
    body{
        -webkit-font-smoothing: antialiased;
        letter-spacing: 0px;
        background-color: ${({ theme }) => theme.colors.dark4};
        color:${({ theme }) => theme.colors.light2};
    }


`
