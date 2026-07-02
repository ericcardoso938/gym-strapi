// app/lib/api.ts — Helper para comunicar com o Strapi
export async function fetchFromStrapi(endpoint: string, token?: string) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "");
    const cleanEndpoint = endpoint.replace(/^\//, "");
    const url = `${baseUrl}/api/${cleanEndpoint}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
            cache: 'no-store',
        });

        // A MUDANÇA CRÍTICA ESTÁ AQUI:
        if (!response.ok) {
            console.error(`Falha no request para ${url}. Status: ${response.status}`);
            // Retornamos um objeto com error: true em vez de dar 'throw'
            return { error: true, status: response.status };
        }

        return await response.json();
    } catch (error) {
        console.error("Erro crítico no fetch:", error);
        // Retornamos um objeto com error: true em vez de dar 'throw'
        return { error: true, message: error };
    }
}

// CREATE — POST
export async function createInStrapi(endpoint: string, data: any, token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "");
    const cleanEndpoint = endpoint.replace(/^\//, "");
    const url = `${baseUrl}/api/${cleanEndpoint}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erro ao criar:", errorData);
        return { error: true, status: response.status, details: errorData };
    }

    return await response.json();
}

// UPDATE — PUT
export async function updateInStrapi(endpoint: string, documentId: string, data: any, token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "");
    const cleanEndpoint = endpoint.replace(/^\//, "");
    const url = `${baseUrl}/api/${cleanEndpoint}/${documentId}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erro ao atualizar:", errorData);
        return { error: true, status: response.status, details: errorData };
    }

    return await response.json();
}

// DELETE
export async function deleteFromStrapi(endpoint: string, documentId: string, token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "");
    const cleanEndpoint = endpoint.replace(/^\//, "");
    const url = `${baseUrl}/api/${cleanEndpoint}/${documentId}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erro ao apagar:", errorData);
        return { error: true, status: response.status, details: errorData };
    }

    return await response.json();
}