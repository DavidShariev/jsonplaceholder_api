import Axios from "@/Axios";
import { TUser } from "@/types/user";

import UsersListLayout from "@/components/ListLayouts/UsersListLayout";
import { useAppDispatch } from "@/store/store";

let usersData: TUser[] = [];

// получение данных пользователей на стороне сервера
async function getUsers(name?: string) {
  const res = Axios(`/users/`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return [];
      console.log(e.message);
    });

  return res;
}

export default async function Home() {
  usersData = await getUsers();

  return (
    <main>
      <UsersListLayout
        data={usersData}
        title="Users"
        subtitle="Filter by name"
      />
    </main>
  );
}
