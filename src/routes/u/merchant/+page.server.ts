import type { Actions, PageServerLoad } from './$types';
import {fail, redirect} from "@sveltejs/kit";


export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('token');
    
    const response = await fetch(
        'https://inving-api.maresto.id/merchant',
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
                merchants: data.data
            }
        }

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
            'https://inving-api.maresto.id/merchant',
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

        const data = await response.json();
    
        if (response.ok) {
    
            throw redirect(303, '/u/merchant');
    
        }
    
        return fail(response.status, { fail: true, message: data.message.value });
    },

    updateMerchant: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const id = formData.get('id');
        const name = formData.get('name');
        const description = formData.get('description');

        const response = await fetch(
            'https://inving-api.maresto.id/merchant/' + id,
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

        const data = await response.json();

        if (response.ok) {

            throw redirect(303, '/u/merchant');

        }

        return fail(response.status, { fail: true, message: data.message.value });
    },

    deleteMerchant: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');
        const id = formData.get('id');

        const response = await fetch(
            'https://inving-api.maresto.id/merchant/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (response.ok) {
                
                throw redirect(303, '/u/merchant');
    
            }

        return fail(response.status, { fail: true, message: data.message.value });
    }
}



