import {
  Collapse,
  IconButton,
  ListItem,
  List,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";

import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import Swal from "sweetalert2";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../Provider/AuthProvider";
import avatar from "../../assets/avatar.png";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  // const [userRole, isUserLoading] = useUserRole(user);

  // console.log(userRole === "admin");
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // to logout user
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const menuList = (
    <>
      <List className="flex items-center gap-4  md:gap-6 lg:flex-row nav-list my-8 lg:my-0 min-w-0">
        <NavLink to="/" className="item">
          <ListItem className="list duration-500">Home</ListItem>
        </NavLink>
        <NavLink to="/" className="item">
          <ListItem className="list duration-500">Products</ListItem>
        </NavLink>
      </List>
    </>
  );

  return (
    <nav className="py-4 md:py-8">
      <div className="flex items-center justify-between">
        {/* website name */}
        <div className="cursor-pointer flex items-center gap-2">
          <h3>
            <span className="text-[var(--clr-focussed)]">Product</span>Explorer
          </h3>
        </div>

        {/* Navbar end */}
        <div className="flex gap-6 items-center">
          {/* main menu */}
          <div className="hidden lg:block mt-2">{menuList}</div>

          {/* Icon to open collapsed menu */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <IoMdClose className="h-6 w-6" strokeWidth={2} />
            ) : (
              <IoMdMenu className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>

          {/*user profile and Conditional login-register*/}

          {user ? (
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <div className="w-12 h-12 rounded-full border-4 border-[var(--clr-white)] bg-[var(--bg-secondary)] cursor-pointer">
                  <img
                    src={user?.photoURL || avatar}
                    alt="User's Profile Picture"
                    className="rounded-full w-full h-full"
                  />
                </div>
              </MenuHandler>
              <MenuList className="p-4 text-[var(--clr-primary)]">
                <div className="outline-none">
                  <p className="text-center">{user?.displayName}</p>
                <button className="w-full flex items-center gap-4 text-base font-semibold border-t-2 pt-2 text-[var(--clr-focussed)] mt-16 hover:underline" onClick={handleLogOut}>
                 <AiOutlineLogout className="text-xl -rotate-90"/> Logout
                </button>
                </div>
              </MenuList>
            </Menu>
          ) : (
            <div className="hidden gap-2 lg:flex items-center">
              <Link to="/login">
                <button className=" bg-[var(--bg-secondary)] hover:text-[var(--clr-focussed)] py-2 px-4 rounded-sm hover:scale-95 duration-300 font-medium">Login</button>
              </Link>
              <Link to="/register">
                <button className="bg-[var(--clr-focussed)] hover:scale-95 duration-300 font-medium text-white py-2 px-4 rounded-sm">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Collapsed Menu for medium and smaller devices*/}
      <Collapse open={openNav}>
        <div className="shadow-3xl border-2 border-t-0 p-4 md:p-8">
          {menuList}

          {!user && (
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Link to="/login" className="w-full">
                <button className="btn1 w-full lg:w-fit">Login</button>
              </Link>
              <Link to="/register" className="w-full">
                <button className="btn1 w-full lg:w-fit">Register</button>
              </Link>
            </div>
          )}
        </div>
      </Collapse>
    </nav>
  );
};

export default Navbar;
