import React, { useEffect, useState, useContext, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import "./styles.css";
import app from "../firebase";
import { CurrentChatContext } from "./App";
import loadimg from "./img/loading.webp";

function OpenConversation() {
  const messageRef = useRef();
  const [chatData, setChatData] = useState({});
  const { currentUser } = useAuth();
  const history = useHistory();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  function handleSubmit(e) {
    e.preventDefault();
    chatData["messages"].push({
      from: currentUser.email,
      time: Date.now(),
      text: messageRef.current.value,
    });
    //append child
    const chatDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'my-1';
    messageDiv.className = 'd-flex';
    messageDiv.className = 'flex-column';
    messageDiv.className = 'align-self-end';
    messageDiv.className = 'align-items-end';
    const textDiv = document.createElement('div');
    textDiv.className = 'rounded';
    textDiv.className = 'px-2';
    textDiv.className = 'py-1';
    textDiv.className = 'bg-primary';
    textDiv.className = 'text-white';
    textDiv.textContent = messageRef.current.value;
    messageDiv.appendChild(textDiv);
    chatDiv.appendChild(messageDiv);

    messageRef.current.value = "";
    console.log(chatData);
  }

  useEffect(() => {
    async function getChats() {
      if (!currentUser) {
        history.push("/login");
      }
      console.log(currentChat);
      if (currentChat === "") {
        return;
      }
      const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ chatId: currentChat }),
      };
      let res = await fetch(
        "http://localhost:5000/getChatById",
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      setChatData(res["chats"]);
      // chatData['messages'].map(message =>{
      //
      // })
      console.log(chatData);
    }
    getChats();
  }, [currentChat]);

  if (chatData["messages"]) {
    return (
      <>
        <div className="contacthead">
          {chatData["doctorEmail"] === currentUser.email
            ? chatData["patientUsername"]
            : chatData["doctorUsername"]}
          <hr />
        </div>
        <div
          className="d-flex flex-column flex-grow-1 chatbg "
          style={{ maxHeight: "460px", marginTop: "-1.7%" }}
        >
          <div className="flex-grow-1 overflow-auto" id="chatMessages">
            <br />

            {chatData["messages"].map((message) => (
              <>
                <div
                  className={`my-1 d-flex flex-column ${
                    currentUser.email === message["from"]
                      ? "align-self-end align-items-end"
                      : "align-items-start"
                  }`}
                >
                  <div
                    className={`rounded px-2 py-1 ${
                      currentUser.email === message["from"]
                        ? "bg-primary text-white"
                        : "bg-light"
                    }`}
                  >
                    {message["text"]}
                  </div>
                  <div
                    className={`text-muted small ${
                      currentUser.email === message["from"] ? "text-right" : ""
                    }`}
                  >
                    {message["time"]}
                  </div>
                </div>
              </>
            ))}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="m-2">
              <InputGroup style={{ height: "40px" }}>
                <Form.Control
                  as="textarea"
                  ref={messageRef}
                  required
                  placeholder="Type your message here..."
                  style={{ height: "40px", resize: "none" }}
                />
                <InputGroup.Append>
                  <Button type="submit">
                    <AiOutlineSend style={{ marginTop: "-3px" }} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center   p-5"
          style={{ marginTop: "5%", backgroundColor: "white !important" }}
        >
          <img src={loadimg} />
        </div>
      </>
    );
  }
}

export default OpenConversation;
