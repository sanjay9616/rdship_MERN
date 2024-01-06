export class ApiService {

    private getToken(): string | null {
        return localStorage.getItem('token');
    }

    async get(url: string, params?: any) {
        const headers = this.getHeaders();
        const requestUrl = this.buildUrlWithParams(url, params);
        const response = await fetch(requestUrl, { headers });
        const data = await response.json();
        return this.handleResponse(data);
    }

    async post(url: string, body: any) {
        const headers = this.getHeaders();
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        });
        const data = await response.json();
        return this.handleResponse(data);
    }

    async put(url: string, body: any): Promise<any> {
        const headers = this.getHeaders();
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers,
        });
        const data = await response.json();
        return this.handleResponse(data);
    }

    async patch(url: string, body: any): Promise<any> {
        const headers = this.getHeaders();
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers,
        });
        const data = await response.json();
        return this.handleResponse(data);
    }

    async delete(url: string, params?: any) {
        const headers = this.getHeaders();
        const requestUrl = this.buildUrlWithParams(url, params);
        const response = await fetch(requestUrl, {
            method: 'DELETE',
            headers
        });
        const data = await response.json();
        return this.handleResponse(data);
    }

    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    private buildUrlWithParams(url: string, params?: Record<string, string>): string {
        if (!params) {
            return url;
        }

        const urlObject = new URL(url);
        Object.entries(params).forEach(([key, value]) => {
            urlObject.searchParams.append(key, value);
        });

        return urlObject.toString();
    }

    private handleResponse = async (response: any) => {
        // if (response.statusCode === 401) {
        //     this.handleUnauthorizedResponse();
        // }

        return response;
    };

}