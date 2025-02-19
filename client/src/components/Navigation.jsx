import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import { BiLock, BiLogOut, BiUser } from 'react-icons/bi';
import { BsMessenger } from 'react-icons/bs';
import {useDispatch, useSelector} from "react-redux";
import Dropdown from "./Dropdown";
import {logoutAction} from "../redux/ slices/authSlice";
import socketContext from "../socket/SocketContext";

const Navigation = () => {

    const dispatch = useDispatch()
    const {auth} = useSelector(state => state.authState)

    const {socket} = useContext(socketContext)


    const [isOpenAuthDropdown, setIsOpenAuthDropdown] = useState(false)

    function handleLogout() {

        if (!auth) return;

        if (socket) {
            socket.emit("leave-online", {userId: auth.id})
        }
        dispatch(logoutAction())
    }

    return (
        <header className="navigation bg-dark-40 fixed top-0 left-0 w-full py-4">
            <div className="container flex justify-between px-4">
                <Link to="/">
                    <div className="flex items-center gap-x-2">
                        <div className="w-9">
                            <img src="/icons/logo.svg" alt=""/>
                        </div>
                        <h2 className="font-medium bg-transparent text-xl">FlyText</h2>
                    </div>
                </Link>

                <nav>
                    <ul className="flex items-center gap-x-4">
                        {auth ? (
                            <>
                                <li>
                                    <Link className="flex items-center gap-x-1" to="/messenger">
                                        <BsMessenger/>
                                        Messenger
                                    </Link>
                                </li>
                                <li className="relative"
                                    onClick={() => setIsOpenAuthDropdown(!isOpenAuthDropdown)}>
                                    <div className="flex items-center gap-x-1">
                                        <div
                                            className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full">
                                            <BiUser className=""/>
                                        </div>
                                        <div>
                                            {auth.username}
                                        </div>
                                    </div>
                                    <Dropdown isOpen={isOpenAuthDropdown} className="!absolute"
                                              onClose={() => setIsOpenAuthDropdown(false)}>
                                        <ul>
                                            <li>
                                                <Link className="flex items-center gap-x-1" to="/profile">
                                                    <BiUser/>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li onClick={handleLogout} className="mt-1 flex items-center gap-x-1">
                                                <BiLogOut/>
                                                Logout
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button className="btn"><Link className="flex items-center gap-x-1" to="/login">
                                        <BiLock/>
                                        Login
                                    </Link></button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;