import { styled } from 'utils/theme'

const FormElement = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem 1rem;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.dark25}`};
    background-color: ${({ theme }) => theme.colors.dark4};
`

const FormSubtitle = styled.div`
    color: ${({ theme }) => theme.colors.light4};
`

const FormElementElement = styled.div`
    display: flex;
`

const FormDescription = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-right: 1.5rem;
    align-self: flex-start;
`

type ImportantProps = {
    important: boolean
}

const FormTitle = styled.div<ImportantProps>`
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
    color: ${({ theme, important }) => (important ? theme.colors.orange1 : theme.colors.light1)};
`

export { FormTitle, FormDescription, FormElement, FormElementElement, FormSubtitle }
