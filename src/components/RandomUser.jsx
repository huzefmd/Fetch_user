import axios from "axios";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

const RandomUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://randomuser.me/api/?page=${page}&results=5`
        );
        setUsers((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        console.error("Error Fetching the User", error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 10 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="m">
      <h1 className="text-5xl place-self-center font-serif font-bold">
        Random User
      </h1>
      <div className="grid grid-flow-row grid-cols-4 gap-2 ">
        {users.map((user, index) => (
          <div
            key={index}
            className=" border  rounded w-auto m-10   p-10 place-self-center    text-center "
          >
            <img
              className="w-2xl rounded-full "
              src={user.picture.medium}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <h2 className="font-bold font-mono text-2xl ">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-center">{user.email}</p>
            <button
              onClick={() => {
                alert("Followed");
              }}
              className=" p-5 mt-5 rounded-full bg-green-500 text-white cursor-pointer"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RandomUser;
