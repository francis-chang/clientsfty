import React from 'react'
import { Link } from 'react-router-dom'
import { Button, styled } from 'utils/theme'

type Props = {
    draft: DraftInformationType
}

function getOrdinal(num: number) {
    var suffix = ''
    var lastDigit = num % 10
    var lastTwoDigits = num % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        suffix = 'th'
    } else if (lastDigit === 1) {
        suffix = 'st'
    } else if (lastDigit === 2) {
        suffix = 'nd'
    } else if (lastDigit === 3) {
        suffix = 'rd'
    } else {
        suffix = 'th'
    }

    return num + suffix
}

const CurrentlyDrafting: React.FC<Props> = ({ draft }) => {
    return (
        <DraftNow>
            <YouCanNow>CURRENTLY DRAFTING</YouCanNow>
            <CurrentDraftContainer>
                <CurrentDraftInformation>
                    <PickNumberContainer>
                        <PickNumberText>You are picking</PickNumberText>
                        <PickNumberNumber>{getOrdinal(draft.pick_position)}</PickNumberNumber>
                    </PickNumberContainer>
                    {/* <PickNumbersContainer>
                        <PickNumberText>You will be picking at</PickNumberText>
                        <PickNumbersGrid>
                            {draft.pick_numbers.map((num) => (
                                <PickNumberNumber>{num}</PickNumberNumber>
                            ))}
                        </PickNumbersGrid>
                    </PickNumbersContainer> */}
                </CurrentDraftInformation>
                <Link to={`/draft/${draft.draft_id}`} target="_blank" rel="noopener noreferrer">
                    <EnterDraftButton>Enter Draft</EnterDraftButton>
                </Link>
            </CurrentDraftContainer>
        </DraftNow>
    )
}

export default CurrentlyDrafting

const PickNumbersContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const PickNumbersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
    grid-gap: 10px;
    padding-top: 0.5rem;
`

const PickNumberText = styled.div`
    color: ${({ theme }) => theme.colors.light25};
`

const PickNumberNumber = styled.div`
    padding-left: 0.32rem;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.testgreen2};
`

const PickNumberContainer = styled.div`
    display: flex;
    align-items: center;
`

const DraftNow = styled.div`
    border-radius: 4px;
    border: ${({ theme }) => `1px solid ${theme.colors.testgreen2}`};

    flex-direction: column;
    margin-bottom: 1rem;
`

const CurrentDraftInformation = styled.div`
    flex-grow: 1;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
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
