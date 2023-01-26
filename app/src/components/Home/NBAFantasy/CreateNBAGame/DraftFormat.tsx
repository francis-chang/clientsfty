import React from 'react'
import { styled } from 'utils/theme'

type Props = {
    onChange: (draftFormat: string) => void
    selected: string
}

const DraftFormat: React.FC<Props> = ({ onChange, selected }) => {
    return (
        <Container>
            <Button selected={selected === 'AI_DRAFT'} onClick={() => onChange('AI_DRAFT')}>
                Individual AI Draft
            </Button>
            <Button selected={selected === 'LIVE_DRAFT'} onClick={() => onChange('LIVE_DRAFT')}>
                Live Draft
            </Button>
        </Container>
    )
}

export default DraftFormat

const Container = styled.div`
    display: flex;
`

const Select = styled.select``

type ButtonProps = {
    selected: boolean
}

const Button = styled.div<ButtonProps>`
    padding: 0.7rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 0.5rem;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : 'transparent')};

    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`
