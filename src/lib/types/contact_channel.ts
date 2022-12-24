// {
//     "created_at": "2022-12-24T15:53:33.323082",
//     "deleted_at": null,
//     "id": "8cc53aa9-1a0f-4285-badb-6948a2077095",
//     "name": "email",
//     "updated_at": "2022-12-24T15:53:33.323082"
// },

export interface ContactChannel {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}