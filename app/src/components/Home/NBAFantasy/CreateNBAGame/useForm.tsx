import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from 'utils/api/game'

export const defaultForm = {
    name: '',
    numGames: 3,
    draftFormat: 'AI_DRAFT',
    numberOfTeamsToSimul: 12,
}

const useForm = () => {
    const [formData, sFD] = useState(defaultForm)
    const navigate = useNavigate()

    const setFormData = (data: Partial<typeof defaultForm>) => {
        sFD({ ...formData, ...data })
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await createGame(formData)
        if (response) {
            navigate(`/nbafantasy/game/${response.game_id}`)
        }
    }

    return [formData, setFormData, submit] as const
}

export default useForm
