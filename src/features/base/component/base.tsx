import { SideLeftNavbar } from "./nav/left-nav";
import { SideRightNavbar } from "./nav/right-nav";
import { HomePost } from "./page/home-post";
import { HomeReply } from "./page/home-reply";


export function Base() {
    return(
        <>
            {/* <SideLeftNavbar /> */}
            <HomePost />
            <HomeReply />
            {/* <SideRightNavbar /> */}
        </>
    )
}