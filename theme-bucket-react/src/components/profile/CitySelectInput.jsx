import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

const FormSelectInput = ({
    label,
    id,
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
    selectedCity,
    selectedCountry,
}) => {
    const [cities, setCities] = useState(() => [])

    useEffect(() => {
        const getCities = async () => {
            if (selectedCountry === 'Select a country') {
                const { data, error } = await supabase
                    .from('cities')
                    .select()
                setCities(data)
            } else {
                const { data, error } = await supabase
                    .from('cities')
                    .select()
                    .eq('country_id', selectedCountry)
                setCities(data)
            }
        }
        getCities()
    }, [selectedCountry])

    return (
        <div>
            <label className="font-medium text-neutral-900 block text-sm"
                htmlFor="country">{label}</label>
            <select
                className={twMerge('block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre', disabled && 'opacity-50 cursor-not-allowed')}
                id={id} disabled={disabled} value={selectedCity ? selectedCity : 'Select a city'}
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
            >
                <option value="Select a city" disabled hidden>Select a city</option>
                {
                    cities.map((city) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))
                }
            </select>
            {errors[id] && <span className="text-red-500 text-sm">{errors[id].message}</span>}
        </div >
    )
}

export default FormSelectInput