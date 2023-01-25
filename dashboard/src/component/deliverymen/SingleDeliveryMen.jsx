import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./deliverymen.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";

const SingleDeliveryMen = () => {
  // GET DELIVERY MEN DETAILS
  const { id } = useParams();
  const [deliveryMen, setDeliveryMne] = useState({});
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fatchDeliveryMen = async () => {
      const { data } = await axios.get(`/api/admin/delivery-men/${id}`);
      setDeliveryMne(data);
      setReviews(data.reviews);
    };
    fatchDeliveryMen();
  }, [deliveryMen]);

  // GET ORDERS
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("/api/admin/orders");
      const fatchOrders = data.filter((curData) => {
        return curData.delivery_man_id === id;
      });
      setOrders(fatchOrders);
    };
    fatchOrders();
  }, [orders]);

  // DELIVERY MAN DELETE
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
          .delete(`/api/admin/delivery-men/${id}?thumb=${thumb}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Man deleted successfull.",
              showConfirmButton: false,
              timer: 500,
            });
            window.location.href = "/delivery-men";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Man deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="single-customer content">
        <Title title="Delivery Man Profile" />
        <div className="profile-items">
          <div className="left">
            <img
              src={"/delivery-men/" + deliveryMen.thumb}
              alt={deliveryMen.name}
            />
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>Name: </b> {deliveryMen.name}
                </li>
                <li class="list-group-item">
                  <b>Rating: </b> <Rating rating={deliveryMen.rating} /> (
                  {deliveryMen.totalReviews})
                </li>
                <li class="list-group-item">
                  <b>Email: </b> {deliveryMen.email}
                </li>
                <li class="list-group-item">
                  <b>Joining Date: </b>{" "}
                  {deliveryMen.date && moment(deliveryMen.date).format("lll")}
                </li>
                <li class="list-group-item">
                  <b>Address: </b> {deliveryMen.address}
                </li>
              </ul>
            </div>
            <Link className="btn-primary" to="/delivery-men">
              BACK
            </Link>{" "}
            <Link
              onClick={() => deleteHandler(deliveryMen._id, deliveryMen.thumb)}
              className="btn-delete"
            >
              DELETE
            </Link>
          </div>
          <div className="right">
            <table>
              <tr>
                <th>Order_id</th>
                <th>Order_date</th>
                <th>Order_status</th>
                <th>Action</th>
              </tr>
              {orders.length === 0 ? (
                <tr>
                  <td className="text-center" colSpan="10">
                    No items found!
                  </td>
                </tr>
              ) : (
                orders.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={"/orders/" + item._id}>{item._id}</Link>
                    </td>
                    <td>{moment(item.order_date).format("lll")}</td>
                    <td>
                      <span
                        className={
                          (item.status === "Ordered" && "btn-order") ||
                          (item.status === "OnDelivery" && "btn-on-delv") ||
                          (item.status === "Cancelled" && "btn-cncl") ||
                          (item.status === "Delivered" && "btn-delv")
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <Link to={"/orders/" + item._id} className="btn-success">
                        <i class="ri-eye-fill"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </table>
          </div>
        </div>
        <div className="reviews">
          <h4 className="text-center">Reviews</h4>
          <div className="grid-4">
            {reviews.length === 0 ? (
              <div className="review-item">
                <p>No feedback has been given yet.</p>
              </div>
            ) : (
              reviews
                .slice(0, 12)
                .reverse()
                .map((item, index) => (
                  <div key={index} className="review-item">
                    <div className="grid-2">
                      <p className="name bold">{item.name}</p>
                      <Rating rating={item.rating} />
                    </div>
                    <p className="date">
                      {item.date && moment(item.date).format("lll")}
                    </p>
                    <p className="review-content">{item.comment}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleDeliveryMen;
