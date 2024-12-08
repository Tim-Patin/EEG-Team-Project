
export async function POST(request: Request): Promise<Response> {
    const response = await fetch('http://localhost:8000/upload', {
        method: "POST",
        body: request.body
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}

