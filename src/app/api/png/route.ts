

// This function can be defined in a separate module and imported where needed
export async function GET(request: Request): Promise<Response> {
    const requestedImage: string | null = request.headers.get("image_name");

    const response = await fetch('http://localhost:8000/'+requestedImage, {
        headers: {'Accept': 'image/png'},
        method: "GET"
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const buffer: ArrayBuffer = await response.arrayBuffer(); // Get the image as an ArrayBuffer
    return new Response(buffer, {
        status: 200,
        headers: {'Content-Type': 'image/png'}
    });
}
