import React, { useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoTooltip";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    about: "",
    name: "",
    avatar: "",
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] =
    React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInformation(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) =>
          console.log(`Произошла ошибка при загрузке профиля ${err}`)
        );
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoToolTipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Произошла ошибка постановки лайков ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) =>
        console.log(`Произошла ошибка при удалении карточки ${err}`)
      );
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Произошла ошибка при обновлении профиля ${err}`)
      );
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Произошла ошибка при изменении аватара ${err}`)
      );
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Произошла ошибка при добавлении карточки ${err}`)
      );
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true);
          setIsSuccess(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  // const tokenCheck = () => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     auth
  //       .getContent(jwt)
  //       .then((res) => {
  //         setLoggedIn(true);
  //         setEmail(res.data.email);
  //         navigate("/main", { replace: true });
  //       })
  //       .catch((err) => {
  //         if (err.status === 400) {
  //           console.log("400 — Токен не передан или передан не в том формате");
  //         } else if (err.status === 401) {
  //           console.log("401 — Переданный токен некорректен");
  //         }
  //       });
  //   }
  // };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
        getToken(token)
            .then(res => {
                if (res) {
                    setLoggedIn(true);
                    setEmail(res.data.email);
                }
            })
            .catch((err) => {
              if (err.status === 400) {
                console.log("400 — Токен не передан или передан не в том формате");
              } else if (err.status === 401) {
                console.log("401 — Переданный токен некорректен");
              }
            });
    }
}, []);


  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setEmail(email);
          localStorage.setItem("jwt", res.token);
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  useEffect(() => {
    if (loggedIn === true) {
        navigate('/main')
    }
}, [loggedIn, navigate]);


  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={email} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/main"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onClose={closeAllPopups}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onDeleteCard={handleCardDelete}
                  cards={cards}
                  email={email}
                />
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
