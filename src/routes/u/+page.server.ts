import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    signout: async ({ cookies }) => {
        cookies.delete('token', {
            path: '/',
        });
        cookies.delete('user_id', {
            path: '/',
        });
        throw redirect(303, '/login');
    }
}
