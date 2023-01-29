import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from 'utils/api/game'

const categories: Cats[] = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'TOS', 'TPM', 'FGP', 'FTP']

export const defaultForm = {
    name: '',
    numGames: 4,
    draftFormat: 'LIVE_DRAFT',
    numberOfTeamsToSimul: 12,
    gameType: 'SINGLE',
    cats: categories,
}

const useForm = () => {
    const [formData, sFD] = useState(defaultForm)
    const [formIsValid, setFormIsValid] = useState(false)

    useEffect(() => {
        if (formData.name.length >= 1 && formData.cats.length >= 1) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }, [formData])

    const navigate = useNavigate()

    const setFormData = (data: Partial<typeof defaultForm>) => {
        sFD({ ...formData, ...data })
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await createGame(formData)
        if (response) {
            navigate(`/nbafantasygame/${response.game_id}`)
        }
    }

    return [formData, setFormData, submit, formIsValid] as const
}

export default useForm
