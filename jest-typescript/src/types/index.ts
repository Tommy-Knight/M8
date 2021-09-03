export interface User {
	name?: string;
	surname?: string;
	email?: string;
	password?: string;
	role?: string;
	avatar?: string;
}

export interface AccomodationType{
    name?:string;
    city?: string;
    description?: string
    maxGuests?: number;
    user?: User
}