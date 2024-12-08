import {Prediction} from "@/app/api/types";


export default async function fetchWithTimeout(requestURL: string, options = {}, timeout = 5000) {
    const controller = new AbortController();
    let response: Response;

    setTimeout(() => controller.abort(), timeout);

    if (!requestURL) {
        console.log("options\n" + options);
        response = new Response(null, { status: 408 });
    } else {
        try {
            response = await fetch(requestURL, {
                ...options,
                signal: controller.signal,
            });
        } catch (error) {
            console.log(error);
            response = new Response(null, { status: 408 });
        }
    }

    return response;
}

export async function getResults(inputFile: File): Promise<Prediction> {
    const formData = new FormData();
    formData.append("file", inputFile);

    const resultsResponse = await fetchWithTimeout("http://localhost:8000/upload", {
        method: "POST",
        body: formData
    });
    if (resultsResponse.status === 200) {
        const data = await resultsResponse.json();
        return {"prediction":data.prediction, "accuracy":data.accuracy} as Prediction;
    } else {
        const data = await resultsResponse.json();
        console.log("error", resultsResponse.status, "data: ",data);
        throw new Error('Failed to get results.');
    }
}

export async function getImage(imageName: string): Promise<string> {
    const imageResponse = await fetchWithTimeout("http://localhost:8000/"+imageName, {
        method: "GET"
    });

    if (imageResponse.status === 200 && imageResponse.body) {
        const blob = await imageResponse.blob();
        return URL.createObjectURL(blob);
    } else {
        console.log("error", imageResponse.status, imageResponse.statusText);
        throw new Error('Failed to get image' );
    }
}