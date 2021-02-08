class AuthenticationService {
	private accessToken: string = '';
	
	public isAuthenticated() {
		return this.accessToken !== null;
	}	
}

const authService = new AuthenticationService();
export default authService;