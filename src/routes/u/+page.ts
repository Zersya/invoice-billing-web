import type { JobSchedule } from '$lib/types/job_schedule';
import { baseUrl } from '$lib/utils/vars';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ fetch, data }) => {
    const token = data.token

    const response = await  fetch(
        `${baseUrl}/scheduled-job`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    ); 


    const item = await response.json();

    return {
        schedules: item.data as JobSchedule[],
    }
});