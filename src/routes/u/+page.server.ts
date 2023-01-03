import { baseUrl } from "$lib/utils/vars";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { JobSchedule } from "$lib/types/job_schedule";


export const load: PageServerLoad = async ({ cookies, params }) => {

    const token = cookies.get('token');
    
    const response = await  fetch(
        `${baseUrl}/scheduled-job`,
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
        }

    }

    if (response.status === 401) {
        throw redirect(300, '/');
    }

    return {
        props: {
            schedules: [],
        },
    }
}

export const actions: Actions = {
    signout: async ({ cookies }) => {
        cookies.delete('token', {
            path: '/',
        });
        cookies.delete('user_id', {
            path: '/',
        });
        throw redirect(303, '/');
    }
}
