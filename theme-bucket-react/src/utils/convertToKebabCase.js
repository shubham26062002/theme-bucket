const convertToKebabCase = (inputString) => {
    const stringWithSpaces = inputString.replace(/[^\w]/g, ' ')

    const words = stringWithSpaces.split(/\s+/)

    const kebabCaseString = words.join('-').toLowerCase()

    return kebabCaseString
}

export default convertToKebabCase