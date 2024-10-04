import Cookies from 'js-cookie';
import { useState } from 'react';
import { apiV1 } from "../../../libs/api";
import { ButtonLink } from '../../base/button/link';

interface DeleteuserButtonProps {
    userId: number;
    onSuccess?: () => void;
}

export function DeleteuserButton({ userId, onSuccess }: DeleteuserButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        setIsLoading(true);
        setError(null);

        try {
            await apiV1.delete(`/userDelete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            setError(err.message || "An error occurred while deleting the post.");
        }
        setIsLoading(false);

    };

    return (
        <>
            <ButtonLink
                colorScheme="red"
                onClick={handleDelete} to={''}
                position={'sticky'}>
                {isLoading ? "Deleting..." : "Delete"}
            </ButtonLink>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}