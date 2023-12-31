import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { sendFav, deleteFav, handleFav } from "../assets/utils/favoriteData";
import { displayModal } from "../assets/utils/displayModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useModalContext } from "../context/ModalContext";

import ComicsByCharacter from "../components/ComicsByCharacter";
import Loader from "../components/Loader";

export default function CharacterPage({
  favoriteChar,
  setFavoriteChar,
  token,
  favoriteComics,
  setFavoriteComics,
  setMenu,
}) {
  const [characterData, setCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { loginModal, signModal, disconnectModal, setLoginModal } =
    useModalContext();

  const location = useLocation();
  const { characterId } = useParams();

  const keyOnFavorite = (event) => {
    if (token) {
      handleFav(
        favoriteComics,
        setFavoriteComics,
        favoriteChar,
        setFavoriteChar,
        characterData._id,
        characterData,
        deleteFav,
        sendFav,
        token,
        event
      );
    } else {
      displayModal(setLoginModal, loginModal, event);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/character/${characterId}`
      );
      setCharacterData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (location.state) {
      setCharacterData(location.state.data);
      setIsLoading(false);
    } else {
      fetchData();
    }
    document.title = "Character";
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        translateY: 800,
        transition: {
          duration: 0.8,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
        opacity: 0,
      }}
    >
      <h2>{characterData.name}</h2>
      <div className="biography-bloc">
        <div className="biography-bloc__left">
          <button
            aria-label="add or remove from my favorite"
            tabIndex={signModal || loginModal ? "-1" : "0"}
            className={
              ((loginModal || signModal || disconnectModal) &&
                "favorite__modal") ||
              (!favoriteChar.find((find) => find._id === characterData._id)
                ? "favorite"
                : "favorite__fullheart")
            }
            onClick={
              token
                ? (event) =>
                    handleFav(
                      favoriteComics,
                      setFavoriteComics,
                      favoriteChar,
                      setFavoriteChar,
                      characterData._id,
                      characterData,
                      deleteFav,
                      sendFav,
                      token,
                      event
                    )
                : (event) => displayModal(setLoginModal, loginModal, event)
            }
            onKeyUp={(event) => {
              event.code === "Enter" && keyOnFavorite(event);
            }}
          >
            <FontAwesomeIcon
              className="favorite__icon"
              icon="fa-regular fa-heart"
            />
          </button>
          {!characterData.thumbnail.path.match("image_not_available") && (
            <img
              src={`${characterData.thumbnail.path}/portrait_uncanny.${characterData.thumbnail.extension}`}
              alt={`image de ${characterData.name}`}
            />
          )}
          <div>
            <h3>Description</h3>
            {characterData.description ? (
              <p className="bio-description">{characterData.description}</p>
            ) : (
              <p className="to-complete">Need to be completed ! </p>
            )}
            {characterData.comics.length > 0 && (
              <p>{`${characterData.name} apparaît dans ${
                characterData.comics.length
              } comic${characterData.comics.length > 1 ? "s" : ""} !`}</p>
            )}
          </div>
        </div>
        <div className="biography-bloc__right">
          <h3>Comics</h3>
          <ComicsByCharacter characterId={characterId} setMenu={setMenu} />
        </div>
      </div>
    </motion.main>
  );
}
