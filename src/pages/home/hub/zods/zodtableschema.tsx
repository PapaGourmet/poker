import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const schema = z.object({
    name: z.string()
        .nonempty('Nome da mesa obrigatório')

})

type FormSchema = z.infer<typeof schema>

const RegsiterZodSchema = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        setValue,
        clearErrors
    } = useForm<FormSchema>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    return {
        register,
        handleSubmit,
        errors,
        schema,
        setError,
        reset,
        setValue,
        clearErrors
    }
}

export default RegsiterZodSchema