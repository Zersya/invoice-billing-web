import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ cookies }) => {

    const token = cookies.get('token');

    return {
        token: token,
        schedules: [],
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
        throw redirect(301, '/');
    }
}
