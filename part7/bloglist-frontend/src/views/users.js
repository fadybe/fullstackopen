import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";

import { getStats } from "../reducers/statsReducer";

const UsersView = () => {
  const dispatch = useDispatch();

  const usersStats = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return usersStats ? (
    <div>
      <table>
        <thead>
          <tr>
            <td>User name</td>
            <td>Blogs count</td>
          </tr>
        </thead>
        <tbody>
          {usersStats.map((item) => (
            <tr key={item._id}>
              <td>
                <Link to={`/users/${item._id}`}>{item.name}</Link>
              </td>
              <td>{item.blogsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default UsersView;
