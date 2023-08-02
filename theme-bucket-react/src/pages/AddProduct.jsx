import { useParams } from 'react-router-dom'
import FormInput from '../components/general/FormInput'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import FormSelectInput from '../components/general/FormSelectInput'
import FormTextarea from '../components/general/FormTextarea'
import FormCheckbox from '../components/general/FormCheckbox'
import { twMerge } from 'tailwind-merge'

const schema = z.object({
    name: z.string().nonempty({
        message: 'Name cannot be empty.',
    }).refine((value) => !/^\s*$/.test(value), {
        message: 'Only blank spaces are not allowed.',
    }),
    price: z.number().refine((value) => {
        try {
            Number(value)
            return true
        } catch (error) {
            return false
        }
    }, {
        message: 'Price must be a numeric value.',
    }),
    category: z.string().nonempty({
        message: 'Category cannot be empty.',
    }),
    description: z.string(),
    livePreviewUrl: z.string().url({
        message: 'URL is invalid.',
    }),
    toolStack: z.string().refine((value) => !/^(\s*\w+\s*,\s*)*\s*\w+\s*$/.test(value), {
        message: 'Tool stack must be a comma separated list of words.',
    }),
    compatibleBrowsers: z.string().refine((value) => !/^(\s*\w+\s*,\s*)*\s*\w+\s*$/.test(value), {
        message: 'Compatible browsers must be a comma separated list of words.',
    }),
    isResponsive: z.boolean(),
    images: z.array(z.any().refine((value) => {
        const allowedExtensions = ['png', 'jpeg', 'jpg']
        const extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase()
        return allowedExtensions.includes(extension)
    })).nonempty({
        message: 'Images cannot be empty. Upload at least one image.',
    }),
    src: z.array(z.any().refine((value) => {
        const allowedExtensions = ['zip', 'rar']
        const extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase()
        return allowedExtensions.includes(extension)
    })).max(1, {
        message: 'Multiple source files are not allowed.',
    })
})

const getProduct = async (profileId, productId) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('publisher_id', profileId)
        .eq('id', productId)

    if (error) {
        console.log('ERROR_AT_ADD_PRODUCT', error)
        throw new Error('ERROR_AT_ADD_PRODUCT', error)
    }

    return data[0]
}

