export interface UserType {
	name?: string;
	surname?: string;
	email?: string;
	password?: string;
	role?: string;
	avatar?: string;
	refreshToken?: string
	_id?: string
}

export interface AccomodationType{
    name?:string;
    city?: string;
    description?: string
    maxGuests?: number;
    user?: UserType
}
