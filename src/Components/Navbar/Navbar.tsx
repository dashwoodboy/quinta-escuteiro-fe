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

        if (isEnabled && optionsDisplaying !== Options.DEFAULT && returnFromSide === AnimationState.IDLE) {
            setReturnFromSide(AnimationState.MOVING);
            return;
        }

        if (isEnabled && optionsDisplaying === Options.DEFAULT && returnFromSide === AnimationState.STOPPED) {
            setReturnFromSide(AnimationState.MOVING);
            return;
        }

        if (!isEnabled && optionsDisplaying !== Options.DEFAULT && returnFromSide === AnimationState.MOVING) {
            setReturnFromSide(AnimationState.STOPPED);
        }

        if (!isEnabled && optionsDisplaying === Options.DEFAULT && returnFromSide === AnimationState.MOVING) {
            setReturnFromSide(AnimationState.IDLE);
        }

    }, [optionsDisplaying, isEnabled, returnFromSide]);

    const onLogoClick = () => {
        navigate(ROUTER_APP_PATHS.ROOT);
    };

    const DefaultOptions = () => {

        return (
            <div className="flex flex-col xl:flex-row w-full xl:w-auto h-full justify-center xl:justify-evenly items-center">
                <NavLink
                    to={ROUTER_APP_PATHS.ROOT}
                    className={({ isActive }) =>
                        `xl:mx-4 font-bold text-2xl xl:text-base py-4 ${
                            isActive ? "text-secondary" : "text-white hover:text-secondary"
                        }`
                    }
                >
                    <AnimatedText text={t("home")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Início" />
                </NavLink>
                <NavLink
                  to={ROUTER_APP_PATHS.ACTIVITIES}
                  className={({ isActive }) =>
                    `xl:mx-4 font-bold text-2xl xl:text-base py-4 ${
                      isActive ? "text-secondary" : "text-white hover:text-secondary"
                    }`
                  }
                >
                    <AnimatedText text={t("activities")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Atividade" />
                </NavLink>
                <NavLink
                  to={ROUTER_APP_PATHS.INFRASTRUCTURES}
                  className={({ isActive }) =>
                    `xl:mx-4 font-bold text-2xl xl:text-base py-4 ${
                      isActive ? "text-secondary" : "text-white hover:text-secondary"
                    }`
                  }
                >
                    <AnimatedText text={t("infrastructures")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Infraestrutura" />
                </NavLink>
                <NavLink
                    to={ROUTER_APP_PATHS.DOCUMENTS}
                    className={({ isActive }) =>
                        `xl:mx-4 font-bold text-2xl xl:text-base py-4 ${
                            isActive ? "text-secondary" : "text-white hover:text-secondary"
                        }`
                    }
                >
                    <AnimatedText text={t("documents")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="documents" />
                </NavLink>
                <NavLink
                  to={ROUTER_APP_PATHS.RESERVATION}
                  className={({ isActive }) =>
                    `xl:mx-4 font-bold text-2xl xl:text-base py-2 px-32 xl:px-8 bg-white rounded-lg text-primary hover:bg-gray-300 xl:mt-0 mt-20`
                  }
                >
                    <AnimatedText text={t("reserve")} activeAnimation={returnFromSide === AnimationState.MOVING} inverse={true} key="Reserve" />
                </NavLink>
                {loggedInUser.userId &&
                  <NavLink
                    className="xl:mx-0 mx-4  py-2 px-8 xl:py-0 xl:px-0"
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
            <div className="w-1/2 hidden xl:flex  justify-end items-center">
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
            <div className="flex xl:hidden">
                <MenuIcon onClick={onMenuClick} />
            </div>
        );
    };

    return (
        <div className="w-full h-20 flex justify-between items-center fixed top-0 pl-2 pr-4 xl:px-8  drop-shadow-lg shadow-black bg-primary z-50 cursor-pointer">
            <div className="h-full flex items-center">
                <img
                    src={quintaLogo}
                    alt="logo"
                    className="xl:h-5/6 h-4/6"
                    onClick={onLogoClick}
                />
                <div className="flex flex-col items-center">
                    <h1 className="font-bold xl:text-xl text-white whitespace-nowrap">Quinta do Escuteiro</h1>
                    <h2 className="font-bold text-sm xl:text-base text-white">Batalha - Portugal</h2>
                </div>
                <div
                    className="xl:ml-8 ml-4 py-1 px-4 bg-white rounded-lg flex justify-between items-center hover:text-white hover:bg-secondary"
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
