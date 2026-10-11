import { useState, useTransition, type MouseEventHandler, type MouseEvent, useEffect } from 'react';
import Home, { type UserType } from './Home'


enum SelectedItem {
  Default,
  Users,
  Message,
}


export function UserItem({ user }: { user: UserType }) {
  const start = Date.now();
  while (Date.now() - start < 10) {

  }
  return <div>{user.title}</div>
}


export function UsersLoader() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const users = [];
    for (let i = 0; i < 200; i++) {
      users.push({
        userId: i,
        id: i,
        title: `Title ${i}`,
        body: `Body ${i}`,
      });

    }
  }, []);

  return (
    <>
      {users?.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </>
  );
}

export function ShowMessage() {
  return <div>Interrupt!</div>;

}

export default function Transitioner() {
  const [selectedItem, setSelectedItem] = useState(SelectedItem.Default);
  const [_isPending, startTransition] = useTransition();

  const onClickUsers = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(() => {
      setSelectedItem(SelectedItem.Users);
    });
  };

  const onClickMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(() => {
      setSelectedItem(SelectedItem.Message);
    });
  };


  return (
    <div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        width: "400px",

      }}>
        <button onClick={onClickUsers}>get users</button>
        <button onClick={onClickMessage}>get message</button>
      </div>
      <div>
        {selectedItem === SelectedItem.Default && <div>Start here</div>}{" "}
        {selectedItem === SelectedItem.Users && <UsersLoader />}
        {selectedItem === SelectedItem.Message && <ShowMessage />}
      </div>
    </div>
  );


}
