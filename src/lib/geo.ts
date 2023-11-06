export const getBoundingBox = (lat: number, lng: number, degrees = 0.001): string => {
	const left = lng - degrees;
	const bottom = lat - degrees;
	const right = lng + degrees;
	const top = lat + degrees;

	return `${left},${bottom},${right},${top}`;
};
