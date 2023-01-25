import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./food.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const Food = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get("/api/admin/foods");
      setFoods(data);
    };
    fatchFoods();
  }, [foods]);

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
          .delete(`/api/admin/foods/${id}?thumb=${thumb}`)
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Food deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="food content">
        <Title title="Foods" />
        <div className="food-items">
          <Link to="/new-food" className="btn-primary">
            Add Food
          </Link>
          <table>
            <tr>
              <th>Thumb</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </th>
              <th>Category</th>
              <th>Featured</th>
              <th>Active</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {foods.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="9">
                  No items found!
                </td>
              </tr>
            ) : (
              foods.map((item) => (
                <tr>
                  <td>
                    <img src={"/foods/" + item.thumb} alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>৳ {item.price}</td>
                  <td>{item.description.slice(0, 40)}...</td>
                  <td>
                    {item.rating}({item.totalReviews})
                  </td>
                  <td>{item.category}</td>
                  <td>{item.featured === "" ? "off" : item.featured}</td>
                  <td>{item.active === "" ? "off" : item.active}</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>
                    <Link to={"/edit-food/" + item._id} className="btn-edit">
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

export default Food;
