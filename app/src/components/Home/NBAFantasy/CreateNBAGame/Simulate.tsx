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
                    <NumberOfGamesNumber disabled={disabled}>10</NumberOfGamesNumber>
                    <NumberOfGamesDesc disabled={disabled}>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(12)} selected={selected === 12}>
                    <NumberOfGamesNumber disabled={disabled}>12</NumberOfGamesNumber>
                    <NumberOfGamesDesc disabled={disabled}>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(14)} selected={selected === 14}>
                    <NumberOfGamesNumber disabled={disabled}>14</NumberOfGamesNumber>
                    <NumberOfGamesDesc disabled={disabled}>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(16)} selected={selected === 16}>
                    <NumberOfGamesNumber disabled={disabled}>16</NumberOfGamesNumber>
                    <NumberOfGamesDesc disabled={disabled}>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(18)} selected={selected === 18}>
                    <NumberOfGamesNumber disabled={disabled}>18</NumberOfGamesNumber>
                    <NumberOfGamesDesc disabled={disabled}>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
                <NumberOfGamesElement disabled={disabled} onClick={() => onClick(20)} selected={selected === 20}>
                    <NumberOfGamesNumber disabled={disabled}>20</NumberOfGamesNumber>
                    <NumberOfGamesDesc disabled={disabled}>PLAYERS</NumberOfGamesDesc>
                </NumberOfGamesElement>
            </NumberOfGamesRow>
        </Container>
    )
}

export default Simulate

const Container = styled.div``

type NumberOfGamesElement = {
    selected: boolean
    disabled: boolean
}

const NumberOfGamesElement = styled.div<NumberOfGamesElement>`
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    height: 55px;
    width: 60px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, selected, disabled }) =>
        selected && !disabled ? theme.colors.dark2 : 'transparent'};
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

const NumberOfGamesNumber = styled.div<DisabledProps>`
    font-weight: 700;
    font-size: 1.3rem;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
    color: ${({ theme, disabled }) => (disabled ? theme.colors.dark1 : theme.colors.light1)};
`

const NumberOfGamesDesc = styled.div<DisabledProps>`
    font-size: 0.7rem;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
    color: ${({ theme, disabled }) => (disabled ? theme.colors.dark25 : theme.colors.light4)};
`

const NumberOfGamesRow = styled.div`
    position: relative;
    display: flex;
`
