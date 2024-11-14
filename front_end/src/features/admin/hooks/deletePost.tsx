import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { apiV1 } from "../../../libs/api";

interface DeletePostButtonProps {
    postId: number;
    onSuccess?: () => void;
}

export function DeletePostButton({ postId, onSuccess }: DeletePostButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;
        setIsLoading(true);
        setError(null);

        try {
            await apiV1.delete(`/post/${postId}`, {
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
            <Button
                color={'white'}
                colorScheme="red"
                onClick={handleDelete}
                position={'sticky'}>
                {isLoading ? "Deleting..." : "Delete"}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}