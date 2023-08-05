import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import FormInput from '../components/general/FormInput'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import FormSelectInput from '../components/general/FormSelectInput'
import FormTextarea from '../components/general/FormTextarea'
import FormCheckbox from '../components/general/FormCheckbox'
import { useDropzone } from 'react-dropzone'
import FileUpload from '../components/add-product/FileUpload'
import FormButton from '../components/general/FormButton'
import { twMerge } from 'tailwind-merge'
import convertToKebabCase from '../utils/convertToKebabCase'
import uniqid from 'uniqid'
import { toast } from 'react-hot-toast'
import { supabase } from '../libs/supabase-client'

const schema = z.object({
    name: z.string().nonempty({
        message: 'Name cannot be empty.',
    }).refine((value) => !/^\s*$/.test(value), {
        message: 'Only blank spaces are not allowed.',
    }),
    price: z.string().nonempty({
        message: 'Price cannot be empty.',
    }).refine((value) => /^\d+(\.\d+)?$/.test(value), {
        message: 'Price must be a positive numeric value.',
    }),
    category: z.string().nonempty({
        message: 'Category cannot be empty.',
    }).refine((value) => value !== 'Select a category', {
        message: 'Category cannot be empty.'
    }),
    description: z.string(),
    livePreviewUrl: z.string(),
    toolsStack: z.string(),
    compatibleBrowsers: z.string(),
    isResponsive: z.boolean(),
    images: z.array(z.any()).nonempty({
        message: 'Images cannot be empty. Upload at least one image.',
    }),
    src: z.array(z.any()).max(1, {
        message: 'Multiple source files are not allowed.',
    }).min(1, {
        message: 'Source cannot be empty. Upload source file.',
    })
})

