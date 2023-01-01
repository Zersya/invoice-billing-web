import type { LayoutServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ route, cookies }) => {

    if (cookies.get('token') && (route.id === '/' || route.id === '/register')) {
        throw redirect(303, '/u');
    }

    const user_id = cookies.get('user_id');

    return {
        props: {
            user_id: user_id,
        }
    };
}
