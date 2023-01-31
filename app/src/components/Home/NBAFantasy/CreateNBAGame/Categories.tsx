import React, { useEffect, useState } from 'react'
import { styled } from 'utils/theme'
type Props = {
    onChange: (categories: Cats[]) => void
    selected: Cats[]
}

const sameElements = (array1: Cats[], array2: Cats[]) => {
    if (array1.length !== array2.length) {
        return false
    }
    return array1.every((element) => array2.includes(element))
}

const Categories: React.FC<Props> = ({ onChange, selected }) => {
    const all: Cats[] = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'TPM', 'FGP', 'FTP', 'TOS', 'TPP', 'FAN']
    const eight: Cats[] = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'TPM', 'FGP', 'FTP']
    const nine: Cats[] = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'TOS', 'TPM', 'FGP', 'FTP']
    const ten: Cats[] = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'TOS', 'TPM', 'FGP', 'FTP', 'TPP']
    const [isEight, setIsEight] = useState(false)
    const [isNine, setIsNine] = useState(false)
    const [isTen, setIsTen] = useState(false)
    const [isPoints, setIsPoints] = useState(false)

    useEffect(() => {
        setIsNine(false)
        setIsTen(false)
        setIsPoints(false)
        setIsEight(false)
        if (sameElements(selected, eight)) {
            setIsEight(true)
        }
        if (sameElements(selected, nine)) {
            setIsNine(true)
        } else if (sameElements(selected, ten)) {
            setIsTen(true)
        } else if (selected.length === 1 && selected[0] === 'FAN') {
            setIsPoints(true)
        }
    }, [selected])

    const selectCat = (cat: Cats) => {
        if (selected.includes(cat)) {
            const filtered = selected.filter((select) => select !== cat)
            onChange(filtered)
        } else {
            onChange([...selected, cat])
        }
    }

    return (
        <Container>
            <TopRow>
                <TopRowElement onClick={() => onChange(nine)} selected={isNine}>
                    STANDARD 9 CAT
                </TopRowElement>
                <TopRowElement onClick={() => onChange(ten)} selected={isTen}>
                    STANDARD 10 CAT
                </TopRowElement>
                <TopRowElement onClick={() => onChange(['FAN'])} selected={isPoints}>
                    POINTS
                </TopRowElement>
            </TopRow>
            <BottomRow>
                {all.slice(0, 6).map((cat) => (
                    <BottomRowElement key={cat} onClick={() => selectCat(cat)} selected={selected.includes(cat)}>
                        {cat === 'TPM'
                            ? '3PM'
                            : cat === 'FGP'
                            ? 'FG%'
                            : cat === 'TPP'
                            ? 'TP%'
                            : cat === 'FTP'
                            ? 'FT%'
                            : cat}
                    </BottomRowElement>
                ))}
            </BottomRow>
            <BottomRow>
                {all.slice(6, all.length).map((cat) => (
                    <BottomRowElement key={cat} onClick={() => selectCat(cat)} selected={selected.includes(cat)}>
                        {cat === 'TPM'
                            ? '3PM'
                            : cat === 'FGP'
                            ? 'FG%'
                            : cat === 'TPP'
                            ? '3P%'
                            : cat === 'FTP'
                            ? 'FT%'
                            : cat}
                    </BottomRowElement>
                ))}
            </BottomRow>
        </Container>
    )
}

export default Categories

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const TopRow = styled.div`
    display: flex;
`

type TopRowElementProps = {
    selected: boolean
}

const TopRowElement = styled.div<TopRowElementProps>`
    padding: 0.5rem 0.8rem;
    border-radius: 4px;
    &:not(:last-child) {
        margin-right: 0.8rem;
    }
    font-size: 0.9rem;
    font-weight: 700;
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light3)};
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark25 : theme.colors.dark4)};
    cursor: pointer;
    margin-bottom: 0.8rem;
`
const BottomRow = styled.div`
    display: flex;
    &:not(:last-child) {
        margin-bottom: 0.8rem;
    }
`

const BottomRowElement = styled.div<TopRowElementProps>`
    display: flex;
    flex-direction: column;
    margin-right: 0.8rem;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 4px;
    padding: 1rem 0rem;
    width: 4rem;
    text-align: center;
    cursor: pointer;
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light4)};
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark25 : theme.colors.dark4)};
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark3)};
    }
`
