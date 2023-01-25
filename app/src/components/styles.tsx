import { styled } from 'utils/theme'
const Container = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-top: 5rem;
    width: 21rem;
    padding-bottom: 10rem;
`

const AuthContainer = styled.form`
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`

const ContainerTitle = styled.div`
    font-weight: 700;
    font-size: 2.5rem;
    text-align: center;
    padding-bottom: 1rem;
`

const LabelAndInput = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
`

const Label = styled.label`
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
    font-weight: 700;
`

const Input = styled.input`
    padding: 0.7rem;
    background-color: ${({ theme }) => theme.colors.dark4};
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.light2};
    font-size: 1rem;
    width: 100%;
    &:active,
    &:focus {
        outline: ${({ theme }) => `1px solid ${theme.colors.lightblue3}`};
    }
`

export { ContainerTitle, AuthContainer, Container, Input, Label, LabelAndInput }
