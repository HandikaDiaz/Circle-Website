import React from "react";
import { Text } from "@chakra-ui/react";

interface ErrorMessageProps {
    message?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
    if(!message) return null;

    return (
        <Text color={"red"} fontSize={"12px"} fontWeight={"bold"}>{message}</Text>
    )
}
