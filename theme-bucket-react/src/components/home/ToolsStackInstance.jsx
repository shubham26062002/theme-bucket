const ToolsStackInstance = ({
    imageUrl,
    name,
}) => {
    return (
        <div className="flex justify-start items-center gap-3 mx-auto">
            <img className="h-12 aspect-square" src={imageUrl} alt={name} />
            <h1 className="text-gray-400 font-semibold text-lg">{name}</h1>
        </div>
    )
}

export default ToolsStackInstance