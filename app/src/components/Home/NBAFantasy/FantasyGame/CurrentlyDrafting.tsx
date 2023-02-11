import React from 'react'
import { Link } from 'react-router-dom'
import { Button, styled } from 'utils/theme'

type Props = {
    draft_id: number
}

const CurrentlyDrafting: React.FC<Props> = ({ draft_id }) => {
    return (
        <DraftNow>
            <YouCanNow>CURRENTLY DRAFTING</YouCanNow>
            <CurrentDraftContainer>
                <CurrentDraftInformation>asdfe</CurrentDraftInformation>
                <Link to={`/draft/${draft_id}`} target="_blank" rel="noopener noreferrer">
                    <EnterDraftButton>Enter Draft</EnterDraftButton>
                </Link>
            </CurrentDraftContainer>
        </DraftNow>
    )
}

export default CurrentlyDrafting

const DraftNow = styled.div`
    border-radius: 4px;
    border: ${({ theme }) => `1px solid ${theme.colors.testgreen2}`};

    flex-direction: column;
    margin-bottom: 1rem;
`

const CurrentDraftInformation = styled.div`
    flex-grow: 1;
    margin-right: 1rem;
`

const YouCanNow = styled.div`
    text-align: center;
    padding: 0.5rem 0rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.testgreen2};
    color: ${({ theme }) => theme.colors.dark4};
`
const CurrentDraftContainer = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
`

const EnterDraftButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.testgreen2};
    color: ${({ theme }) => theme.colors.dark4};
    font-weight: 700;
    font-size: 1.1rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.testgreen25};
    }
`
