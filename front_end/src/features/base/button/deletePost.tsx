import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { apiV1 } from "../../../libs/api";
import { useQueryClient } from '@tanstack/react-query';

interface DeletePostButtonProps {
    postId: number | null;
    onSuccess?: () => void;
}

export function DeletePostButton({ postId, onSuccess }: DeletePostButtonProps) {
    const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        setIsLoading(false);

    };

    return (
        <>
            <Button
                color={'white'}
                bgColor={'red'}
                _hover={{ bgColor: 'transparent', color: 'red' }}
                onClick={handleDelete}
                position={'sticky'}>
                {isLoading ? "Deleting..." : "Delete"}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}