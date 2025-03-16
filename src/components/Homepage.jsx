import styles from "./Homepage.module.css";
import { Button } from "./ui/Button";
import { useState } from "react";
import ModalComponent from "./ui/ModalComponent";
import LoginForm from "./login/LoginForm";
import IMAGES from "../images/Images";

function Homepage() {
  const [openLogin, setOpenLogin] = useState(false);

  function handleOpenLogin() {
    setOpenLogin(true);
  }

  const handleCloseLogin = (isClosed) => {
    setOpenLogin(isClosed);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.homepage}>
        <div className={styles.header}>
          <h1>Packing App</h1>
          <h2>Pack smart, travel light: Never forget a thing.</h2>
          <Button version={"positive"} onClickFunction={handleOpenLogin}>
            Log in
          </Button>
          {openLogin && (
            <ModalComponent
              isOpen={openLogin}
              handleCloseModal={handleCloseLogin}
            >
              <LoginForm />
            </ModalComponent>
          )}
        </div>
        <div>
          <picture>
            <source srcSet={IMAGES.homepage_photo_webp} type="image/webp" />
            <source srcSet={IMAGES.homepage_photo} type="image/jpeg" />
            <img
              src={IMAGES.homepage_photo}
              alt="An image depicting a packed suitcase for a trip"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
