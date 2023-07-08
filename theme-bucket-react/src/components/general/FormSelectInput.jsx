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
    tableName,
    selected,
    countryID,
}) => {
    const [selectOptions, setSelectOptions] = useState(() => [])

    useEffect(() => {
        const getOptions = async () => {
            const { data, error } = await supabase
                .from(tableName)
                .select()
            setSelectOptions(data)
        }
        getOptions()
    }, [])

    return (
        <div>
            <label className="font-medium text-neutral-900 block text-sm"
                htmlFor="country">{label}</label>
            <select
                className={twMerge('block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre', disabled && 'opacity-50 cursor-not-allowed')}
                id={id} disabled={disabled}
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
                {!countryID ?
                selectOptions.map((option) => <option key={option.id} value={option.id} selected={option.id === selected}>{option.name}</option>)
                :
                    selectOptions.filter((option)=>{if(countryID===option.country_id) return option;}).map((filteredoption)=>
                         <option key={filteredoption.id} value={filteredoption.id} selected={filteredoption.id === selected}>{filteredoption.name}</option>)
                    }
            </select>
            {errors[id] && <span className="text-red-500 text-sm">{errors[id].message}</span>}
        </div >
    )
}

export default FormSelectInput