"use client";

import Tag from "@/components/Tag";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import avatar from "@/public/images/avatar.png";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/store";
import Axios from "@/Axios";
import { TUser } from "@/types/user";
import { TPost } from "@/types/post";
import PostsListLayout from "@/components/ListLayouts/PostsListLayout";

export default function Page() {
  const { id } = useParams();
  const [user, setUser] = useState<TUser | null>(null);
  const [posts, setPosts] = useState<TPost[]>([]);

  useAppSelector(async ({ users }) => {
    const userDataFromStore = users.data?.filter(
      (userData) => userData.id === +id
    )[0];

    //проверка наличия данных пользователя в store
    if (userDataFromStore && !user) {
      setUser(userDataFromStore);
    } else if (!userDataFromStore && !user) {
      //запрос данных при отсутствие в store
      await Axios(`/users/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((e) => {
          console.log(e.message);
          setUser(null);
        });
    }
  });

  useEffect(() => {
    if (user) {
      // получение постов пользователя
      Axios(`/users/${id}/posts`).then((res) => {
        setPosts(res.data);
      });
    }
  }, [user]);

  return (
    <>
      {user ? (
        <div>
          <div className=" divide-gray-200 dark:divide-gray-700 border-b border-b-gray-300 dark:border-b-gray-600">
            <div className="flex gap-10 items-center py-8">
              <div className="h-10 w-10 lg:h-20 lg:w-20 overflow-hidden rounded-full bg-gray-700">
                <Image src={avatar} alt="user avatar"></Image>
              </div>
              <h2 className="text-3xl font-extrabold leading-3 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-14">
                {user?.name}
              </h2>
            </div>
          </div>
          <div className="py-4 flex flex-wrap">
            {[user.phone, user.email, user.company].map((text) => {
              return <Tag key={text + ""} href="#" text={text + ""} />;
            })}
          </div>

          <PostsListLayout title="Posts" subtitle="" data={posts} />
        </div>
      ) : (
        <h1 className="text-3xl font-bold">Loading...</h1>
      )}
    </>
  );
}
