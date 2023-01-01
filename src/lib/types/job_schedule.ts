export interface JobSchedule {
    created_at:      Date;
    deleted_at:      Date;
    dependencies:    string;
    id:              number;
    job_data:        JobData;
    job_type:        string;
    repeat_count:    number;
    total_repeat_count: number;
    repeat_interval: number;
    retry_count:     number;
    retry_interval:  number;
    run_at:          Date;
    status:          string;
    updated_at:      Date;
}

export interface JobData {
    customer_name: string;
    title:         string;
    description:   string;
    amount:        number;
    created_by:    string;
    customer_id:   string;
    invoice_date:  Date;
    invoice_id:    string;
    merchant_id:   string;
    tax_amount:    number;
    tax_rate:      number;
    total_amount:  number;
}
