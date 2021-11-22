import { Button } from "@mui/material";
import { UserInfo } from "firebase/auth";
import { googleSignIn, useAuth } from "./Services/Firebase/Firebase";


const Header = () => {

    const [user] = useAuth();

    let content;
    if (user) {
        content = <UserSignedIn user={user} />
    }
    else {
        content = <NotLoggedIn />
    }

    return <header className="flex flex-row-reverse">
        {content}
    </header>;
};

const UserSignedIn = (props: { user: UserInfo}) => <div className="m-2 w-[3.5em]">
    <img className="rounded-full" src={props.user.photoURL!} alt="user-profile-picture"/>
</div>;

const NotLoggedIn = () => <Button onClick={async () => await googleSignIn()}>Se connecter</Button>;


export default Header;