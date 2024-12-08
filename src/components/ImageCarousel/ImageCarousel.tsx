"use client"

import {ResultsProps} from "@/app/api/types";
import {useState} from "react";

export default function ImageCarousel(props: ResultsProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    function onPrev() {
        if (activeIndex == 0) {
            setActiveIndex(3);
        } else {
            setActiveIndex(activeIndex - 1);
        }
    }

    function onNext() {
        if (activeIndex == 3) {
            setActiveIndex(0);
        } else {
            setActiveIndex(activeIndex + 1);
        }
    }

    let unprocessedRaw = (<div></div>);
    if (props.images.unprocessedRaw !== "") {
        unprocessedRaw = <div>
            <img src={props.images.unprocessedRaw}
                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                 alt="..."/>
            <p className="justify-center text-center text-lg font-medium text-gray-900 dark:text-white mt-64">Unprocessed Raw EEG</p>
        </div>
    }

    let unprocessedRawPSD = (<div></div>);
    if (props.images.unprocessedRawPSD !== "") {
        unprocessedRawPSD = <div>
            <img src={props.images.unprocessedRawPSD}
                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                 alt="..."/>
            <p className="justify-center text-center text-lg font-medium text-gray-900 dark:text-white mt-16">Unprocessed Raw Power Spectral Density</p>
        </div>
    }

    let processedRaw = (<div></div>);
    if (props.images.processedRaw !== "") {
        processedRaw = <div>
            <img src={props.images.processedRaw}
                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                 alt="..."/>
            <p className="justify-center text-center text-lg font-medium text-gray-900 dark:text-white mt-64">Processed EEG</p>
        </div>
    }

    let processedRawPSD = (<div></div>);
    if (props.images.processedRawPSD !== "") {
        processedRawPSD = <div>
            <img src={props.images.processedRawPSD}
                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                 alt="..."/>
            <p className="justify-center text-center text-lg font-medium text-gray-900 dark:text-white mt-16">Processed Power Spectral Density</p>
        </div>
    }

    const carouselImages = (
            <div className="overflow-hidden rounded-lg md:h-96">
                <div className={activeIndex === 0 ? "duration-700 ease-in-out" : "hidden duration-700 ease-in-out"}>
                    {unprocessedRaw}
                </div>

                <div className={activeIndex === 1 ? "duration-700 ease-in-out" : "hidden duration-700 ease-in-out"}>
                    {unprocessedRawPSD}
                </div>

                <div className={activeIndex === 2 ? "duration-700 ease-in-out" : "hidden duration-700 ease-in-out"}>
                    {processedRaw}
                </div>

                <div className={activeIndex === 3 ? "duration-700 ease-in-out" : "hidden duration-700 ease-in-out"}>
                    {processedRawPSD}
                </div>
            </div>
            );

            return (

            <div id="indicators-carousel" className="h-full w-full" data-carousel="static">
                {carouselImages}

                <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                            data-carousel-slide-to="0"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                            data-carousel-slide-to="1"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
                            data-carousel-slide-to="2"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"
                            data-carousel-slide-to="3"></button>
                </div>

                <button type="button"
                        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev="" onClick={onPrev}>
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
                </button>
                <button type="button"
                        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next="" onClick={onNext}>
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
                </button>
            </div>
            );
            }