import { twMerge } from "tailwind-merge"

const FormInput = ({
    id,
    label,
    type = 'text',
    placeholder = '',
    disabled,
    register,
    errors,
    required,
    requiredMessage,
    min,
    minMessage,
    max,
    maxMessage,
    minLength,
    minLengthMessage,
    maxLength,
    maxLengthMessage,
    pattern,
    patternMessage,
    validate,
}) => {
    return (
        <div>
            <label className="font-medium text-neutral-900 block text-sm" htmlFor={id}>{label}</label>
            <input
                className={twMerge('block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre', disabled && 'opacity-50 cursor-not-allowed')}
                id={id} type={type} placeholder={placeholder} disabled={disabled}
                {...register(id, {
                    required: required && {
                        value: required,
                        message: requiredMessage,
                    },
                    min: min && {
                        value: min,
                        message: minMessage,
                    },
                    max: max && {
                        value: max,
                        message: maxMessage,
                    },
                    minLength: minLength && {
                        value: minLength,
                        message: minLengthMessage,
                    },
                    maxLength: maxLength && {
                        value: maxLength,
                        message: maxLengthMessage,
                    },
                    pattern: pattern && {
                        value: pattern,
                        message: patternMessage,
                    },
                    validate: validate
                })}
            />
            {errors[id] && <span className="text-red-500 text-sm">{errors[id].message}</span>}
        </div>
    )
}

export default FormInput