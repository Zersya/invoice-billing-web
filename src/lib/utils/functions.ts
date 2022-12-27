import { redirect, fail } from '@sveltejs/kit';

export function formatDate(date: string) {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} / ${mo} / ${ye}`;
}

export async function errorCatcher(response: Response) {
    const data = await response.json();

    if (response.status === 401) {
        return redirect(300, '/login');
    }

    return fail(response.status, { fail: true, message: data.message.value });

}

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'IDR',
    }).format(amount);
}

export function localToUTC(strDateTime: string) {
    const dateTimeMillis = Date.parse(strDateTime);
    const UTCTimestamp = new Date(dateTimeMillis).getTime()
    const newDateUTC = new Date(UTCTimestamp)

    return newDateUTC;
}

export function dateTimeFormatRequest(date: Date) {
    const day = ('0' + date.getUTCDate()).slice(-2);
	const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

	const dt = `${date.getUTCFullYear()}-${month}-${day} ${hours}:${minutes}:00`;

    return dt;
}