const EditProduct = () => {
    const { profile } = useOutletContext()

    const { productId } = useParams()

    const navigate = useNavigate()

    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (profile.role === 'BUYER') {
            navigate(`/profile/${profile.id}/become-a-seller`)
        }

        const getProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select()
                .eq('id', productId)
                .eq('publisher_id', profile.id)

            if (error) {
                console.log('ERROR_AT_EDIT_PRODUCT', 'GET_PRODUCT_ERROR', error)
                throw new Error('ERROR_AT_EDIT_PRODUCT', 'GET_PRODUCT_ERROR', error)
            }

            if (data.length === 0) {
                navigate(`/profile/${profile.id}/sales`)
            }

            setProduct(data[0])
        }

        getProduct()
    }, [profile, productId])

    console.log(product)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: product?.name,
            price: product?.price,
            category: product?.category,
            description: product?.description,
            livePreviewUrl: product?.live_preview_url,
            toolsStack: product?.tools_stack,
            compatibleBrowsers: product?.compatible_browsers,
            isResponsive: product?.is_responsive,
            images: [],
            src: [],
        }
    })

    const [images, setImages] = useState([])

    const onImageDrop = (droppedImages) => {
        const newImages = [...images, ...droppedImages]
        setImages(newImages)
        setValue('images', newImages)
    }

    const { getRootProps: imagesGetRootProps, getInputProps: imagesGetInputProps, isDragActive: imagesIsDragActive } = useDropzone({
        onDrop: onImageDrop,
        accept: 'image/*',
        multiple: true,
    })

    const removeImage = (index) => {
        const newImages = [...images]
        newImages.splice(index, 1);
        setImages(newImages)
        setValue('images', newImages)
    }

    const [src, setSrc] = useState([])

    const onSrcDrop = (droppedSrc) => {
        const newSrc = [...src, ...droppedSrc]
        setSrc(newSrc)
        setValue('src', newSrc)
    }

    const { getRootProps: srcGetRootProps, getInputProps: srcGetInputProps, isDragActive: srcIsDragActive } = useDropzone({
        onDrop: onSrcDrop,
        accept: 'image/*',
        multiple: false,
    })

    const removeSrc = (index) => {
        const newSrc = [...src]
        newSrc.splice(index, 1)
        setSrc(newSrc)
        setValue('src', newSrc)
    }

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        setLoading(true)

        console.log(values)
        try {
            const productNameInKebabCase = convertToKebabCase(values.name)

            const productSrcName = `${productNameInKebabCase}-${uniqid()}`

            const productSrc = values.src[0]

            const { data: productSrcData, error: productSrcError } = await supabase.storage.from('product_src').upload(productSrcName, productSrc)

            if (productSrcError) {
                console.log('ERROR_AT_ADD_PRODUCT', productSrcError)
                throw new Error('ERROR_AT_ADD_PRODUCT', productSrcError)
            }

            const { data: productData, error: productError } = await supabase.from('products').insert({
                name: values.name,
                price: values.price,
                description: values.description,
                live_preview_url: values.livePreviewUrl,
                tools_stack: values.toolsStack,
                is_responsive: values.isResponsive,
                compatible_browsers: values.compatibleBrowsers,
                src_url: productSrcData.path,
                category_id: values.category,
                publisher_id: profile.id,
            }).select()

            if (productError) {
                console.log('ERROR_AT_ADD_PRODUCT', productError)
                throw new Error('ERROR_AT_ADD_PRODUCT', productError)
            }

            values.images.forEach((image) => {
                const productImageName = `${productNameInKebabCase}-${uniqid()}`

                const insertProductImages = async () => {
                    const { data: imageData, error: imageError } = await supabase.storage.from('product_images').upload(productImageName, image)

                    if (imageError) {
                        console.log('ERROR_AT_ADD_PRODUCT', imageError)
                        throw new Error('ERROR_AT_ADD_PRODUCT', imageError)
                    }

                    const { data: productImageData, error: productImageError } = await supabase.from('product_images').insert({
                        product_id: productData?.[0].id,
                        image_url: imageData.path,
                    })

                    if (productImageError) {
                        console.log('ERROR_AT_ADD_PRODUCT', productImageError)
                        throw new Error('ERROR_AT_ADD_PRODUCT', productImageError)
                    }
                }

                insertProductImages()
            })

            toast.success('Product added successfully!')
        } catch (error) {
            console.log('ERROR_AT_ADD_PRODUCT', error)
            throw new Error('ERROR_AT_ADD_PRODUCT', error)
        } finally {
            setLoading(false)
        }
    }

    const [selectOptions, setSelectOptions] = useState(() => [])

    useEffect(() => {
        const getOptions = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select()
            setSelectOptions(data)
        }
        getOptions()
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-normal leading-snug text-gray-700 text-center">
                Provide your <span className="uppercase font-bold">product info! </span>and
                <span className="uppercase font-bold">upload</span>
            </h1>
            <div className="mt-14">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1
                            className="bg-black-2 bg-opacity-90 py-2 px-4 font-bold text-white uppercase tracking-widest">
                            PRODUCT INFORMATION</h1>
                        <div className="py-4 grid grid-cols-1 desktop:grid-cols-2 gap-x-12 gap-y-6">
                            <FormInput label="Name" id="name" register={register} errors={errors} disabled={loading} />
                            <FormInput label="Price" id="price" register={register} errors={errors} disabled={loading} />
                        </div>
                        <div className="py-4 grid grid-cols-1 gap-x-12 gap-y-6">
                            {/* <FormSelectInput label="Category" id="category" register={register} errors={errors} tableName="categories" disabled={loading} /> */}

                            <div>
                                <label className="font-medium text-neutral-900 block text-sm"
                                    htmlFor="category">Category</label>
                                <select
                                    className={twMerge('block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre', loading && 'opacity-50 cursor-not-allowed')}
                                    id="category" disabled={loading} value={watch('category')}
                                    {...register('category')}>
                                    <option value="Select a category" disabled hidden>Select a category</option>
                                    {
                                        selectOptions.map((option) => (
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        ))
                                    }
                                </select>
                                {errors['category'] && <span className="text-red-500 text-sm">{errors['category'].message}</span>}
                            </div >

                            <FormTextarea label="description" id="description" register={register} errors={errors} disabled={loading} />
                            <FormInput label="Live Preview URL" id="livePreviewUrl" register={register} errors={errors} disabled={loading} />
                            <FormInput label="Tool Stack" id="toolsStack" register={register} errors={errors} disabled={loading} />
                            <FormInput label="Compatible Browsers" id="compatibleBrowsers" register={register} errors={errors} disabled={loading} />
                            <FormCheckbox label="Check if Theme/Templates is Responsive." id="isResponsive" register={register} errors={errors} disabled={loading} />
                        </div>
                    </div>
                    <div className="mt-12">
                        <h1
                            className="bg-black-2 bg-opacity-90 py-2 px-4 font-bold text-white uppercase tracking-widest">
                            Images & Src</h1>
                        <div className="mt-4 p-8 desktop:px-16 grid grid-cols-1 gap-x-12 gap-y-6 bg-gray-100">
                            <FileUpload id="images" label="Images" isDragActive={imagesIsDragActive} getRootProps={imagesGetRootProps} multiple register={register} getInputProps={imagesGetInputProps} data={images} onRemove={removeImage} errors={errors} disabled={loading} />
                        </div>
                        <div className="mt-4 p-8 desktop:px-16 grid grid-cols-1 gap-x-12 gap-y-6 bg-gray-100">
                            <FileUpload id="src" label="Source" isDragActive={srcIsDragActive} getRootProps={srcGetRootProps} register={register} getInputProps={srcGetInputProps} data={src} onRemove={removeSrc} errors={errors} disabled={loading} />
                        </div>
                    </div>
                    <FormButton label="Add Product" type="submit" disabled={loading} />
                </form>
            </div>
        </div>
    )
}

export default EditProduct