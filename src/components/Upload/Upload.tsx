"use client"

import {ChangeEvent, useState} from "react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import {ContextProps} from "@/app/api/types";

export default function Upload(props: ContextProps) {
    const [html, setHtml] = useState(
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                        drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">.SET</p>
                </div>
                <input onInput={handleFileChange} id="dropzone-file" type="file" className="hidden"/>
            </label>
        </div>
    );


    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setHtml(
                <div className="flex flex-col items-center justify-center -translate-y-1/8 w-3/4 h-32">
                    <label htmlFor="dropzone-file"
                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-5">
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                                {e.target.files[0].name.toUpperCase()}
                            </p>
                        </div>
                        <input onInput={handleFileChange} id="dropzone-file" type="file" className="hidden"/>
                    </label>
                    <div className="mt-4 w-full flex justify-center">
                        <SubmitButton context={props.context} className="flex items-center justify-center"/>
                    </div>
                </div>
            );
        }
    }

    return (html);
}

// <div className="flex items-center justify-center -translate-y-1/4 w-3/4 h-64">
//     <label htmlFor="dropzone-file"
//            className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//         <div className="flex flex-col items-center justify-center pt-5 pb-5">
//             <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">{e.target.files[0].name.toUpperCase()}</p>
//         </div>
//         <input onInput={handleFileChange} id="dropzone-file" type="file" className="hidden"/>
//     </label>
//     <SubmitButton className="flex items-center justify-center"/>
// </div>