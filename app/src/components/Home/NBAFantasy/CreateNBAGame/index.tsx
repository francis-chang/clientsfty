import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Button, styled } from 'utils/theme'
import DraftFormat from './DraftFormat'
import NumberOfGames from './NumberOfGames'
import NumberOfPlayers from './NumberOfPlayers'
import Simulate from './Simulate'
import useForm from './useForm'

const CreateGame: React.FC = () => {
    const [formData, setFormData, submit] = useForm()

    return (
        <Container>
            <Form onSubmit={submit}>
                <FormElementSticky>
                    <FormMainTitle>Create a Game</FormMainTitle>
                    <Submit type="submit">Create</Submit>
                </FormElementSticky>
                <FormElement>
                    <FormDescription>
                        <FormTitle>Name</FormTitle>
                        <FormSubtitle>Type a name for your fantasy game</FormSubtitle>
                    </FormDescription>
                    <FormElementElement>
                        <Input value={formData.name} onChange={(e) => setFormData({ name: e.target.value })} />
                    </FormElementElement>
                </FormElement>
                <FormElement>
                    <FormDescription>
                        <FormTitle>Number of Games</FormTitle>
                        <FormSubtitle>Choose a number of Games Per Draft Interval</FormSubtitle>
                    </FormDescription>
                    <NumberOfGames
                        onChange={(number: number) => setFormData({ numGames: number })}
                        selected={formData.numGames}
                    />
                </FormElement>
                <FormElement>
                    <FormDescription>
                        <FormTitle>Draft Format</FormTitle>
                        <FormSubtitle>
                            Choose how to draft. These settings can be configured for each Draft Interval later.
                        </FormSubtitle>
                    </FormDescription>
                    <DraftFormat
                        onChange={(draftFormat: string) => setFormData({ draftFormat })}
                        selected={formData.draftFormat}
                    />
                </FormElement>
                <FormElement>
                    <FormDescription>
                        <FormTitle>Simulate Draft</FormTitle>
                        <FormSubtitle>
                            Choose a number of AI bots for each player in your game to draft against.
                        </FormSubtitle>
                    </FormDescription>

                    <Simulate
                        disabled={formData.draftFormat !== 'AI_DRAFT'}
                        onClick={(numberOfTeamsToSimul: number) => setFormData({ numberOfTeamsToSimul })}
                        selected={formData.numberOfTeamsToSimul}
                    />
                </FormElement>

                <FormElement>
                    <FormDescription>
                        <FormTitle>Number of Players</FormTitle>
                        <FormSubtitle>
                            Choose Number of Players that can join the game. Vacant spots will be filled with Bots.
                        </FormSubtitle>
                    </FormDescription>

                    <NumberOfPlayers
                        onChange={(number: number) => setFormData({ numGames: number })}
                        selected={formData.numGames}
                    />
                </FormElement>
            </Form>
        </Container>
    )
}

export default CreateGame

const Submit = styled(Button)`
    font-weight: 700;
`

const FormMainTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
`

const Container = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    /* width */
    ::-webkit-scrollbar {
        width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.dark2};
        border-radius: 10px;
    }

    /* Handle on hover */
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 750px;
    flex-grow: 1;
    position: relative;
    margin-right: 1rem;
`

const FormElement = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem 1rem;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.dark25}`};
    background-color: ${({ theme }) => theme.colors.dark4};
`

const FormElementSticky = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem 1rem;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.dark25}`};
    position: sticky;
    top: 0;
    overflow: hidden;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.dark4};
`

const FormDescription = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-right: 1.5rem;
    align-self: flex-start;
`

const FormTitle = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
`

const FormSubtitle = styled.div`
    color: ${({ theme }) => theme.colors.light4};
`

const FormElementElement = styled.div``

const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.dark4};
    outline: ${({ theme }) => `${theme.colors.dark1} solid 1px`};
    color: ${({ theme }) => theme.colors.light1};
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    width: 17rem;
    &:focus {
        outline: ${({ theme }) => `${theme.colors.lightblue3} solid 2px`};
    }
`
