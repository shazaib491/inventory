import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';

interface AuthData {
    user_name?: string;
    user_email: string;
    user_password: string;
    user_type?: string;
    user_status?: string;
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}
    public token?: any;
    // tslint:disable-next-line: variable-name
    public user_type: any;
    private authStatusListner = new Subject<boolean>();
    private roleStatusListner = new ReplaySubject<string>();
    public isAuthenticated = false;
    isTimer: any;
    private userId?: any;
    private BACKEND_URL = 'auth/';

    getToken() {
        return this.token;
    }
    getIsAuth() {
        return this.isAuthenticated;
    }
    getUserId() {
        return this.userId;
    }
    getAuthStatusListener() {
        return this.authStatusListner.asObservable();
    }
    getRoleStatusListener() {
        return this.roleStatusListner.asObservable();
    }

    createUser(userDetail: AuthData) {
        const authData: AuthData = {
            user_name: userDetail.user_name,
            user_email: userDetail.user_email,
            user_password: userDetail.user_password,
            user_type: userDetail.user_type,
            user_status: userDetail.user_status,
        };
        this.http.post(environment.authUrl + this.BACKEND_URL + 'singup', authData).subscribe(
            response => {
                this.router.navigate(['/auth/store']);
            },
            error => {
                this.authStatusListner.next(false);
            }
        );
    }

    login(userDetail: AuthData) {
        const authData: AuthData = {
            user_email: userDetail.user_email,
            user_password: userDetail.user_password,
            user_type: userDetail.user_type,
        };
        this.http
            .post<{ token: string; expiresIn: number; userid: string }>(
                environment.authUrl + this.BACKEND_URL + 'login',
                authData
            )
            .subscribe(
                (response: any) => {
                    this.token = response.token;
                    if (this.token) {
                        this.isAuthenticated = true;
                        this.userId = response.userid;
                        this.user_type = response.user_type;
                        this.roleStatusListner.next(this.user_type);
                        this.authStatusListner.next(true);
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
                        this.setAuthTimer(response.expiresIn);
                        this.saveAuthData(this.token, expirationDate, this.userId, this.user_type);
                        console.log(this.isAuthenticated);
                        this.router.navigate(['/dashboard']);
                    }
                },
                error => {
                    this.authStatusListner.next(false);
                }
            );
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        // tslint:disable-next-line: no-non-null-assertion
        const expiresIn = authInformation!.expiresDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation?.token;
            this.isAuthenticated = true;
            this.user_type = authInformation.user_type;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListner.next(true);
            this.roleStatusListner.next(this.user_type);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListner.next(false);
        this.router.navigate(['/auth/login']);
        this.userId = null;
        this.clearAuthData();
        clearTimeout(this.isTimer);
    }

    setAuthTimer(duration: number) {
        this.isTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string, user_type: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
        localStorage.setItem('user_type', user_type);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('user_type');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expiresDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        // tslint:disable-next-line: variable-name
        const user_type = localStorage.getItem('user_type');
        if (!token && !expiresDate) {
            return;
        }
        return {
            token,
            expiresDate: new Date(expiresDate || ''),
            userId,
            user_type,
        };
    }
}
