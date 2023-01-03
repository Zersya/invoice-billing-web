import type { Customer } from "$lib/types/customer";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { dateTimeFormatRequest, errorCatcher, localToUTC, successCatcher } from "$lib/utils/functions";
import { baseUrl } from "$lib/utils/vars";
import type { ContactChannel } from "$lib/types/contact_channel";
import type { InvoiceWithCustomer } from "$lib/types/invoice";

export const load: PageServerLoad = async ({ cookies, params }) => {

    const merchantId = params.merchant_id;
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
            merchant_id: params.merchant_id
        }

    }

    if (response[0].status === 401 || response[1].status === 401 || response[2].status === 401) {
        throw redirect(300, '/');
    }

    return {
        props: {
            customers: [],
            contact_channels: [],
            invoices: []
        },
        merchant_id: params.merchant_id
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
            return { success: true };
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
            return { success: true };
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
            return { success: true };
        }

        return await errorCatcher(response);
    },

    createInvoice: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const merchant_id = formData.get('merchant_id');
        const customer_id = formData.get('customer_id');
        const title = formData.get('title');
        const description = formData.get('description');
        const amount = +(formData.get('amount') || '0');
        const invoice_date = formData.get('date');

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const newInvoiceDateUTC = localToUTC(`${invoice_date} ${hours}:${minutes}:00`)
        const date = dateTimeFormatRequest(newInvoiceDateUTC);

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
                    "title": title,
                    "description": description,
                    "amount": amount,
                    "invoice_date": date,
                })
            }
        );

        if (response.ok) {
            return { success: true };
        }
    
        return await errorCatcher(response);
    },

    setScheduleInvoice: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const merchant_id = formData.get('merchant_id');
        const invoice_id = formData.get('invoice_id');
        const start_schedule_date = formData.get('start_schedule_date');
        const end_schedule_date = formData.get('end_schedule_date');
        const repeat_interval_type = formData.get('repeat_interval_type');
        const is_recurring = formData.get('is_recurring');

        const isRecurring = is_recurring === 'true';

        const now = new Date();
        const newDate = new Date(now.getTime() + (1000 * 60))
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();

        let startScheduleDate = null
        let endScheduleDate = null

        if (start_schedule_date) {
            const startScheduleUTC = localToUTC(`${start_schedule_date} ${hours}:${minutes}:00`)
            startScheduleDate = dateTimeFormatRequest(startScheduleUTC);
        }

        if (end_schedule_date) {
            const endScheduleUTC = localToUTC(`${end_schedule_date} ${hours}:${minutes}:00`)
            endScheduleDate = dateTimeFormatRequest(endScheduleUTC);
    
        }

        const body = JSON.stringify({
            "start_at": startScheduleDate,
            "end_at": endScheduleDate,
            "repeat_interval_type": repeat_interval_type || null,
            "is_recurring": isRecurring ,
        })

        const response = await fetch(
            `${baseUrl}/merchant/${merchant_id}/invoice/${invoice_id}/set-schedule`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: body,
            }
        );

        if (response.ok) {
            return { success: true };
        }
    
        return await errorCatcher(response);
    },

    stopScheduleInvoice: async ({ request, cookies }) => {
        const formData = await request.formData();

        const token = cookies.get('token');

        const merchant_id = formData.get('merchant_id');
        const invoice_id = formData.get('invoice_id');

        const body = JSON.stringify({
            "status": "completed",
        })

        const response = await fetch(
            `${baseUrl}/merchant/${merchant_id}/invoice/${invoice_id}/update-status-schedule`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: body,
            }
        );

        if (response.ok) {
            return await successCatcher(response);
        }
    
        return await errorCatcher(response);
    }
}