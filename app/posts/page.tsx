import React from "react";
import { TPost } from "@/types/post";
import Axios from "@/Axios";
import PostsListLayout from "@/components/ListLayouts/PostsListLayout";
import Pagination from "@/components/Pagination";

let posts: TPost[] = [];

// получение постов на стороне сервера
export async function getPosts(name?: string) {
  const res = Axios(`/posts/`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return [];
      console.log(e.message);
    });

  return res;
}

export default async function Page() {
  posts = await getPosts();

  return (
    <main>
      <PostsListLayout
        data={posts}
        title="Latests posts"
        subtitle="filter by title"
      />
    </main>
  );
}
