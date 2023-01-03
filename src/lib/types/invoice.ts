// {
//     "amount": 290000,
//     "created_at": "2022-12-24T16:04:40.571291",
//     "created_by": "749c7900-08e5-4601-a587-95677b82aa13",
//     "customer_id": "4e8144c0-df3a-4e47-8f4a-2240b7d2f678",
//     "deleted_at": null,
//     "id": "091f09b5-0af4-466f-80e2-2e8443c93a1d",
//     "invoice_date": "2022-12-16T14:32:00",
//     "invoice_number": "INVC-1671897878-749c7900-08e5-4601-a587-95677b82aa13",
//     "merchant_id": "0100f8ce-ebf2-4a9b-b8db-421733913903",
//     "tax_amount": 31900,
//     "tax_rate": 11,
//     "total_amount": 321900,
//     "updated_at": "2022-12-24T16:04:40.571291",
// },

export interface InvoiceWithCustomer {
    id: string;
    title: string;
    description: string | null;
    invoice_number: string;
    customer_id: string;
    customer_name: string;
    total_amount: number;
    invoice_date: string;
    created_at: string;
    is_scheduled: boolean;
}


export interface Invoice {
    amount: number;
    created_at: string;
    created_by: string;
    customer_id: string;
    deleted_at: string;
    id: string;
    invoice_date: string;
    invoice_number: string;
    merchant_id: string;
    tax_amount: number;
    tax_rate: number;
    total_amount: number;
    updated_at: string;
    xendit_invoice_payload: XenditInvoicePayload;
}

export interface XenditInvoicePayload {
    amount: number;
    available_banks: AvailableBank[];
    available_direct_debits: AvailableDirectDebit[];
    available_ewallets: AvailableEwallet[];
    available_paylaters: AvailablePaylater[];
    available_qr_codes: AvailableQrCode[];
    available_retail_outlets: AvailableRetailOutlet[];
    created: string;
    currency: string;
    description: string;
    expiry_date: string;
    external_id: string;
    id: string;
    invoice_url: string;
    merchant_name: string;
    merchant_profile_picture_url: string;
    should_exclude_credit_card: boolean;
    should_send_email: boolean;
    status: string;
    updated: string;
    user_id: string;
}

export interface AvailableBank {
    account_holder_name: string;
    bank_branch: string;
    bank_code: string;
    collection_type: string;
    identity_amount: number;
    transfer_amount: number;
}

export interface AvailableDirectDebit {
    direct_debit_type: string;
}

export interface AvailableEwallet {
    ewallet_type: string;
}

export interface AvailablePaylater {
    paylater_type: string;
}

export interface AvailableQrCode {
    qr_code_type: string;
}

export interface AvailableRetailOutlet {
    retail_outlet_name: string;
}