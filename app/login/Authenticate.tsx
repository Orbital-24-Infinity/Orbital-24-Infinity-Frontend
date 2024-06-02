import Image from "next/image";
import LoginButton from "../firebase/LoginButton/LoginButton";

const Authenticate = () => {
    return (
        <div>
            <Image src="/images/web_dark_rd_SI@4x.png" width={150} height={45} alt="google button" />
            <LoginButton/>
        </div>
    ); 
    
};

export default Authenticate;