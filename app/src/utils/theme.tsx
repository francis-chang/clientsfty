import baseStyled, { createGlobalStyle, ThemedStyledInterface } from 'styled-components'

// styled-components/polished had way too much in library to justify the use for just darken and lighten

export const colors = {
    dark4: '#16191d',
    dark3: '#1b1f24',
    dark25: '#21262c',
    dark2: '#2c323a',
    dark1: '#4d5866',

    light1: '#e2e5e9',
    light2: '#c5cbd3',
    light25: '#b6bec8',
    light3: '#99a5b2',
    light4: '#7c8b9c',
    light5: '#586574',

    lightblue0: '#6bbcf2',
    lightblue1: '#6394e9',
    lightblue2: '#4c8ffc',
    lightblue3: '#3675e2',

    blue1: '#1d5cc9',
    blue2: '#154494',
    blue3: '#133d86',
    blue4: '#103370',

    orange1: '#f7a354',
    orange2: '#f58924',

    green1: '#5cd65c',
    green2: '#42f540',

    testgreen1: '#47d147',
    testgreen2: '#00cc99',
    testgreen3: '#72f763',

    peach: '#f5b16e',

    red1: '#fa2f2f',
    red2: '#540601',

    discordcolor: '#e4e5e7',
    discordbackground: '#4a67cf',
    discordhover: '#304db5',
    googlecolor: '#e7f0fe',
    googlebackground: '#4285F4',
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
        sans-serif;
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
        ::-webkit-scrollbar {
            width: 7px;
        }


        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.colors.dark2};
            border-radius: 10px;
        } 
        
    }
    html {

        @media (max-width: 500px)  {
            font-size: 15px;
        }
        @media (max-width: 390px)  {
            font-size: 14px;
        }
    }
    
    body{
        -webkit-font-smoothing: antialiased;
        letter-spacing: 0px;
        background-color: ${({ theme }) => theme.colors.dark4};
        color:${({ theme }) => theme.colors.light2};

        
    }

    @keyframes pulsate {
        0% {
            color: ${({ theme }) => theme.colors.light4};
        }
        50% {
            color: ${({ theme }) => theme.colors.orange1};
        }
        100% {
            color: ${({ theme }) => theme.colors.light4};
        }
    }


`
