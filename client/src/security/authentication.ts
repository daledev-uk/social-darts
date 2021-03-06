import { AuthenticatedUserViewModel } from "@/models/authenticatedUserViewModel";

class Authentication {

	public getJwtToken() {
		const user = this.getUser();

		if (user && user.token) {
			return user.token;
		} else {
			return null;
		}
	}

	public isAuthenticated(): boolean {
		return !!this.getJwtToken();
	}

	public getUserId(): string {
		const user = this.getUser();

		if (user && user.user) {
			return user.user.id;
		} else {
			return '';
		}
	}

	public getUser(): AuthenticatedUserViewModel {
		const userJson = localStorage.getItem('user');
		return userJson ? JSON.parse(userJson) : userJson;
	}

	public setUser(authenticatedUser: AuthenticatedUserViewModel) {
		localStorage.setItem('user', JSON.stringify(authenticatedUser));
	}

	public clearUser() {
		localStorage.removeItem('user');
	}
}

export const authentication = new Authentication();
