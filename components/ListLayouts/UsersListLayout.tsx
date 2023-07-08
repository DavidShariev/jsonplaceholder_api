"use client";

import React, { useState, useEffect } from "react";
import { TUser } from "@/types/user";
import Link from "next/link";
import Tag from "@/components/Tag";
import avatar from "@/public/images/avatar.png";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { setUsers } from "@/store/slices/users";

const UsersListLayout = ({
  data,
  title,
  subtitle,
}: {
  data: TUser[];
  title: string;
  subtitle: string;
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<TUser[]>(data);
  const [nameFilter, setNameFilter] = useState<string>("");

  useEffect(() => {
    setState(data.filter((user: TUser) => user.name.includes(nameFilter)));
  }, [nameFilter]);

  useEffect(() => {
    dispatch(setUsers(data));
  }, []);

  return (
    <div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 border-b border-b-gray-300 dark:border-b-gray-600">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className=" text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
          <div className="relative max-w-lg">
            <input
              aria-label="Search users"
              type="text"
              value={nameFilter}
              onChange={(e) => {
                setNameFilter(e.target.value);
              }}
              placeholder="Search users"
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
            ? "No users found."
            : state.map((user: TUser) => {
                const { id, name, email, phone, website } = user;
                return (
                  <li key={id} className="py-10">
                    <article className="space-y-2 xl:grid xl:grid-cols-6  xl:space-y-0">
                      <div className="h-10 w-10 lg:h-20 lg:w-20 overflow-hidden rounded-full bg-gray-700">
                        <Image src={avatar} alt="user avatar"></Image>
                      </div>
                      <div className="space-y-3 xl:col-span-5">
                        <div>
                          <h3 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/users/${id}`}
                              className="text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 duration-200"
                            >
                              {name}
                            </Link>
                          </h3>
                          <div className="flex flex-wrap">
                            {[email, phone, website].map((tag) => (
                              <Tag
                                href={`/users/${tag}`}
                                key={tag}
                                text={tag}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Tenetur, quidem illo ratione soluta, excepturi,
                          quod et reprehenderit accusamus numquam recusandae
                          voluptates voluptas quam dolore harum quo suscipit
                          ducimus velit non?
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export default UsersListLayout;
