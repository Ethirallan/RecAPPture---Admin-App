export interface Order {
    id: number;
    user_id: number;
    address: string;
    lat: number;
    lng: number;
    kub: number;
    status: string;
    wood_type: number;
    order_time: any;
    changed_by: any;
    last_change: any;
}