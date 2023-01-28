import React, { useEffect } from 'react'
import { styled } from 'utils/theme'

type Props = {
    onChange: (number: number) => void
    selected: number
}

const NumberOfGames: React.FC<Props> = ({ onChange, selected }) => {
    return (
        <Container>
            <NumGamesRowRow>
                <NumberOfGamesTitle>HEAD TO HEAD </NumberOfGamesTitle>
                <NumberOfGamesRow>
                    <NumberOfGamesElement onClick={() => onChange(1)} selected={selected === 1}>
                        <NumberOfGamesNumber>1</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAME</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(2)} selected={selected === 2}>
                        <NumberOfGamesNumber>2</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(3)} selected={selected === 3}>
                        <NumberOfGamesNumber>3</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(4)} selected={selected === 4}>
                        <NumberOfGamesNumber>4</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(5)} selected={selected === 5}>
                        <NumberOfGamesNumber>5</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                </NumberOfGamesRow>
            </NumGamesRowRow>
            <NumGamesRowRow>
                <NumberOfGamesTitle>ROTISSERIE</NumberOfGamesTitle>
                <NumberOfGamesRow>
                    <NumberOfGamesElement onClick={() => onChange(7)} selected={selected === 7}>
                        <NumberOfGamesNumber>7</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(10)} selected={selected === 10}>
                        <NumberOfGamesNumber>10</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(15)} selected={selected === 15}>
                        <NumberOfGamesNumber>15</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(20)} selected={selected === 20}>
                        <NumberOfGamesNumber>20</NumberOfGamesNumber>
                        <NumberOfGamesDesc>GAMES</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                </NumberOfGamesRow>
            </NumGamesRowRow>
        </Container>
    )
}

export default NumberOfGames

const NumGamesRowRow = styled.div`
    display: flex;
    flex-direction: column;
    &:first-child {
        margin-bottom: 1rem;
    }
`

const Container = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
`

const NumberOfGamesTitle = styled.div`
    color: ${({ theme }) => theme.colors.light4};
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
`

type NumberOfGamesElement = {
    selected: boolean
}

const NumberOfGamesElement = styled.div<NumberOfGamesElement>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    height: 55px;
    width: 60px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : 'transparent')};
    user-select: none;
    border-radius: 4px;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`

const NumberOfGamesNumber = styled.div`
    font-weight: 700;
    font-size: 1.3rem;
`

const NumberOfGamesDesc = styled.div`
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.light4};
`

const NumberOfGamesRow = styled.div`
    position: relative;
    display: flex;
`