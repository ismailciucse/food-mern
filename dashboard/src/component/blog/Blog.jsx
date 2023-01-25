import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./blog.css";
import Swal from "sweetalert2";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fatchBlogs = async () => {
      const { data } = await axios.get("/api/admin/blogs");
      setBlogs(data);
    };
    fatchBlogs();
  }, [blogs]);

  const deleteHandler = (id, thumb) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/blogs/${id}?thumb=${thumb}`)
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Blog deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="blog content">
        <Title title="Blogs" />
        <div className="blog-items">
          <Link to="/new-blog" className="btn-primary">
            Add Blog
          </Link>
          <table>
            <tr>
              <th>Thumb</th>
              <th>Title</th>
              <th>Description</th>
              <th>Featured</th>
              <th>Date</th>
              <th>Post_By</th>
              <th>Action</th>
            </tr>
            {blogs.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="9">
                  No items found!
                </td>
              </tr>
            ) : (
              blogs.map((item) => (
                <tr>
                  <td>
                    <img src={"/blogs/" + item.thumb} alt="" />
                  </td>
                  <td>{item.title.slice(0, 50)}...</td>
                  <td>{item.description.slice(0, 35)}...</td>
                  <td>{item.featured === "" ? "off" : item.featured}</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>{item.post_by}</td>
                  <td>
                    <Link to={"/edit-blog/" + item._id} className="btn-edit">
                      <i class="ri-edit-box-fill"></i>
                    </Link>{" "}
                    <Link
                      onClick={() => deleteHandler(item._id, item.thumb)}
                      className="btn-delete"
                    >
                      <i class="ri-delete-bin-5-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </table>
        </div>
      </section>
    </>
  );
};

export default Blog;
