import { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./PostsPage.module.css";
import { getPostsThunk } from "../../store/slices/postsSlice";
import { getUsersThunk } from "../../store/slices/usersSlice";

// export const PostsPage = ({ posts, isFetching, error, get }) => {
// export const PostsPage = ({ posts, isFetching, error, getPosts, getUsers }) => {
export const PostsPage = ({
  postsList: { posts, isFetching, error },
  usersList: { users, normalizedUsers },
  getPosts,
  getUsers,
}) => {
  useEffect(() => {
    // get();
    getPosts();
    getUsers();
  }, []);

  // const mapPosts = (p) => (
  //   <li className={styles.postItem} key={p.id}>
  //     <article>
  //       <h2>{p.title}</h2>
  //       <p>{p.body}</p>
  //       {/* <p>Author: {p.userId}</p> */}
  //       <p>Author: {users.find((u) => u.id === p.userId)?.name || "Unknown"}</p>
  //     </article>
  //   </li>
  // );
  const mapPosts = (p) => {
    const postAuthor = normalizedUsers[p.userId]?.name || "Unknown";

    return (
      <li className={styles.postItem} key={p.id}>
        <article>
          <h2>{p.title}</h2>
          <p>{p.body}</p>
          <p>Author: {postAuthor}</p>
        </article>
      </li>
    );
  };
  // users.id === p.userId

  return (
    <div>
      <h1>Posts</h1>
      {error && <div>Error!!!</div>}
      {isFetching && <div>Loading...</div>}
      {!error && !isFetching && <ul>{posts.map(mapPosts)}</ul>}
    </div>
  );
};

// const mapStateToProps = ({ postsList }) => postsList;
const mapStateToProps = ({ postsList, usersList }) => ({
  postsList,
  usersList,
});

const mapDispatchToProps = (dispatch) => ({
  // get: () => dispatch(getPostsThunk()),
  getPosts: () => dispatch(getPostsThunk()),
  getUsers: () => dispatch(getUsersThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
