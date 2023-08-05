import { twMerge } from "tailwind-merge"
import { BiTrash } from "react-icons/bi"

const FileUpload = ({
    id,
    label,
    isDragActive,
    getRootProps,
    multiple = false,
    register,
    getInputProps,
    data,
    onRemove,
    errors,
    disabled,
}) => {
    return (
        <div>
            <label className="block w-full font-medium" htmlFor={id}>{label}</label>
            <div className={twMerge(disabled && 'opacity-50 cursor-not-allowed')}>
                <div className={twMerge('mt-2 py-16 px-20 border-2 border-dashed border-neutral-400 text-center cursor-pointer rounded-md', isDragActive && 'border-solid border-[1px] ring-2 ring-yellow-ochre')} {...getRootProps()}>
                    <input id={id} type='file' multiple={multiple} disabled={disabled} {...register(id)} {...getInputProps()} />
                    <p className="font-medium text-gray-500">Drag and drop {label} here, or <br /> Click here to upload</p>
                </div>
                <div className="grid grid-cols-2 desktop:grid-cols-3 gap-6 mt-6">
                    {data.map((item, index) => (
                        <div className="relative" key={index}>
                            <img className="w-full aspect-video object-cover rounded" src={URL.createObjectURL(item)} alt={item.name} />
                            <button type="button" className="absolute top-2.5 right-2.5 p-1 bg-opacity-80 hover:bg-opacity-100 bg-white rounded-full" onClick={() => onRemove(index)}>
                                <BiTrash className="text-black" size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {errors[id] && <p className="text-red-600 mt-2 text-sm">{errors[id].message}</p>}
        </div>
    )
}

export default FileUpload