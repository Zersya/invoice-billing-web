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
