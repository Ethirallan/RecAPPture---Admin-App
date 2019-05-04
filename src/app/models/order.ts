export interface Order {
    id: number;
    address: string;
    lat: number;
    lng: number;
    kub: number;
    status: string;
    wood_type: number;
    order_time: any;
    changed_by: any;
    last_change: any;
    user: User;
    images: OrderImage[];
}

export interface User {
    id: number;
    email: string;
    phone_number: string;
}

export interface OrderImage {
    id: number;
    link: string;
    order_id: number;
}