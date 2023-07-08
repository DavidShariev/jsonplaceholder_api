"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Tag from "@/components/Tag";
import avatar from "@/public/images/avatar.png";
import Image from "next/image";
import { TPost } from "@/types/post";
import Pagination from "../Pagination";

const pageSize = 10;

const PostsListLayout = ({
  data,
  title,
  subtitle,
}: {
  data: TPost[];
  title: string;
  subtitle: string;
}) => {
  const [state, setState] = useState<TPost[]>(data);
  const [titleFilter, setTitlteFilter] = useState<string>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setState(data.filter((post) => post.title.includes(titleFilter)));
  }, [titleFilter, data]);

  return (
    <div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 border-b border-b-gray-300 dark:border-b-gray-600">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              value={titleFilter}
              onChange={(e) => {
                setTitlteFilter(e.target.value);
              }}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="py-10">
        <ul>
          {!state.length
            ? "No posts found."
            : state
                .slice(pageSize * (page - 1), pageSize * page)
                .map((post) => {
                  const { id, title, body, userId } = post;
                  let date = new Date("01-01-2023");
                  return (
                    <li key={id} className="py-10">
                      <article className="space-y-2 ">
                        <div className=" leading-2xl text-gray-400">
                          <p>{date.toDateString()}</p>
                        </div>
                        <div className="space-y-3 xl:col-span-5">
                          <div>
                            <h3 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/posts/${id}`}
                                className="text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 duration-200"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="flex flex-wrap">
                              <Tag
                                key={userId}
                                href={`/users/${userId + ""}`}
                                text={"Author"}
                              />
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {body}
                          </div>
                          <Link
                            className="py-3  text-teal-500 hover:text-teal-300 inline-block"
                            href={`/posts/${id + ""}`}
                          >
                            Read more
                            <span className=" font-bold px-2">{"->"}</span>
                          </Link>
                        </div>
                      </article>
                    </li>
                  );
                })}
        </ul>
        <Pagination
          totalPages={parseInt(state.length / pageSize + "") + ""}
          currentPage={page + ""}
          changePage={setPage}
        ></Pagination>
      </div>
    </div>
  );
};

export default PostsListLayout;
