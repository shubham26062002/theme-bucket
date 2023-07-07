import { createClient } from '@supabase/supabase-js'

export const supabase = globalThis.supabase || createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY)

if (process.env.NODE_ENV !== 'production') {
    globalThis.supabase = supabase
}

// const cities = ['London', 'Manchester', 'Bristal', 'Liverpool', 'Glasgow']
// const COUNTRY_ID = "929ec8b7-4862-44da-8570-1d7e57abd106"

// export const addCountries = () => {
//     cities.forEach(async (city) => {
//         const { error } = await supabase
//             .from('cities')
//             .insert([
//                 { name: city, country_id: COUNTRY_ID },
//             ])
//     })
// }