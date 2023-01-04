import type { Invoice } from "$lib/types/invoice";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { errorCatcher } from "$lib/utils/functions";
import { baseUrl } from "$lib/utils/vars";
import type { ContactChannel } from "$lib/types/contact_channel";

export const load: PageServerLoad = async ({ cookies, params }) => {

    const merchantId = params.merchant_id;
    const token = cookies.get('token');
    
    const response = await fetch(
        `${baseUrl}/merchant/${merchantId}/invoice`,
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
                invoices: data.data as Invoice[]
            },
            merchant_id: params.merchant_id
        }

    }

    if (response.status === 401) {
        throw redirect(303, '/');
    }

    return {
        props: {
            invoices: []
        },
        merchant_id: params.merchant_id
    }
}
