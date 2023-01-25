import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./message.css";
import Swal from "sweetalert2";

const Message = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fatchMessages = async () => {
      const { data } = await axios.get("/api/admin/messages");
      setMessages(data);
    };
    fatchMessages();
  }, [messages]);

  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/admin/messages/${id}`).catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Message deleted field!",
          });
        });
      }
    });
  };

  const viewHandler = (id) => {
    axios
      .put(`/api/admin/messages/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        window.location.href = `http://localhost:2000/message/view/${id}`;
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Food update field!",
        });
      });
  };

  return (
    <div>
      <section className="message content">
        <Title title="Messages" />
        <div className="message-items">
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {messages.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="7">
                  No items found!
                </td>
              </tr>
            ) : (
              messages.map((item, index) => (
                <tr key={index} className={item.read === "No" && "text-bold"}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.subject.slice(0, 20)}...</td>
                  <td>{item.phone}</td>
                  <td>{item.message.slice(0, 20)}...</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>
                    <Link
                      onClick={() => viewHandler(item._id)}
                      className="btn-success"
                    >
                      <i class="ri-eye-fill"></i>
                    </Link>{" "}
                    <Link
                      onClick={() => deleteHandler(item._id)}
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
    </div>
  );
};

export default Message;
