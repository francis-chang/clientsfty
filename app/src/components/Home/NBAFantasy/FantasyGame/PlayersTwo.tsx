import React from 'react'
import { styled } from 'utils/theme'
import * as Icons from '@fortawesome/pro-duotone-svg-icons'
import * as RegularIcons from '@fortawesome/pro-regular-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fonfts = [Icons.faCampfire, Icons.faMoon, Icons.faPlanetMoon, Icons.faVolcano, Icons.faSunHaze]

const asdf = [
    Icons.faSoftServe,
    Icons.faVihara,
    Icons.faTruckPickup,
    Icons.faBasketballHoop,
    Icons.faBird,
    Icons.faFire,
    Icons.faUser,
]

const PlayersTwo: React.FC = () => {
    return (
        <>
            <Notice>
                <NoticeTitle>Waiting on Commissioner</NoticeTitle>
            </Notice>
            <Container>
                {asdf.map((f) => (
                    <UserContainer key={f.iconName}>
                        <Icon>
                            <FontAwesomeIcon icon={f} />
                        </Icon>
                        <Name>{f.iconName.slice(0, 17)}</Name>
                    </UserContainer>
                ))}
                <UserContainer>
                    <Icon>
                        <FontAwesomeIcon icon={faUser} />
                    </Icon>
                    <Name>foobar</Name>
                </UserContainer>

                {/* {fonfts.map((f) => (
                    <UserContainer key={f.iconName}>
                        <Icon>
                            <FontAwesomeIcon icon={f} />
                        </Icon>
                        <Name>{f.iconName.slice(0, 20)}</Name>
                    </UserContainer>
                ))} */}
            </Container>
        </>
    )
}

export default PlayersTwo

const Notice = styled.div`
    width: 100%;
    padding: 1rem 0rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const NoticeTitle = styled.div`
    font-weight: 500;

    padding: 0.6rem 0.7rem;
    border-radius: 4px;

    color: ${({ theme }) => theme.colors.light2}; ;
`

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light25};
    margin-bottom: 0.5rem;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 0.5rem;
    padding-bottom: 0.5rem;
`

const UserContainer = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;
    margin-bottom: 0.4rem;
    padding: 0.5rem 0rem;

    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark25};
`

const Name = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    flex-grow: 1;
`

const Icon = styled.div`
    width: 3rem;
    display: flex;
    justify-content: center;
    font-size: 1.35rem;
    color: ${({ theme }) => {
        const randomIndex = Math.floor(Math.random() * theme.list.length)
        return theme.list[randomIndex]
    }};
`
