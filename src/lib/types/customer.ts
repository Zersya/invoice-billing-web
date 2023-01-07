// {
//     "created_at": "2022-12-24T07:31:57.023363",
//     "deleted_at": null,
//     "id": "05799361-f151-4188-bca5-be7ef35d7535",
//     "merchant_id": "9a9e3d56-4056-461c-941d-8c083df149ff",
//     "name": "Zein Kantor",
//     "updated_at": "2022-12-24T07:31:57.023363"
// }

export interface Customer {
    id: string;
    merchant_id: string;
    name: string;
    contact_channel_id: string;
    contact_channel_name: string;
    contact_channel_value: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    tags: string[] | null;
}