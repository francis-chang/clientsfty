import React from 'react'
import { styled } from 'utils/theme'

type Props = {
    selected: number
    onClick: (numberOfTeamsToSimul: number) => void
    disabled: boolean
}

const Simulate: React.FC<Props> = ({ onClick, selected, disabled }) => {
    return (
        <Container>
            <NumberOfGamesRow>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(10)} selected={selected === 10}>
                    <NumberOfGamesNumber>10</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(12)} selected={selected === 12}>
                    <NumberOfGamesNumber>12</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(14)} selected={selected === 14}>
                    <NumberOfGamesNumber>14</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(16)} selected={selected === 16}>
                    <NumberOfGamesNumber>16</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(18)} selected={selected === 18}>
                    <NumberOfGamesNumber>18</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(20)} selected={selected === 20}>
                    <NumberOfGamesNumber>20</NumberOfGamesNumber>
                    <NumberOfGamesDesc>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
            </NumberOfGamesRow>
        </Container>
    )
}

export default Simulate

const Container = styled.div`
    // animated motion div needs a specific numeric value to be animated towards
    // this is derived by dividing that value by 2 and subtracting half of NumberOfGamesElement height
    padding-top: 43.4px;
    padding-left: 1rem;
`

type NumberOfGamesElement = {
    selected: boolean
    disabled: boolean
}

const NumberOfGamesElement = styled.div<NumberOfGamesElement>`
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
    display: flex;
    flex-direction: column;
    &:not(:last-child) {
        margin-right: 10px;
    }
    height: 55px;
    width: 60px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, selected, disabled }) =>
        selected && !disabled ? theme.colors.dark2 : 'transparent'};
    color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light3)};
    user-select: none;
    border-radius: 4px;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
    &:hover {
        background-color: ${({ theme, selected, disabled }) =>
            selected && !disabled ? theme.colors.dark2 : disabled ? 'transparent' : theme.colors.dark25};
    }
`
type DisabledProps = {
    disabled: boolean
}

const NumberOfGamesNumber = styled.div`
    font-weight: 700;
    font-size: 1.3rem;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
`

const NumberOfGamesDesc = styled.div`
    font-size: 0.7rem;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
`

const NumberOfGamesRow = styled.div`
    position: relative;
    display: flex;
`
