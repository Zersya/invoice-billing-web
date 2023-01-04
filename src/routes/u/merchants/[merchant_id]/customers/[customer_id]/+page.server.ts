import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { baseUrl } from "$lib/utils/vars";
import type { JobSchedule } from "$lib/types/job_schedule";

export const load: PageServerLoad = async ({ cookies, params }) => {

    const merchantId = params.merchant_id;
    const customerId = params.customer_id;

    const token = cookies.get('token');
    
    const response = await  fetch(
        `${baseUrl}/merchant/${merchantId}/customer/${customerId}/scheduled-job`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    ); 

    if (response.ok) {
        const schedules = await response.json();


        return {
            props: {
                schedules: schedules.data as JobSchedule[],
            },
            merchant_id: params.merchant_id,
            customer_id: params.customer_id
        }

    }

    if (response.status === 401) {
        throw redirect(303, '/');
    }

    return {
        props: {
            schedules: [],
        },
        merchant_id: params.merchant_id,
        customer_id: params.customer_id
    }
}
