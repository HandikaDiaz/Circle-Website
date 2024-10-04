import { useState } from "react"
import { ForgotEmailForm } from "../types/dto"

export function useForgotForm() {
    const [form, setForm] = useState<ForgotEmailForm>({
        email: '',
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