import type { Customer } from "$lib/types/customer";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { errorCatcher } from "$lib/utils/functions";
import { baseUrl } from "$lib/utils/vars";
import type { ContactChannel } from "$lib/types/contact_channel";
import type { InvoiceWithCustomer } from "$lib/types/invoice";

export const load: PageServerLoad = async ({ cookies, params }) => {

    const merchantId = params.slug;
    const token = cookies.get('token');
    
    const response = await Promise.all([
        fetch(
            `${baseUrl}/merchant/${merchantId}/customer`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        ),
        fetch(
            `${baseUrl}/contact-channels`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        ),
        fetch(
            `${baseUrl}/merchant/${merchantId}/invoice`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    ])


    if (response[0].ok && response[1].ok && response[2].ok) {
        const data_customers = await response[0].json();
        const data_contact_channels = await response[1].json();
        const data_invoice = await response[2].json();


        return {
            props: {
                customers: data_customers.data as Customer[],
                contact_channels: (data_contact_channels.data as ContactChannel[]).filter((channel) => channel.name === 'whatsapp'),
                invoices: data_invoice.data as InvoiceWithCustomer[]
            },
            slug: params.slug
        }

    }

    if (response[0].status === 401 || response[1].status === 401 || response[2].status === 401) {
        throw redirect(300, '/login');
    }

    return {
        props: {
            customers: [],
            contact_channels: [],
            invoices: []
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
            `${baseUrl}/merchant/${merchant_id}/customer`,
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
            `${baseUrl}/merchant/${merchant_id}/customer/${id}`,
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
            `${baseUrl}/merchant/${merchant_id}/customer/${id}`,
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
    },

    createInvoice: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const merchant_id = formData.get('merchant_id');
        const customer_id = formData.get('customer_id');
        const amount = +(formData.get('amount') || '0');
        const invoice_date = formData.get('date');

        console.log(merchant_id, customer_id, amount, invoice_date)

        const response = await fetch(
            `${baseUrl}/merchant/${merchant_id}/invoice`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "customer_id": customer_id,
                    "amount": amount,
                    "invoice_date": `${invoice_date} 00:00:00`
                })
            }
        );

        if (response.ok) {
            throw redirect(303, `/u/merchant/${merchant_id}`);
        }

        if (response.status === 401) {
            throw redirect(300, '/login');
        }
    
    
        return await errorCatcher(response);
    }

}