import { useState } from 'react'

const defaultForm = {
    name: '',
    numGames: 3,
    draftFormat: 'AI_DRAFT',
}

const useForm = () => {
    const [formData, sFD] = useState(defaultForm)

    const setFormData = (data: Partial<typeof defaultForm>) => {
        sFD({ ...formData, ...data })
    }

    return [formData, setFormData] as const
}

export default useForm
