import { baseUrl } from '$lib/utils/vars';
import type { Actions } from './$types';

export const actions = {

    default: async ({ request }) => {

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
                        "email": email?.toString().toLowerCase(),
                        "password": password
                    }
                ),
            }
        );
        
        const data = await response.json();

        if (response.ok) {
            return { success: true, message: data.message.value };
        } else {
            return { fail: true, message: data.message.value };
        }

    },

} as Actions
