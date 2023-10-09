import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination1 from "./Pagination1";
import axios from "axios";
import Posts from "./Posts";

function SearchParent({ storeData }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  // setPosts(storeData)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      // const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      // setPosts(res.data);

      try {
        const response = await axios.post(
          "http://WINDOWS-IKRB92T:2000/search/search-data",
          // localhost
          // WINDOWS-IKRB92T
          storeData
        );
        console.log('complete response',response);
        console.log(response.data);

        const dataArr = await Object.values(response.data)[2];
        console.log(dataArr);

          setPosts(dataArr)

      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [storeData]);

  if (loading && posts.length === 0) {
    return <h2>Loading...</h2>;
  }

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <Posts posts={posts} />
      <Pagination1 pages={howManyPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default SearchParent;
