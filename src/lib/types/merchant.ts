// {
//     "created_at": "2022-12-24T02:32:55.858018",
//     "deleted_at": null,
//     "description": "Description",
//     "id": "dd062a1f-19bf-4b33-aa59-9db90fa78d10",
//     "name": "Merchant",
//     "updated_at": "2022-12-24T02:32:55.858018",
//     "user_id": "f33939ba-296a-49a7-9b26-15e6cf11ab66"
// },

export interface Merchant {
    created_at: string
    deleted_at: null | string
    description: string
    id: string
    name: string
    updated_at: string
    user_id: string
    address: string
    phone_country_code: string
    phone_number: string
    tax: number
    merchant_code: string
}