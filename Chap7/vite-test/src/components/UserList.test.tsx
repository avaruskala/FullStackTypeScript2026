import { describe, expect, it, vi } from "vitest";
import { type User } from "../Api";
import { UserList } from "./UserList";
import { render } from "@testing-library/react";

describe("Testing UserList", () => {
  it("use an fn", async () => {
    const getUsers = vi.fn<() => Promise<User[]>>(async () => [
      {
        id: 1,
        name: "David Choi",
        username: "dave",
        email: "dave@test.com",
      }
    ])
    const users = await getUsers();
    const { getByTestId } = render(<UserList users={users} />);
    const li = getByTestId("li-1");
    expect(li).toBeInTheDocument();
  });

  it("use an fn twice", async () => {
    const getUsers = vi.fn<() => Promise<User[]>>(async () => [
      {
        id: 1,
        name: "David Choi",
        username: "dave",
        email: "dave@test.com",
      }

    ]).mockImplementationOnce(async () => [
      {
        id: 1,
        name: "David Choi",
        username: "dave",
        email: "dave@test.com",
      },
      {
        id: 2,
        name: "John Lee",
        username: "jon",
        email: "jon@test.com",
      }
    ])
    const users1 = await getUsers();
    const { getByTestId: getByTestIdFirst } = render(<UserList users={users1} />);
    const li1 = getByTestIdFirst("li-1");
    expect(li1).toBeInTheDocument();

    const users2 = await getUsers();
    const { getByTestId: getByTestIdSecond } = render(<UserList users={users2} />);
    const li2 = getByTestIdSecond("li-2");
    expect(li2).toBeInTheDocument();
    expect(getUsers)
    expect(getUsers).toHaveBeenCalledTimes(2);
  });
});

