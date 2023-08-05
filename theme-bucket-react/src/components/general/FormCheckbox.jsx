import { twMerge } from "tailwind-merge"

const FormCheckbox = ({
    label,
    id,
    disabled = false,
    register,
    errors,
}) => {
    return (
        <div className="mr-2">
            <input className={twMerge('inline-block mr-3', disabled && 'opacity-50 cursor-not-allowed')} id={id} type="checkbox" {...register(id)} disabled={disabled} />
            <label className="font-medium text-neutral-900 inline-block text-sm" htmlFor="termsAndConditions">{label}</label>
            {errors[id] && <span className="text-red-500 text-sm block">{errors[id].message}</span>}
        </div>
    )
}

export default FormCheckbox