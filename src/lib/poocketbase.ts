import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const createPocketBaseInstance = () => {
	return new PocketBase(PUBLIC_POCKETBASE_URL);
};

export const pb = createPocketBaseInstance();
