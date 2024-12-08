"use client"

import {getImage, getResults} from "@/app/api/Utils";
import {Prediction, ContextProps} from "@/app/api/types";

export default function SubmitButton(props: ContextProps) {
    function handleClick() {
        const fileInput: HTMLInputElement | null = document.getElementById("dropzone-file") as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files.item(0);
            if (file) {
                if (file.name.toLowerCase().endsWith('.set')) {
                    if (props.context && props.context.uploaded) {
                        props.context.uploaded(true);
                    }

                    getResults(file).then((prediction: Prediction) => {
                        if (props.context && props.context.prediction) {
                            props.context.prediction(prediction);
                            console.log(prediction);
                        }
                    });

                    getImage("UnprocessedRaw").then((imageURL: string) => {
                        if (props.context && props.context.UnprocessedRaw) {
                            props.context.UnprocessedRaw(imageURL);
                            console.log(imageURL);
                        }
                    });

                    getImage("UnprocessedRawPSD").then((imageURL: string) => {
                        if (props.context && props.context.UnprocessedRawPSD) {
                            props.context.UnprocessedRawPSD(imageURL);
                            console.log(imageURL);
                        }
                    });

                    getImage("ProcessedRaw").then((imageURL: string) => {
                        if (props.context && props.context.ProcessedRaw) {
                            props.context.ProcessedRaw(imageURL);
                            console.log(imageURL);
                        }
                    });

                    getImage("ProcessedRawPSD").then((imageURL: string) => {
                        if (props.context && props.context.ProcessedRawPSD) {
                            props.context.ProcessedRawPSD(imageURL);
                            console.log(imageURL);
                        }
                    });
                }
            }
        } else {
            console.error("No file selected or element not found.");
        }
    }

    return (<div className={props.className}>
        <button id="submit" onClick={handleClick}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center
                text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                dark:focus:ring-blue-900">
            Submit
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>);
}