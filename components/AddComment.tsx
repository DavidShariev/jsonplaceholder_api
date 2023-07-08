"use state";

import Axios from "@/Axios";
import { FormEventHandler, useReducer } from "react";

type TState = {
  name: string;
  email: string;
  message: string;
};

const initialState: TState = {
  name: "",
  email: "",
  message: "",
};

const reducer = (
  state: TState,
  action: {
    payload: any;
    type: "setName" | "setEmail" | "setMessage";
  }
) => {
  switch (action.type) {
    case "setName":
      state = { ...state, name: action.payload };
      break;
    case "setEmail":
      state = { ...state, email: action.payload };
      break;
    case "setMessage":
      state = { ...state, message: action.payload };
      break;
  }
  return state;
};

export default function AddComment({ postId }: { postId: number }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    Axios("/comments/", {
      method: "POST",
      data: {
        postId,
        name: state.name,
        email: state.email,
        body: state.message,
      },
    })
      .then((res) => {
        alert("Comment added");
        console.log(res.data);
      })
      .catch((e) => {
        alert("Error");
        console.log(e.message);
      });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="lg:grid lg:grid-cols-2 gap-x-5 py-10"
    >
      <h3 className="text-3xl font-bold col-span-2 mb-10">Add comment</h3>
      <div className="group">
        <label htmlFor="name">name</label>
        <input
          name="name"
          aria-label="name"
          type="text"
          onChange={(e) => {
            dispatch({ type: "setName", payload: e.target.value });
          }}
          placeholder="name"
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          required
        />
      </div>
      <div className="group">
        <label htmlFor="email">email</label>
        <input
          onChange={(e) => {
            dispatch({ type: "setEmail", payload: e.target.value });
          }}
          aria-label="email"
          type="text"
          placeholder="email"
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          required
        />
      </div>
      <div className="lg:col-span-2">
        <label htmlFor="message">message</label>
        <textarea
          name="message"
          onChange={(e) => {
            dispatch({ type: "setMessage", payload: e.target.value });
          }}
          aria-label="message"
          placeholder="message"
          className="mb-4  px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="px-20 py-3 w-full md:w-auto text-sm bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-900 duration-300 rounded-md hover:bg-gray-300"
        >
          create
        </button>
      </div>
    </form>
  );
}
