import { Box } from "@chakra-ui/react";
import { DetailReply } from "./detail-reply";
import { DetailItem } from "./detail-item";
import { DetailPost } from "./detail-post";

interface DetailRightNavbarProps {
    selectedPostId: number | null;
}

export function DetailRightNavbar({ selectedPostId }: DetailRightNavbarProps) {
    return (
        <Box>
            <DetailPost  selectedPostId={selectedPostId}/>
            <DetailReply selectedPostId={selectedPostId}/>
            <DetailItem selectedPostId={selectedPostId} />
        </Box>
    )
}