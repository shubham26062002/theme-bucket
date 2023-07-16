import React, { useEffect, useState } from 'react'
import ProductDetailsBox from './ProductDetailsBox'

const ProductDetails = ({
    publishedat,
    responsive,
    toolstack,
    compatiblebrowsers,
    category,
}) => {

    const [toolstate, settoolstate] = useState((()=>[]))

    useEffect(() => {
        if(toolstack!= null){
            let toolsarray = toolstack.split(',')
            settoolstate(toolsarray)
        }
      
    }, [toolstack])
    const [compatiblestate, setcompatiblestate] = useState((()=>[]))

    useEffect(() => {
        if(compatiblebrowsers!= null){
            let cb = compatiblebrowsers.split(',')
            setcompatiblestate(cb)
        }
      
    }, [compatiblebrowsers])

    
    return (
        <>
               <div
                    class="row-start-1 row-end-2 desktop:col-start-3 desktop:col-span-4 border-[1px] py-6 px-4 border-gray-300 rounded-lg space-y-4">
                    <div>
                        <h1 class="text-neutral-700 font-bold uppercase inline-block">Published At:&nbsp;&nbsp; </h1>
                        <span>{publishedat}</span>
                    </div>
                    <div class="h-[1px] bg-gray-300"></div>
                    <div>
                        <h1 class="text-neutral-700 font-bold uppercase ">Tools Stack</h1>
                        <div class="mt-4 space-y-2 ">
                            
                              {toolstate.map((tool,index)=>   <ProductDetailsBox key={index} name={tool} />)}
            
                               
                        </div>
                    </div>
                    <div class="h-[1px] bg-gray-300"></div>
                    <div>
                        <h1 class="text-neutral-700 font-bold uppercase">Categories</h1>
                        <div class="mt-4 space-y-2">
                                <ProductDetailsBox name={category}/>
                           
                        </div>
                    </div>
                    <div class="h-[1px] bg-gray-300"></div>
                    <div>
                        <h1 class="text-neutral-700 font-bold uppercase inline-block">Responsive:&nbsp;&nbsp; </h1>
                        <span>{responsive?"Yes":"No"}</span>
                    </div>
                    <div class="h-[1px] bg-gray-300"></div>
                    <div>
                        <h1 class="text-neutral-700 font-bold uppercase">Compatible Browsers</h1>
                        <div class="mt-4 space-y-2">
                        {compatiblestate.map((browser,index)=>   <ProductDetailsBox key={index} name={browser}/>)}
                               
                        </div>
                    </div>
                </div>
        </>
    )
}

export default ProductDetails