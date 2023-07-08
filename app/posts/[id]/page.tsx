"use client";

import { useAppSelector } from "@/store/store";
import { useParams } from "next/navigation";
import { TPost } from "@/types/post";
import { TUser } from "@/types/user";
import avatar from "@/public/images/avatar.png";

import React, { useState, useEffect } from "react";
import { TComment } from "@/types/comments";
import Axios from "@/Axios";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";
import AddComment from "@/components/AddComment";

const Page = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<TPost | null>(null);
  const [userData, setUserData] = useState<TUser | null>(null);
  const [commentsData, setCommentsData] = useState<TComment[]>([]);

  useEffect(() => {
    Axios(`/posts/${id}`)
      .then((res) => {
        setPostData(res.data);
        return res.data;
      })
      .then((data) => {
        Axios(`/users/${data.userId}`).then((res) => {
          setUserData(res.data);
        });
        Axios(`/post/${data.id}/comments`).then((res) => {
          setCommentsData(res.data);
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [id]);

  return (
    <>
      {postData ? (
        <div>
          <div className="text-center py-10  border-b border-gray-300 dark:border-gray-700">
            <p className="text-base font-semibold text-gray-400">
              {new Date("01-01-2023").toDateString()}
            </p>
            <h1 className="text-3xl lg:text-5xl font-bold">
              {postData?.title}
            </h1>
            <div className="mt-2">
              {["#aboutme", "#mynews", "#public"].map((tag) => (
                <Tag href={`/users/${tag}`} key={tag} text={tag} />
              ))}
            </div>
          </div>

          <div className="xl:grid xl:grid-cols-3  xl:space-y-0 pt-10 border-b border-gray-300 dark:border-gray-700">
            <div className="flex gap-8">
              <div className="h-10 w-10 mb-10 lg:h-20 lg:w-20 overflow-hidden rounded-full bg-gray-700">
                <Image src={avatar} alt="user avatar"></Image>
              </div>

              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    href={`/users/${userData?.id}`}
                    className="text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 duration-200"
                  >
                    {userData?.name}
                  </Link>
                </h3>
                <Tag
                  href={`/users/${userData?.id}`}
                  key={userData?.email}
                  text={userData?.email + ""}
                />
              </div>
            </div>
            <div className="xl:col-span-2">
              <article className="">
                <div className="prose max-w-none  dark:text-gray-300">
                  {postData?.body}
                </div>
              </article>
            </div>
          </div>

          <div className="xl:grid xl:grid-cols-3  xl:space-y-0 py-10 border-b border-gray-300 dark:border-gray-700">
            <div>
              <h3 className="text-2xl font-bold mb-10">Comments</h3>
            </div>
            <div className="xl:col-span-2">
              <ul>
                {!commentsData.length
                  ? "No posts found."
                  : commentsData.map((comment: TComment) => {
                      const { postId, id, name, body, email } = comment;
                      let date = new Date("01-01-2023");
                      return (
                        <li key={id} className="mb-10">
                          <article className="space-y-2 ">
                            <div className=" leading-2xl text-gray-400">
                              <p>{comment.email}</p>
                            </div>
                            <div className="space-y-3 xl:col-span-5">
                              <div>
                                <h3 className="text-2xl font-bold leading-8 tracking-tight">
                                  <Link
                                    href={`/posts/${id}`}
                                    className="text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 duration-200"
                                  >
                                    {name}
                                  </Link>
                                </h3>
                              </div>
                              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                {body}
                              </div>
                            </div>
                          </article>
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>

          <AddComment postId={postData.id}></AddComment>
        </div>
      ) : (
        <h1 className="text-3xl font-bold">Loading...</h1>
      )}
    </>
  );
};

export default Page;
