"use client"

import {ResultsProps} from "@/app/api/types";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";

export default function Results(props: ResultsProps) {


    if (props.data.prediction !== "") {
        return (<div>
            <p className="justify-center text-center text-lg font-medium text-gray-900 dark:text-white">Prediction: {props.data.prediction}</p>
            <p className="justify-center text-center text-lg font-medium text-gray-900 dark:text-white">Confidence Level: {props.data.accuracy.toFixed(2) + "%"}</p>
            <div className="pt-[40rem]">
                <div className="">
                    <ImageCarousel context={props.context} data={props.data} images={props.images}></ImageCarousel>
                </div>
            </div>
        </div>);
    } else {
        return (<div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">Loading</p>
        </div>);
    }
}

// <img src={props.images.unprocessedRaw} alt="unprocessedRaw"/>
// <img src={props.images.unprocessedRawPSD} alt="unprocessedRawPSD"/>
// <img src={props.images.processedRaw} alt="processedRaw"/>
// <img src={props.images.processedRawPSD} alt="processedRawPSD"/>