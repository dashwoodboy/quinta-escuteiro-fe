import React, {createContext} from "react";
import {Home} from "../Pages/Home";
import {Navbar} from "../Components/Navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../Constants/Routes";
import {Colors} from "../Models/Colors";
import {Reservation} from "../Pages/Reservation/Reservation";
import {Activities} from "../Pages/Activities/Activities";

export const ColorContext = createContext<Colors>(Colors.LOBITOS);

function AppRouter() {

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <div className="flex pt-20 top-0 left-0 h-screen w-full overflow-hidden">
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
                            path={ROUTER_APP_PATHS.RESERVATION}
                            element={<Reservation />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;
