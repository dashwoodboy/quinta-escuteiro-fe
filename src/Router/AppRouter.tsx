import React, {createContext} from "react";
import {Home} from "../Pages/Home";
import {Navbar} from "../Components/Navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../Constants/Routes";
import {Colors} from "../Models/Colors";
import {Reservation} from "../Pages/Reservation/Reservation";
import {Activities} from "../Pages/Activities/Activities";
import {Login} from "../Pages/User/Login";
import {Configuration} from "../Pages/Configuration/Configuration";
import {ReservationsList} from "../Pages/Configuration/ReservationsList/ReservationsList";
import {ReservationReview} from "../Pages/Configuration/ReservationsList/ReservationReview";
import {ActivitiesList} from "../Pages/Configuration/ActivitiesList/ActivitiesList";
import {ActivityCreate} from "../Pages/Configuration/ActivitiesList/ActivityCreate";
import {ActivityUpdate} from "../Pages/Configuration/ActivitiesList/ActivityUpdate";
import {InfrastructuresList} from "../Pages/Configuration/InfratructuresList/InfrastructuresList";
import {InfrastructureCreate} from "../Pages/Configuration/InfratructuresList/InfrastructureCreate";
import {InfrastructureUpdate} from "../Pages/Configuration/InfratructuresList/InfrastructureUpdate";
import {Infrastructures} from "../Pages/Infrastructures/Infrastructures";
import {ReservationState} from "../Pages/ReservationTest/ReservationState";
import {ActivityView} from "../Pages/Activities/ActivityView";
import {useUser} from "../Providers/UserProvider";
import {Documents} from "../Pages/Documents/Documents";
import {DocumentsList} from "../Pages/Configuration/DocumentsList/DocumentsList";
import {DocumentAdd} from "../Pages/Configuration/DocumentsList/DocumentAdd";
import {More} from "../Pages/More/More";

export const ColorContext = createContext<Colors>(Colors.LOBITOS);

function AppRouter() {

    const { userId } = useUser()

    return (
        <div >
            <BrowserRouter>
                <Navbar />
                <div className="fixed flex pt-20 top-0 left-0 h-screen w-full overflow-hidden">
                    <Routes>
                        <Route
                            path={ROUTER_APP_PATHS.ROOT}
                            element={<Home />}
                        />
                        <Route
                          path={ROUTER_APP_PATHS.ACTIVITIES}
                          element={<Activities />}
                        />
                        <Route
                          path={ROUTER_APP_PATHS.ACTIVITY}
                          element={<ActivityView />}
                        />
                        <Route
                            path={ROUTER_APP_PATHS.RESERVATION}
                            element={<Reservation />}
                        />
                        <Route
                          path={ROUTER_APP_PATHS.RESERVATIONSTATE}
                          element={<ReservationState />}
                        />
                        <Route
                          path={ROUTER_APP_PATHS.INFRASTRUCTURES}
                          element={<Infrastructures />}
                        />
                        <Route
                            path={ROUTER_APP_PATHS.DOCUMENTS}
                            element={<Documents />}
                        />
                        <Route
                          path={ROUTER_APP_PATHS.MORE}
                          element={<More />}
                        />
                        <Route
                          path={ROUTER_APP_PATHS.LOGIN}
                          element={<Login />}
                        />
                        {userId &&
                            <>
                                <Route
                                    path={ROUTER_APP_PATHS.CONFIGURATION}
                                    element={<Configuration />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.RESERVATIONIST}
                                    element={<ReservationsList />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.RESERVATIONREVIEW}
                                    element={<ReservationReview />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.ACTIVITIESLIST}
                                    element={<ActivitiesList />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.ACTIVITIESCREATE}
                                    element={<ActivityCreate />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.ACTIVITIESVIEW}
                                    element={<ActivityUpdate />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.INFRASTRUCTURESLIST}
                                    element={<InfrastructuresList />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.INFRASTRUCTURESCREATE}
                                    element={<InfrastructureCreate />}
                                />
                                <Route
                                    path={ROUTER_APP_PATHS.INFRASTRUCTURESVIEW}
                                    element={<InfrastructureUpdate />}
                                />
                                <Route
                                  path={ROUTER_APP_PATHS.DOCUMENTSLIST}
                                  element={<DocumentsList />}
                                />
                                <Route
                                  path={ROUTER_APP_PATHS.DOCUMENTSADD}
                                  element={<DocumentAdd />}
                                />
                            </>
                        }
                        <Route
                          path="*"
                          element={<Navigate to={ROUTER_APP_PATHS.ROOT} replace />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;
