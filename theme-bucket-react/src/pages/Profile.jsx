import { useOutletContext } from 'react-router-dom'
import FormInput from '../components/general/FormInput'
import { useCallback, useState } from 'react'
import FormButton from '../components/general/FormButton'
import { useForm } from 'react-hook-form'
import FormSelectInput from '../components/general/FormSelectInput'
import CitySelectInput from '../components/profile/CitySelectInput'
import { toast } from 'react-hot-toast'
import { supabase } from '../libs/supabase-client'

const Profile = () => {
    const { session, profile } = useOutletContext()

    const [isEditDisabled, setEditDisabled] = useState(() => true)

    const toggleIsEditDisabled = useCallback(() => {
        setEditDisabled((previousIsEditDisabled) => !previousIsEditDisabled)
    }, [isEditDisabled])

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            name: profile?.full_name,
            email: session?.user.email,
            country: profile?.country_id || 'Select a country',
            city: profile?.city_id || 'Select a city',
            githubProfile: profile?.github_url,
            linkedinProfile: profile?.linkedin_url,
        },
    })

    const onSubmit = (data) => {
        setEditDisabled(true)

        toast.promise(
            supabase.from('profiles').update({
                full_name: data.name || null,
                country_id: data.country || null,
                city_id: data.city || null,
                github_url: data.githubProfile || null,
                linkedin_url: data.linkedinProfile || null
            }).eq("id", session?.user.id),
            {
                loading: 'Saving...',
                success: () => {
                    setEditDisabled(true)
                    return "Profile updated successfully!"
                },
                error: () => {
                    setEditDisabled(true)
                    return "Error occurred while updating your profile."
                }
            }
        )
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
                            <FormSelectInput label="Country" id="country" tableName="countries" register={register} errors={errors} disabled={isEditDisabled} selected={watch().country} />
                            <CitySelectInput label="City" id="city" register={register} errors={errors} disabled={isEditDisabled} selectedCity={watch().city} selectedCountry={watch().country} />
                        </div>
                    </div>
                    <div className="mt-10">
                        <h1
                            className="bg-black-2 bg-opacity-90 py-2 px-4 font-bold text-white uppercase tracking-widest">
                            Social</h1>
                        <div className="py-4 grid grid-cols-1 gap-x-12 gap-y-6">
                            <FormInput label="GitHub Profile" id="githubProfile" disabled={isEditDisabled} register={register} errors={errors} />
                            <FormInput label="Linked-In Profile" id="linkedinProfile" disabled={isEditDisabled} register={register} errors={errors} />
                        </div>
                    </div>

                    {!isEditDisabled && <FormButton label="Save" type='submit' />}
                </form>
                {
                    isEditDisabled
                        ?
                        <FormButton label="Edit" onClick={toggleIsEditDisabled} />
                        :
                        <FormButton label="Cancel" onClick={() => {
                            toggleIsEditDisabled()
                            reset()
                        }} />
                }
            </div>
        </div>
    )
}

export default Profile