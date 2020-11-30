import { timeStamp } from "console";
import React, { createContext, useEffect, useState } from "react";
import { requestApi } from "../utils";

export const UserContext = createContext({
  wishlist: [] as IWishlist[],
  addWishlist: (gameId: string) => {},
  deleteWishlist: (gameId: string) => {},
  isWishlisted: (gameId: string): Boolean => new Boolean(),
});

interface UserContextProps {}

interface IWishlist {
  id: string;
  createdAt: string;
  gameInfoId: string;
  userId: string;
}

const UserContextProvider: React.FC<UserContextProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState([] as IWishlist[]);

  const addWishlist = (gameId: string) => {
    requestApi(`/user/wishlist/add/${gameId}`, "PUT")
      .then((response) => {
        setWishlist([...wishlist, response.savedWishlist]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWishlist = (gameId: string) => {
    requestApi(`/user/wishlist/delete/${gameId}`, "DELETE")
      .then((response) => {
        const newWistlist = wishlist.filter(
          (item) => item.gameInfoId !== gameId
        );
        setWishlist(newWistlist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isWishlisted = (id: string): Boolean => {
    let returnValue = false;
    if (wishlist.some((e) => e.gameInfoId === id)) {
      returnValue = true;
    }
    return returnValue;
  };

  useEffect(() => {
    const fetchWishlist = () => {
      requestApi("/user/wishlist")
        .then((response) => {
          setWishlist(response.wishlist);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchWishlist();
  }, []);

  return (
    <UserContext.Provider
      value={{
        wishlist: wishlist,
        addWishlist: addWishlist,
        deleteWishlist: deleteWishlist,
        isWishlisted: isWishlisted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
