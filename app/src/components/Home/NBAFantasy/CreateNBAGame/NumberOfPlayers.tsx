import React, { useEffect } from 'react'
import { styled } from 'utils/theme'

type Props = {
    onChange: (number: number) => void
    selected: number
}

const NumberOfPlayers: React.FC<Props> = ({ onChange, selected }) => {
    return (
        <Container>
            <NumberOfGamesRow>
                <NumberOfGamesElement onClick={() => onChange(1)} selected={selected === 1}>
                    <NumberOfGamesNumber>4</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement onClick={() => onChange(2)} selected={selected === 2}>
                    <NumberOfGamesNumber>6</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement onClick={() => onChange(3)} selected={selected === 3}>
                    <NumberOfGamesNumber>8</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement onClick={() => onChange(4)} selected={selected === 4}>
                    <NumberOfGamesNumber>10</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement onClick={() => onChange(5)} selected={selected === 5}>
                    <NumberOfGamesNumber>12</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement onClick={() => onChange(5)} selected={selected === 5}>
                    <NumberOfGamesNumber>14</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement onClick={() => onChange(5)} selected={selected === 5}>
                    <NumberOfGamesNumber>16</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement onClick={() => onChange(5)} selected={selected === 5}>
                    <NumberOfGamesNumber>18</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
            </NumberOfGamesRow>
        </Container>
    )
}

export default NumberOfPlayers

const NumGamesRowRow = styled.div`
    display: flex;
    flex-direction: column;
    &:first-child {
        margin-bottom: 1rem;
    }
`

const Container = styled.div``

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
