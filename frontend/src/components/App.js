import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const history = useHistory();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isRegOk, setIsRegOk] = React.useState(true);
  const [regPopupText, setRegPopupText] = React.useState("");

  const handleIsRegOk = (e) => {
    setIsRegOk(e);
  };

  const handleRegText = (e) => {
    setRegPopupText(e);
  };

  const handleCloseRegPopup = () => {
    setInfoTooltipOpen(false);
    if (isRegOk) {
      history.push("/signin");
    }
  };

  const handleReg = () => {
    setInfoTooltipOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setIsLoading(false);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setIsLoading(false);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setIsLoading(false);
  };

  const handleCardClick = (link) => {
    setSelectedCard(link);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isInfoTooltipOpen;

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .getContent()
        .then((res) => {
          if (res) {
            setUserData(res.email);
            handleLogin();
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserId()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((cardInfo) => {
          setCards(cardInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserId(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .createNewAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(props) {
    setIsLoading(true);
    api
      .createCard(props)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .setLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAuthorize(email, password) {
    if (!email || !password) {
      return;
    }
    api
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setUserData(email);
          handleLogin();
          localStorage.setItem('token', data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setIsRegOk(false);
        handleRegText("?????????????????? ???????????? ?? ??????????");
      });
  }

  function handleRegistration(email, password) {
    api
      .registration(email, password)
      .then(() => {
        setRegPopupText(`???? ?????????????? ????????????????????????????????????!`);
        setIsRegOk(true);
        handleReg();
      })
      .catch(() => {
        setRegPopupText(`??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.`);
        setIsRegOk(false);
        handleReg();
      });
  }

  function handleSignOut () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div className="page">
          <Header userData={userData}
                  onSignOut={handleSignOut}/>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            />

            <Route exact path="/signin">
              <Login handleAuthorize={handleAuthorize} />
            </Route>
            <Route exact path="/signup">
              <Register
                handleReg={handleReg}
                isRegOk={handleIsRegOk}
                regPopupText={handleRegText}
                handleRegistration={handleRegistration}
              />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="signin" />}
            </Route>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          ></EditProfilePopup>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isRegOk={isRegOk}
            isOpen={isInfoTooltipOpen}
            onClose={handleCloseRegPopup}
            regPopupText={regPopupText}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
