import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormButton from '../components/general/FormButton'
import FormCheckbox from '../components/general/FormCheckbox'
import { useState, useEffect } from 'react'
import { supabase } from '../libs/supabase-client'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
    termsAndConditions: z.boolean().refine((value) => value === true, {
        message: 'You must accept the terms and conditions',
    })
})

const BecomeASeller = () => {
    const { profile } = useOutletContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (profile.role === 'SELLER' || profile.role === 'ADMIN') {
            navigate(`/profile/${profile.id}/sales`)
        }
    }, [profile])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            termsAndConditions: false,
        },
    })

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        setLoading(true)

        try {
            const { error } = await supabase.from('profiles').update({
                role: 'SELLER',
            }).eq('id', profile.id)

            if (error) {
                toast.error('Something went wrong! Please try again.')
            }

            window.location.reload()
        } catch {
            toast.error('Something went wrong! Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-normal leading-snug text-gray-700 text-center">
                Become A&nbsp;
                <span className="uppercase font-bold">SELLER</span>
            </h1>
            <div className="mt-14">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1
                            className="bg-black-2 bg-opacity-90 py-2 px-4 font-bold text-white uppercase tracking-widest">
                            Create Your Seller Profile</h1>
                        <div className="pt-6 grid grid-cols-1">
                            <div>
                                <h1 className="text-neutral-900 font-medium text-lg">Welcome to ThemeBucket! Please read the following Terms and Conditions carefully before using our services.</h1>
                                <ul className="mt-8 mx-8 space-y-1 list-disc text-neutral-700">
                                    <li>By accessing and using our website/app/service, you agree to be bound by these Terms and Conditions.</li>
                                    <li>You must use our services only for lawful purposes and in compliance with all applicable laws and regulations.</li>
                                    <li>All content and materials on our platform are protected by copyright, trademarks, and other intellectual property rights owned by ThemeBucket.</li>
                                    <li>You are responsible for maintaining the confidentiality of your account credentials and any activity that occurs under your account.</li>
                                    <li>Our Privacy Policy outlines how we collect, use, and protect your personal information. By using our services, you agree to the terms in our Privacy Policy.</li>
                                    <li>You are strictly prohibited from engaging in certain activities while using our services, including but not limited to: [list of prohibited activities].</li>
                                    <li>By submitting content to our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute the content.</li>
                                    <li>Our platform may contain links to third-party websites or services. We are not responsible for the content or practices of these external sites.</li>
                                    <li>We provide our services "as is" and make no warranties, express or implied, regarding the accuracy, reliability, or availability of our services.</li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <FormCheckbox label="I have read and agree to the Terms and Conditions." id="termsAndConditions" register={register} errors={errors} />
                            </div>
                        </div>
                    </div>

                    <FormButton label="Join" type="submit" disabled={loading} />
                </form>
            </div>
        </div>
    )
}

export default BecomeASeller