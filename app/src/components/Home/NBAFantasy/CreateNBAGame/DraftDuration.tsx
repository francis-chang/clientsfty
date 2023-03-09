import React, { useEffect } from 'react'
import { styled } from 'utils/theme'

type Props = {
    onChange: (number: number) => void
    selected: number
}

const DraftDuration: React.FC<Props> = ({ onChange, selected }) => {
    return (
        <Container>
            <NumGamesRowRow>
                <NumberOfGamesRow>
                    <NumberOfGamesElement onClick={() => onChange(30)} selected={selected === 30}>
                        <NumberOfGamesNumber>30</NumberOfGamesNumber>
                        <NumberOfGamesDesc>SEC</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(45)} selected={selected === 45}>
                        <NumberOfGamesNumber>45</NumberOfGamesNumber>
                        <NumberOfGamesDesc>SEC</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(60)} selected={selected === 60}>
                        <NumberOfGamesNumber>1</NumberOfGamesNumber>
                        <NumberOfGamesDesc>MIN</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(120)} selected={selected === 120}>
                        <NumberOfGamesNumber>2</NumberOfGamesNumber>
                        <NumberOfGamesDesc>MIN</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                    <NumberOfGamesElement onClick={() => onChange(300)} selected={selected === 300}>
                        <NumberOfGamesNumber>5</NumberOfGamesNumber>
                        <NumberOfGamesDesc>MIN</NumberOfGamesDesc>
                    </NumberOfGamesElement>
                </NumberOfGamesRow>
            </NumGamesRowRow>
        </Container>
    )
}

export default DraftDuration

const NumGamesRowRow = styled.div`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
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
    color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light3)};
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
    font-weight: 500;
`

const NumberOfGamesRow = styled.div`
    position: relative;
    display: flex;
`
