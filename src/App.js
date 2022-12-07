import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { user } = useContext(AuthContext);

  const API_URL = "http://localhost:5005";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Return form data object as 'data'
    const data = new FormData();
    // Append the file itself, as well as upload preset and cloud name for sending to cloudinary
    data.append("file", image);
    data.append("upload_preset", "pgd5xegv");
    data.append("cloud_name", "djiekzsxs");
    // Make the request and attach the formData object with file, preset etc...
    fetch("https://api.cloudinary.com/v1_1/djiekzsxs/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => console.log(resp))
      .then((data) => {
        data && console.log(data.url);
        // from the data object, we just want the file url - this is a link to the image itself on our cloudinary page
        return data.url;
      })
      .then((img) => {
        // set the object we want to send to our backend to include the image as the return from above.

        // You don't need to do anything fancy/extra in the backend as we're now just passing the image as a url string
        const body = { title, image: img, user, description };
        axios.post(`${API_URL}/api/posts/`, body).then((response) => {
          // reset the state values, yo!
          setTitle("");
          setDescription("");
          setImage("");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* handleSubmit on form component itself */}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="file"
          // Should be first index of array

          onChange={(e) => setImage(e.target.files[0])}
        ></input>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default App;
