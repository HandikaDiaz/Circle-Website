import { Link as CLink, LinkProps } from "@chakra-ui/react";
import { Link as RRLink, LinkProps as RRLinkProps } from "react-router-dom";

type ButtonLinkProps = LinkProps & RRLinkProps & { children: React.ReactNode };

export function ButtonLink({ children, to, ...props }: ButtonLinkProps) {
    return (
        <CLink
            as={RRLink} to={to} {...props}
            _hover={{ color: 'nav.button.hoverText' }}
            transition={"color 0.2s ease-in-out"}
            textDecoration={'none'}>
            {children}
        </CLink>
    );
}