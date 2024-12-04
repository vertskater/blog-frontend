import { useLoaderData } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { User, Role } from "../Classes/User.tsx";
import { useAuth } from "../useAuth.tsx";
import "../../styles/Users.css";

export default function Users() {
  const { jwt } = useAuth();
  const data = useLoaderData() as {
    msg: string;
    success: boolean;
    users: User[];
  };
  const [users, setUsers] = useState<User[]>(data.users);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    setUsers(data.users);
    setMessage(data.msg);
  }, [data]);
  const roles = Object.keys(Role);

  const roleChangeHandler = async (userId: number, role: string) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    };
    const response = await fetch(
      `https://blog-api-production-2436.up.railway.app/admin/users/role/${userId}/${role}`,
      options
    );
    const result = await response.json();
    if (result.success) {
      setUsers((prevUsers): User[] =>
        prevUsers.map((user) => {
          return user.id === userId ? ({ ...user, role } as User) : user;
        })
      );
    }
    setMessage(result.msg);
  };

  return (
    <div className="users-container">
      <h2>Users</h2>
      {message && <p className="message">{message}</p>}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>
                    <form>
                      <select
                        name="role"
                        id="role"
                        defaultValue={user.role}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          roleChangeHandler(user.id, e.target.value)
                        }
                      >
                        {roles.map((role) => {
                          return (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          );
                        })}
                      </select>
                    </form>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-users">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
