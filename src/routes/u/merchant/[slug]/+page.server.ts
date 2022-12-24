import type { Customer } from "$lib/types/customer";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { errorCatcher } from "$lib/utils/functions";

export const load: PageServerLoad = async ({ cookies, params }) => {

    const merchantId = params.slug;
    const token = cookies.get('token');
    
    const response = await fetch(
        `https://inving-api.maresto.id/merchant/${merchantId}/customer`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );

    const data = await response.json();

    if (response.ok) {

        console.log(data.data[0])

        return {
            props: {
                customers: data.data as Customer[]
            },
            slug: params.slug
        }

    }

    if (response.status === 401) {
        throw redirect(300, '/login');
    }

    return {
        props: {
            customers: []
        },
        slug: params.slug
    }
}


export const actions: Actions = {
    createCustomer: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const merchant_id = formData.get('merchant_id');
        const name = formData.get('name');
        const contact_channel_id = formData.get('contact_channel_id');
        const contact_channel_value = formData.get('contact_channel_value');

        const response = await fetch(
            `https://inving-api.maresto.id/merchant/${merchant_id}/customer`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    {
                        "name": name,
                        "contact_channel_id": contact_channel_id,
                        "contact_channel_value": contact_channel_value
                    }
                ),
            }
        );

        if (response.ok) {
            throw redirect(303, `/u/merchant/${merchant_id}`);
        }

        if (response.status === 401) {
            throw redirect(300, '/login');
        }
    
    
        return await errorCatcher(response);
    },

    updateCustomer: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const merchant_id = formData.get('merchant_id');
        const id = formData.get('id');
        const name = formData.get('name');

        const response = await fetch(
            `https://inving-api.maresto.id/merchant/${merchant_id}/customer/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    {
                        "name": name,
                    }
                ),
            }
        );


        if (response.ok) {

            throw redirect(303, `/u/merchant/${merchant_id}`);

        }

        return await errorCatcher(response);
    },

    deleteCustomer: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');
        
        const merchant_id = formData.get('merchant_id');
        const id = formData.get('id');

        const response = await fetch(
            `https://inving-api.maresto.id/merchant/${merchant_id}/customer/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );


        if (response.ok) {
                
                throw redirect(303, `/u/merchant/${merchant_id}`);
    
            }

            return await errorCatcher(response);
    }

}