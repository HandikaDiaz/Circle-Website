import { Text } from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ButtonLink } from "../button/link";
import { StatusItem } from "../component/page-status/status-item";
import { StatusPost } from "../component/page-status/status-post";
import { StatusReply } from "../component/page-status/status-reply";

export function StatusLayout() {
    const navigate = useNavigate();
    
    return (
        <>
            <ButtonLink onClick={() => navigate(-1)} to={""}>
                <Text
                    as={'h2'}
                    px={'25px'}
                    mt={'15px'}
                    width={'50%'}
                    display={'flex'}
                    color={'home.text'}
                    transition={'0.3s'}
                    alignItems={'center'}
                    _hover={{ color: 'home.hoverText' }}>
                    <IoIosArrowRoundBack style={{ marginRight: '5px', fontSize: '30px' }} />
                    Status
                </Text>
            </ButtonLink>

                <>
                    <StatusPost />
                    <StatusReply  />
                    <StatusItem  />
                </>
        </>
    );
}
