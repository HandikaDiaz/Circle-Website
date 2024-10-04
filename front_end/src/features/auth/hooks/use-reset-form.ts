import { useState } from "react"
import { ResetPasswordForm } from "../types/dto"

export function userResetForm() {
    const [form, setForm] = useState<ResetPasswordForm>({
        password: "",
        confirmPassword: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(form);
    };

    return { form, handleChange, handleSubmit };
}