import React, { useEffect } from 'react'
import { styled } from 'utils/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrees, faChessKing, faSquare1 } from '@fortawesome/pro-regular-svg-icons'
import { type } from 'os'

type Props = {
    onChange: (str: string) => void
    selected: string
}

const GameType: React.FC<Props> = ({ onChange, selected }) => {
    return (
        <Container>
            <ContainerRow>
                <Element onClick={() => onChange('SINGLE')} selected={selected === 'SINGLE'}>
                    <IconContainer selected={selected === 'SINGLE'} ident="SINGLE">
                        <FontAwesomeIcon icon={faSquare1} />
                    </IconContainer>
                    <Description>SINGLE</Description>
                </Element>

                <Element onClick={() => onChange('KOTH')} selected={selected === 'KOTH'}>
                    <IconContainer selected={selected === 'KOTH'} ident="KOTH">
                        <FontAwesomeIcon icon={faChessKing} />
                    </IconContainer>
                    <Description>KOTH</Description>
                </Element>
                <Element onClick={() => onChange('SEASON')} selected={selected === 'SEASON'}>
                    <IconContainer selected={selected === 'SEASON'} ident="SEASON">
                        <FontAwesomeIcon icon={faTrees} />
                    </IconContainer>
                    <Description>SEASON</Description>
                </Element>
            </ContainerRow>
            <GameDescription>
                {selected === 'SEASON'
                    ? 'Game will last till the end of the season in H2H format'
                    : selected === 'KOTH'
                    ? 'Single Elmination Draft Interval till the last team standing'
                    : 'Players draft once for a Roto Style'}
            </GameDescription>
        </Container>
    )
}

export default GameType

const GameDescription = styled.div`
    color: ${({ theme }) => theme.colors.light3};
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const ContainerRow = styled.div`
    display: flex;
    margin-bottom: 1rem;
`
type ElementProps = {
    selected: boolean
}

const Element = styled.div<ElementProps>`
    padding: 1rem;
    width: 7rem;
    border-radius: 4px;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark25 : theme.colors.dark4)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark25 : theme.colors.dark3)};
    }
    &:not(:last-child) {
        margin-right: 1rem;
    }
`

type IconProps = {
    ident: string
    selected: boolean
}

const IconContainer = styled.div<IconProps>`
    font-size: 2.2rem;
    margin-bottom: 0.8rem;
    color: ${({ theme, selected, ident }) => {
        if (selected) {
            if (ident === 'KOTH') {
                return theme.colors.orange1
            } else if (ident === 'SINGLE') {
                return theme.colors.lightblue2
            } else {
                return theme.colors.green2
            }
        } else {
            return theme.colors.light2
        }
    }};
`

const Description = styled.div`
    font-size: 0.9rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light3};
`
