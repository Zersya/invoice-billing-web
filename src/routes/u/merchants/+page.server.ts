import type { Merchant } from '$lib/types/merchant';
import { errorCatcher, successCatcher } from '$lib/utils/functions';
import { baseUrl } from '$lib/utils/vars';
import type { Actions, PageServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";


export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('token');
    
    const response = await fetch(
        `${baseUrl}/merchant`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );

    const data = await response.json();

    if (response.ok) {

        return {
            props: {
                merchants: data.data as Merchant[]
            }
        }

    }

    if (response.status === 401) {
        throw redirect(301, '/');
    }

    return {
        props: {
            merchants: []
        }
    }
}

export const actions: Actions = {
    createMerchant: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');
        const name = formData.get('name');
        const description = formData.get('description');

        const response = await fetch(
            `${baseUrl}/merchant`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    {
                        "name": name,
                        "description": description
                    }
                ),
            }
        );

    
        if (response.ok) {
            return await successCatcher(response);
        }
    
        return await errorCatcher(response);
    },

    updateMerchant: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const id = formData.get('id');
        const name = formData.get('name');
        const description = formData.get('description');

        const response = await fetch(
            `${baseUrl}/merchant/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    {
                        "name": name,
                        "description": description
                    }
                ),
            }
        );

        if (response.ok) {
            return await successCatcher(response);
        }

        return await errorCatcher(response);
    },

    deleteMerchant: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');
        const id = formData.get('id');

        const response = await fetch(
            `${baseUrl}/merchant/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            return await successCatcher(response);
        }

        return await errorCatcher(response);
    }
}



