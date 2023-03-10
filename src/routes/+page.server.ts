import { baseUrl } from '$lib/utils/vars';
import type { Actions, PageServerLoad } from './/$types';
import {error, fail, redirect} from '@sveltejs/kit';
import { errorCatcher, successCatcher } from '$lib/utils/functions';

export const actions = {

    default: async ({ request, cookies}) => {

        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await fetch(
            `${baseUrl}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "email": email?.toString().toLowerCase(),
                        "password": password
                    }
                ),
            }
        );
        
        const data = await response.json();

        if (response.ok) {

            cookies.set('token', data.access_token, {
                // expires in 1 hour
                maxAge: 60 * 60,
                httpOnly: true,
                path: '/',
            });

            cookies.set('user_id', data.data.id, {
                path: '/',
            })

            return { success: true, message: data.message.value };
            // redirect to merchant page
            // throw redirect(301, '/u');
        } else {
            return { fail: true, message: data.message.value };
        }

    },

} as Actions
