import type { LayoutServerLoad } from './$types';
import {redirect, type Actions} from "@sveltejs/kit";


export const load: LayoutServerLoad = async ({ cookies }) => {

    const token = cookies.get('token');
    return {
        props: {},
        token: token
    }
}
