import { baseUrl } from '$lib/utils/vars';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {

    default: async ({ request, cookies}) => {

        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await fetch(
            `${baseUrl}/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "name": name,
                        "email": email,
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

            // redirect to merchant page
            throw redirect(303, '/u/merchants');
        } else {
            return { fail: true, message: data.message.value };
        }

    },

} as Actions
