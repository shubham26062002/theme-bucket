import { Link } from 'react-router-dom'

const FooterLinksContainer = ({
    containerLabel,
    linksArray = [],
}) => {
    return (
        <div>
            <h1 className="uppercase mb-6 font-semibold text-gray-100 border-b-[1px] border-yellow-ochre">
                {containerLabel}
            </h1>
            <div>
                {linksArray.map((linkData, index) =>
                    <Link key={index} className="block leading-normal font-medium text-gray-400 hover:text-gray-100 transition w-fit mb-1.5"
                        to={linkData.to}>{linkData.label}</Link>
                )}
            </div>
        </div>
    )
}

export default FooterLinksContainer