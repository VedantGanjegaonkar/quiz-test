import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Observable } from 'rxjs';
import { UserDocument } from '../../../../../../quiz/model/user.model';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})

export class UserService {
 

  constructor(private http: HttpClient) {}

  register(user:UserDocument):Observable<UserDocument>{
    return this.http.post<UserDocument>(`/user/signup`,user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`user/login`, credentials);
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // For example, check if a token exists in local storage
    return !!localStorage.getItem('token');
  }

  isAdmin():boolean{
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    const decodedToken = jwtDecode<any>(token);
    return decodedToken.role === 'admin';
  }

  getUserIdFromToken(): string  {
    const token = localStorage.getItem('token');
    if (!token) {
      return "null";
    }

    try {
      const decodedToken = jwtDecode<any>(token);

      // Check if the token is expired
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token is expired
        localStorage.removeItem('jwt_token');
        return "null";
      }

      return decodedToken.userId;
    } catch (error) {
      console.error('Error decoding token', error);
      return "null";
    }
  }
  getToken(){
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }


}


