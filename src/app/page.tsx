"use client"

import Upload from "@/components/Upload/Upload";
import Heading from "@/components/Heading/Heading";
import {Context, Images, Prediction} from "@/app/api/types";
import {useState} from "react";
import Results from "@/components/Results/Results";

export default function Home() {
    const [uploaded, setUploaded] = useState(false);
    const [results, setResults] = useState<Prediction>({prediction:"", accuracy:0} as Prediction);
    const [unprocessedRaw, setUnprocessedRaw] = useState<string>("");
    const [unprocessedRawPSD, setUnprocessedRawPSD] = useState<string>("");
    const [processedRaw, setProcessedRaw] = useState<string>("");
    const [processedRawPSD, setProcessedRawPSD] = useState<string>("");

    const context = {
        uploaded: setUploaded,
        prediction: setResults,
        UnprocessedRaw: setUnprocessedRaw,
        UnprocessedRawPSD: setUnprocessedRawPSD,
        ProcessedRaw: setProcessedRaw,
        ProcessedRawPSD: setProcessedRawPSD,
    } as Context;

    const images = {
        unprocessedRawPSD: unprocessedRawPSD,
        unprocessedRaw: unprocessedRaw,
        processedRawPSD: processedRawPSD,
        processedRaw: processedRaw,
    } as Images;

    const uploadField = (<Upload context={context}></Upload>);
    const resultsField = (<Results context={context} data={results} images={images}></Results>);

    if (uploaded) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div
                    className="translate-y-16 max-w-screen-md max-h-screen flex flex-col items-center justify-center">
                    <Heading></Heading>
                    {resultsField}
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div
                    className="w-3/4 h-3/4 translate-y-16 max-w-screen-md max-h-screen flex flex-col items-center justify-center">
                    <Heading></Heading>
                    {uploadField}
                </div>
            </div>
        );
    }


}