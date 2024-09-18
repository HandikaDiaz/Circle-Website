export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    fullName: string;
    email: string;
    password: string;
}

export interface ForgotEmailForm {
    email: string;
}

export interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}