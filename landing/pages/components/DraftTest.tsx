import React from 'react'
import { styled } from '../../styles/theme'

const DraftText: React.FC = () => {
    return (
        <Container>
            <Text>
                <UpperText>
                    Join a live draft with <SpanGreen>friends</SpanGreen> and other <SpanGreen>users</SpanGreen>, or
                    draft against our
                    <SpanBlue> AI drafters</SpanBlue>.
                </UpperText>
                <BottomText>
                    Drafting in real time with other users can be an enjoyable but a time consuming experience; Not to
                    mention everybody needs to be online at the same time.
                </BottomText>
                <BottomText>
                    You can instead draft against our different AI team managers on your own time and use that drafted
                    team in your matchups.
                </BottomText>
                <BottomText>
                    This way you only need to spend a handful of minutes per draft anytime within 24-48 hours before
                    your next draft interval.
                </BottomText>
                <BottomText>
                    The commissioner can configure whether or not the next draft will be done live on a set date or with
                    AI drafters as long as it is done before the next draft interval.
                </BottomText>
            </Text>
        </Container>
    )
}

export default DraftText

const SpanGreen = styled.span`
    color: ${({ theme }) => theme.colors.testgreen2};
`

const SpanBlue = styled.span`
    color: ${({ theme }) => theme.colors.testgreen1};
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1.5rem;
`

const BottomText = styled.div`
    font-size: 1.18rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light3};
    line-height: 1.6rem;
    margin-bottom: 1rem;
`

const UpperText = styled.div`
    font-size: 2.6rem;
    font-weight: 900;
    margin-bottom: 1rem;
`

const Container = styled.div`
    display: flex;
    margin-bottom: 5rem;
`
