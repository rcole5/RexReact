export function checkToken(token) {
	return token !== null;
}

export function getAge(dob) {
    var now = new Date();
    var diff = now - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}