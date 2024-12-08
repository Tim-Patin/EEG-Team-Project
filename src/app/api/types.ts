export type Prediction = {
    prediction: string;
    accuracy: number;
};

export type Context = {
    uploaded: CallableFunction;
    prediction: CallableFunction;
    UnprocessedRaw: CallableFunction;
    UnprocessedRawPSD: CallableFunction;
    ProcessedRaw: CallableFunction;
    ProcessedRawPSD: CallableFunction;
};

export type Images = {
    unprocessedRaw: string;
    unprocessedRawPSD: string;
    processedRaw: string;
    processedRawPSD: string;
}

export type ContextProps = {
    className?: string;
    context?: Context;
}

export type ResultsProps = {
    data: Prediction;
    context: Context;
    images: Images;
}