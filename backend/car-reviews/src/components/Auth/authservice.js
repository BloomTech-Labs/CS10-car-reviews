import decode from 'jwt-decode';

export default class AuthService {
  constructor() {
    this.getProfile = this.getProfile.bind(this);
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // if token exists and is not expired, return true.
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('jwt');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('jwt');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }
}
