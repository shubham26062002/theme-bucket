import { useOutletContext } from 'react-router-dom'
import FormInput from '../components/general/FormInput'
import { useCallback, useState } from 'react'
import FormButton from '../components/general/FormButton'
import { useForm } from 'react-hook-form'

const Profile = () => {
    const { session, profile } = useOutletContext()

    const [isEditDisabled, setEditDisabled] = useState(() => true)

    const toggleIsEditDisabled = useCallback(() => {
        setEditDisabled((previousIsEditDisabled) => !previousIsEditDisabled)
    }, [isEditDisabled])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: profile?.full_name,
            email: session?.user.email,
            githubProfile: profile?.github_url,
            linkedinProfile: profile?.linkedin_url,
        },
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <h1 className="text-3xl font-normal leading-snug text-gray-700 text-center">
                Welcome!&nbsp;
                <span className="uppercase font-bold">{profile?.full_name}</span>
            </h1>
            <div className="mt-14">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1
                            className="bg-black-2 bg-opacity-90 py-2 px-4 font-bold text-white uppercase tracking-widest">
                            Personal Information</h1>
                        <div className="py-4 grid grid-cols-1 desktop:grid-cols-2 gap-x-12 gap-y-6">
                            <FormInput label="Name" id="name" disabled={isEditDisabled} register={register} errors={errors} />
                            <FormInput label="Email" id="email" disabled register={register} errors={errors} />
                            {/* <div>
                                <label className="font-medium text-neutral-900 block text-sm"
                                    htmlFor="country">Country</label>
                                <select
                                    className="block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre"
                                    id="country">
                                    <option value="usa">United States</option>
                                    <option value="canada">Canada</option>
                                    <option value="mexico">Mexico</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-medium text-neutral-900 block text-sm"
                                    htmlFor="country">Country</label>
                                <select
                                    className="block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre"
                                    id="country">
                                    <option value="usa">United States</option>
                                    <option value="canada">Canada</option>
                                    <option value="mexico">Mexico</option>
                                </select>
                            </div> */}
                        </div>
                    </div>
                    <div className="mt-10">
                        <h1
                            className="bg-black-2 bg-opacity-90 py-2 px-4 font-bold text-white uppercase tracking-widest">
                            Social</h1>
                        <div className="py-4 grid grid-cols-1 gap-x-12 gap-y-6">
                            <FormInput label="GitHub Profile" id="github-profile" disabled={isEditDisabled} register={register} errors={errors} />
                            <FormInput label="Linked-In Profile" id="linkedin-profile" disabled={isEditDisabled} register={register} errors={errors} />
                        </div>
                    </div>

                    {!isEditDisabled && <FormButton label="Save" type='submit' />}
                </form>
                {
                    isEditDisabled
                        ?
                        <FormButton label="Edit" onClick={toggleIsEditDisabled} />
                        :
                        <FormButton label="Cancel" onClick={toggleIsEditDisabled} />
                }
            </div>
        </div>
    )
}

export default Profile