const AddProduct = () => {
    const { id, productId } = useParams()

    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (productId === 'add-product') {
            // Add product logic
        } else {
            const product = getProduct(id, productId)


        }
        const getProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select()
                .eq('id', productId)

            if (error) {
                console.log(error)
            }

            console.log(data)
        }
        getProducts()
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            price: '',
            category: '',
            description: '',
            livePreviewUrl: '',
            toolStack: '',
            compatibleBrowsers: '',
            isResponsive: false,
            images: [],
            src: [],
        }
    })

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        setLoading(true)

        console.log(values)
    }

    return (
        <div>
            <h1 class="text-3xl font-normal leading-snug text-gray-700 text-center">
                Provide your <span class="uppercase font-bold">product info! </span>and
                <span class="uppercase font-bold">upload</span>
            </h1>
            <div class="mt-14">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1
                            className="bg-black-2 bg-opacity-90 py-2 px-4 font-bold text-white uppercase tracking-widest">
                            PRODUCT INFORMATION</h1>
                        <div className="py-4 grid grid-cols-1 desktop:grid-cols-2 gap-x-12 gap-y-6">
                            <FormInput label="Name" id="name" register={register} errors={errors} />
                            <FormInput label="Price" id="price" register={register} errors={errors} />
                        </div>
                        <div className="py-4 grid grid-cols-1 gap-x-12 gap-y-6">
                            <FormSelectInput label="Category" id="category" register={register} errors={errors} tableName="categories" />
                            <FormTextarea label="description" id="description" register={register} errors={errors} />
                            <FormInput label="Live Preview URL" id="livePreviewUrl" register={register} errors={errors} />
                            <FormInput label="Tool Stack" id="toolStack" register={register} errors={errors} />
                            <FormInput label="Compatible Browsers" id="compatibleBrowsers" register={register} errors={errors} />
                            {/* <FormCheckbox label="Is Responsive?" id="isResponsive" register={register} error={errors} /> */}
                            <div className="flex items-center gap-4">
                                <label className="font-medium text-neutral-900 inline-block text-sm" htmlFor="termsAndConditions">Is Responsive?</label>
                                <input className={twMerge('inline-block mr-3')} id="isResponsive" type="checkbox" {...register('isResponsive')} />
                                {errors['isResponsive'] && <span className="text-red-500 text-sm block">{errors['isResponsive'].message}</span>}
                            </div>
                        </div>
                    </div>
                    <button
                        class="inline-block mt-10 py-2 px-6 bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100">Upload</button>
                </form>
                {/* <div>
                    <div class="flex flex-col gap-x-12 gap-y-6">
                        <div className="py-4 grid grid-cols-1 desktop:grid-cols-2 gap-x-12 gap-y-6">
                            <FormInput label="Name" id="name" register={register} errors={errors} />
                            <FormInput label="Price" id="price" register={register} errors={errors} />
                        </div>
                        <div>
                            <label for="catagory" class="block mb-2 text-sm font-medium text-gray-900">Select a catagory:</label>
                            <select id="countries_multiple"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-ochre focus:border-yellow-ochre block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-yellow-ochre dark:focus:border-yellow-ochre">
                                <option selected>Choose catagory</option>
                                <option class="focus:bg-yellow-ochre" value="resume">Resume</option>
                                <option value="">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div>
                            <label class="font-medium text-neutral-900 block text-sm" for="itemName">Description</label>
                            <textarea
                                class="block w-full h-48 mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre"
                                id="itemName"></textarea>
                        </div>
                        <div class="flex-1">
                            <label class="font-medium text-neutral-900 block text-sm" for="demoUrl">Demo URL</label>
                            <input
                                class="block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre"
                                placeholder="https://example.com" id="demoUrl" />
                        </div>

                        <div>
                            <label class="font-medium text-neutral-900 block text-sm" for="demoUrl">Tools and Technology
                                used:</label>
                            <input
                                class="block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre"
                                placeholder="HTML,CSS, etc...." id="toolsUsed" />
                        </div>
                        <div>
                            <label class="font-medium text-neutral-900 block text-sm" for="demoUrl">Compatible Browsers:</label>
                            <input
                                class="block w-full mt-2 py-2 rounded-md px-4 border-[1px] border-black-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre"
                                placeholder="Chrome,Edge etc...." id="CompatibleBrowsers" />
                        </div>
                        <div>
                            <label class="font-medium text-neutral-900 block text-sm" for="demoUrl">Compatible Browsers:</label>
                            <div
                                class="flex justify-around w-full mt-2 py-2 px-4 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-ochre">
                                <div class="flex items-center mr-4">
                                    <input id="inline-radio" type="radio" value="yes" name="inline-radio-group"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                                    <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 ">Yes</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input id="inline-radio" type="radio" value="no" name="inline-radio-group"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                                    <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 ">No</label>
                                </div>

                            </div>
                        </div>
                        <div>
                            <label class=" font-medium text-neutral-900 block text-sm" for="demoUrl">Place your files
                                here:</label>
                            <div class="mt-2 bg-gray-100 h-screen w-full sm:px-8 md:px-16 sm:py-8">
                                <main class="container mx-auto max-w-screen-lg h-full">
                                    <article aria-label="File Upload Modal"
                                        class="relative h-full flex flex-col bg-white shadow-xl rounded-md" ondrop="dropHandler(event);"
                                        ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);"
                                        ondragenter="dragEnterHandler(event);">
                                        <div id="overlay"
                                            class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
                                            <i>
                                                <svg class="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24">
                                                    <path
                                                        d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                                                </svg>
                                            </i>
                                            <p class="text-lg text-blue-700">Drop files to upload</p>
                                        </div>

                                        <section class=" overflow-auto p-8 w-full h-full flex flex-col">
                                            <header
                                                class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                                <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                                </p>
                                                <input id="hidden-input" type="file" multiple class="hidden" />
                                                <button id="button"
                                                    class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                    Upload a file
                                                </button>
                                            </header>

                                            <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                                To Upload
                                            </h1>

                                            <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                                                <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center ">
                                                    <img class="mx-auto w-32"
                                                        src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                                        alt="no data" />
                                                    <span class="text-small text-gray-500">No files selected</span>
                                                </li>
                                            </ul>
                                        </section>

                                        <footer class="flex gap-2 justify-end px-8 pb-8 pt-4">
                                            <button id="submit"
                                                class=" px-3 py-1inline-block mt-10 py-2  bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100">
                                                Upload files
                                            </button>
                                            <button id="cancel"
                                                class="px-3 py-1inline-block mt-10 py-2 bg-opacity-90 text-black rounded-md font-semibold hover:bg-gray-200  transition text-opacity-90 hover:text-opacity-100">
                                                Cancel
                                            </button>
                                        </footer>
                                    </article>
                                </main>
                            </div>

                            <template id="file-template">
                                <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                                    <article tabindex="0"
                                        class="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm">
                                        <img alt="upload preview"
                                            class="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed" />

                                        <section
                                            class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                                            <h1 class="flex-1 group-hover:text-blue-800"></h1>
                                            <div class="flex">
                                                <span class="p-1 text-blue-800">
                                                    <i>
                                                        <svg class="fill-current w-4 h-4 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24">
                                                            <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                                        </svg>
                                                    </i>
                                                </span>
                                                <p class="p-1 size text-xs text-gray-700"></p>
                                                <button
                                                    class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800">
                                                    <svg class="pointer-events-none fill-current w-4 h-4 ml-auto"
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path class="pointer-events-none"
                                                            d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </section>
                                    </article>
                                </li>
                            </template>

                            <template id="image-template">
                                <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                                    <article tabindex="0"
                                        class="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
                                        <img alt="upload preview"
                                            class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed" />

                                        <section
                                            class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                                            <h1 class="flex-1"></h1>
                                            <div class="flex">
                                                <span class="p-1">
                                                    <i>
                                                        <svg class="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24">
                                                            <path
                                                                d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                                        </svg>
                                                    </i>
                                                </span>

                                                <p class="p-1 size text-xs"></p>
                                                <button class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                                                    <svg class="pointer-events-none fill-current w-4 h-4 ml-auto"
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path class="pointer-events-none"
                                                            d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </section>
                                    </article>
                                </li>
                            </template>
                        </div>
                    </div>


                </div> */}

            </div>
        </div>
    )
}

export default AddProduct