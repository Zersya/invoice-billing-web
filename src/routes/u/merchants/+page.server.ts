import type { Merchant } from '$lib/types/merchant';
import type { PhoneCountryCode } from '$lib/types/phone_country_code';
import PhoneCountryCodes from '$lib/jsons/phone_country_codes.json';
import { errorCatcher, successCatcher } from '$lib/utils/functions';
import { baseUrl } from '$lib/utils/vars';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');

	const response = await 
		fetch(`${baseUrl}/merchant`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	;

	if (response.ok) {
		const data = await response.json();
		const phone_country_codes_data = PhoneCountryCodes

		return {
			props: {
				merchants: data.data as Merchant[],
				phone_country_codes: phone_country_codes_data as PhoneCountryCode[]
			}
		};
	}

	if (response.status === 401) {
		throw redirect(301, '/');
	}

	return {
		props: {
			merchants: [],
            phone_country_codes: []
		}
	};
};

export const actions: Actions = {
	createMerchant: async ({ request, cookies }) => {
		const formData = await request.formData();

		const token = cookies.get('token');
		const name = formData.get('name');
		const description = formData.get('description');
        const address = formData.get('address');
        const phone_country_code = formData.get('phone_country_code');
        const phone_number = formData.get('phone_number');
		const tax = Number(formData.get('tax')) / 100;
		

		const response = await fetch(`${baseUrl}/merchant`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
                address: address || null,
                phone_country_code: phone_country_code || null,
                phone_number: phone_number || null,
				tax: tax || null
			})
		});

		if (response.ok) {
			return await successCatcher(response);
		}

		return await errorCatcher(response);
	},

	updateMerchant: async ({ request, cookies }) => {
		const formData = await request.formData();

		const token = cookies.get('token');

		const id = formData.get('id');
		const name = formData.get('name');
		const description = formData.get('description');
        const address = formData.get('address');
        const phone_country_code = formData.get('phone_country_code');
        const phone_number = formData.get('phone_number');
		const tax = Number(formData.get('tax')) / 100;

		const response = await fetch(`${baseUrl}/merchant/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
                address: address || null,
                phone_country_code: phone_country_code || null,
                phone_number: phone_number || null,
				tax: tax || null
			})
		});

		if (response.ok) {
			return await successCatcher(response);
		}

		return await errorCatcher(response);
	},

	deleteMerchant: async ({ request, cookies }) => {
		const formData = await request.formData();

		const token = cookies.get('token');
		const id = formData.get('id');

		const response = await fetch(`${baseUrl}/merchant/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});

		if (response.ok) {
			return await successCatcher(response);
		}

		return await errorCatcher(response);
	}
};
