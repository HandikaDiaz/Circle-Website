import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { RefObject, useEffect } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { ErrorMessage } from '../../../auth/schemas/error';
import { useEditPost } from '../../hooks/use-post';
import { usePostDetail } from '../../hooks/use-status';
import { CreatePostFormInput } from '../../schemas/post.schema';

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRef: RefObject<HTMLInputElement>;
    finalRef: RefObject<HTMLButtonElement>;
    selectedPostId: number | null;
}

function EditModal({ isOpen, onClose, initialRef, finalRef, selectedPostId }: InitialFocusModalProps) {
    const { postDetail } = usePostDetail(selectedPostId);
    const { register, handleSubmit, reset, onSubmit } = useEditPost(selectedPostId);

    useEffect(() => {
        if (postDetail) {
            reset({ content: postDetail.content, image: undefined });
        }
    }, [postDetail, reset]);

    const handleFormSubmit = async (data: CreatePostFormInput) => {
        await onSubmit(data);
        onClose();
    };

    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                finalFocusRef={finalRef}
                initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent bgColor={'home.background'} color={'home.text'}>
                    <ModalHeader>Edit Your Post</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(handleFormSubmit)}>

                        <ModalBody display={'flex'} gap={'20px'} alignItems={'center'}>
                            <Input type='text' flex={6} defaultValue={postDetail?.content} {...register('content')} />
                            <FormControl flex={1}>
                                <FormLabel
                                    cursor={'pointer'}
                                    display={'flex'}
                                    color={'home.button.hoverText'}
                                    fontSize={'25px'}><LuImagePlus /></FormLabel>
                                <Input type='file' {...register('image')} hidden name="image" />
                                <ErrorMessage message={''} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button bgColor={'white'} color={'black'} mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                type='submit'
                                color={'home.text'}
                                bgColor={'home.button.background'}
                                _hover={{ bgColor: 'transparent', color: 'home.button.background' }}>
                                Save
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModal