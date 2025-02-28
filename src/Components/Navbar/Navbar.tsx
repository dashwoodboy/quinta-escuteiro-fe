import React, {useEffect, useState} from "react";
import quintaLogo from "./../../assets/qe_logo.png";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../Constants/Routes";
import {MenuIcon} from "../Icons/MenuIcon/MenuIcon";
import {CloseIcon} from "../Icons/CloseIcon/CloseIcon";
import {useMediaQuery} from "usehooks-ts";
import {BackIcon} from "../Icons/BackIcon/BackIcon";
import AnimatedText from "../AnimatedText/AnimatedText";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {GlobeIcon} from "../Icons/Globe/GlobeIcon";
import {UserIcon} from "../Icons/UserIcon/UserIcon";
import {useUser} from "../../Providers/UserProvider";


enum Options {
    DEFAULT
}

enum AnimationState {
  IDLE,
  STOPPED,
  MOVING,
}

export function Navbar() {
    const [isEnabled, setIsEnables] = useState(false);
    const [optionsDisplaying, setOptionsDisplaying] = useState(Options.DEFAULT);
    const [returnFromSide, setReturnFromSide] = useState(AnimationState.IDLE);

    const loggedInUser = useUser()

  console.log(loggedInUser)

    const location = useLocation();
    const matches = useMediaQuery("(min-width: 768px)");
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    useEffect(() => {
        if (matches) setIsEnables(false);
    }, [matches]);

    useEffect(() => {
        setIsEnables(false);
    }, [location]);

    useEffect(() => {
        if (isEnabled) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isEnabled]);

    useEffect(() => {
        if (!isEnabled && returnFromSide === AnimationState.STOPPED) {
            setReturnFromSide(AnimationState.IDLE);
            return;
        }

        if (isEnabled && optionsDisplaying != Options.DEFAULT && returnFromSide === AnimationState.IDLE) {
            setReturnFromSide(AnimationState.MOVING);
            return;
        }

        if (isEnabled && optionsDisplaying == Options.DEFAULT && returnFromSide === AnimationState.STOPPED) {
            setReturnFromSide(AnimationState.MOVING);
            return;
        }

        if (!isEnabled && optionsDisplaying != Options.DEFAULT && returnFromSide == AnimationState.MOVING) {
            setReturnFromSide(AnimationState.STOPPED);
        }

        if (!isEnabled && optionsDisplaying == Options.DEFAULT && returnFromSide == AnimationState.MOVING) {
            setReturnFromSide(AnimationState.IDLE);
        }

    }, [optionsDisplaying,isEnabled]);

    const onLogoClick = () => {
        navigate(ROUTER_APP_PATHS.ROOT);
    };

    const DefaultOptions = () => {

        return (
            <div className="flex flex-col lg:flex-row w-full lg:w-auto h-full justify-center lg:justify-evenly items-center">
                <NavLink
                    to={ROUTER_APP_PATHS.ROOT}
                    className={({ isActive }) =>
                        `lg:mx-4 font-bold text-2xl lg:text-base py-4 ${
                            isActive ? "text-secondary" : "text-white hover:text-secondary"
                        }`
                    }
                >
                    <AnimatedText text={t("home")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Início" />
                </NavLink>
                <NavLink
                  to={ROUTER_APP_PATHS.ACTIVITIES}
                  className={({ isActive }) =>
                    `lg:mx-4 font-bold text-2xl lg:text-base py-4 ${
                      isActive ? "text-secondary" : "text-white hover:text-secondary"
                    }`
                  }
                >
                    <AnimatedText text={t("activities")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Atividade" />
                </NavLink>
                <NavLink
                  to={ROUTER_APP_PATHS.INFRASTRUCTURES}
                  className={({ isActive }) =>
                    `lg:mx-4 font-bold text-2xl lg:text-base py-4 ${
                      isActive ? "text-secondary" : "text-white hover:text-secondary"
                    }`
                  }
                >
                    <AnimatedText text={t("infrastructures")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Infraestrutura" />
                </NavLink>
                <NavLink
                  to={ROUTER_APP_PATHS.RESERVATION}
                  className={({ isActive }) =>
                    `lg:mx-4 font-bold text-2xl lg:text-base py-2 px-32 lg:px-8 bg-white rounded-lg text-primary hover:bg-gray-300 lg:mt-0 mt-20`
                  }
                >
                    <AnimatedText text={t("reserve")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Reserve" />
                </NavLink>
                {loggedInUser.userId &&
                  <NavLink
                    className="lg:mx-0 mx-4  py-2 px-8 lg:py-0 lg:px-0"
                    to={ROUTER_APP_PATHS.LOGIN}
                  >
                      <UserIcon/>
                  </NavLink>
                }
            </div>
        );
    };

    const mobileMenu = () => {
        if (!isEnabled) return;

        const onCloseClick = () => {
            setIsEnables(false);
        };


        const optionsShowing = () => {
            switch (optionsDisplaying) {
                case Options.DEFAULT:
                    return DefaultOptions();
            }
        };

        const onReturnClick = () => {
            setOptionsDisplaying(Options.DEFAULT);
        };

        return (
            <div className="absolute top-0 left-0 w-screen h-screen bg-primary bg-opacity-80 px-6 py-6">
                <div
                    className={`w-full flex items-center ${
                        optionsDisplaying === Options.DEFAULT
                            ? "justify-end"
                            : "justify-between"
                    }`}>
                    {optionsDisplaying !== Options.DEFAULT && (
                        <>
                            <BackIcon onClick={onReturnClick} />
                            <h1 className="font-bold text-primary text-3xl">
                                {optionsDisplaying}
                            </h1>
                        </>
                    )}
                    <CloseIcon onClick={onCloseClick} />
                </div>
                <div className="w-full h-full flex flex-col items-center justify-evenly ">
                    {optionsShowing()}
                </div>
            </div>
        );
    };

    const desktop = () => {
        return (
            <div className="w-1/2 hidden lg:flex  justify-end items-center">
                {DefaultOptions()}
            </div>
        );
    };

    const mobile = () => {
        if (isEnabled) return;

        const onMenuClick = () => {
            setIsEnables(true);
        };

        return (
            <div className="flex lg:hidden">
                <MenuIcon onClick={onMenuClick} />
            </div>
        );
    };

    return (
        <div className="w-full h-20 flex justify-between items-center fixed top-0 pl-2 pr-4 lg:px-8  drop-shadow-lg shadow-black bg-primary z-50 cursor-pointer">
            <div className="h-full flex items-center">
                <img
                    src={quintaLogo}
                    alt="logo"
                    className="lg:h-5/6 h-4/6"
                    onClick={onLogoClick}
                />
                <div className="flex flex-col items-center">
                    <h1 className="font-bold lg:text-xl text-white whitespace-nowrap">Quinta do Escuteiro</h1>
                    <h2 className="font-bold text-sm lg:text-base text-white">Batalha - Portugal</h2>
                </div>
                <div
                    className="lg:ml-8 ml-4 py-1 px-4 bg-white rounded-lg flex justify-between items-center hover:text-white hover:bg-secondary"
                    onClick={() => {
                        i18n.changeLanguage(i18n.language === "pt"? "en" : "pt");
                    }}
                >
                    <p className="mr-2 font-bold">{i18n.language.toUpperCase()}</p>
                    <GlobeIcon  />
                </div>
            </div>
            {desktop()}
            {mobile()}
            {mobileMenu()}
        </div>
    );
}
