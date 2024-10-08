import React, { useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import Toast from "./Toast";

const CreateTravels = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axiosInstance.post("/createTravel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        setMessage("Successfully created travel!");
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
      }
    } catch (error: any) {
      console.log(
        "Error while creating travel:",
        error.response ? error.response.data : error.message
      );
      setMessage("Failed to create. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Create Travel
        </h2>
        {message && <Toast message={message} onClose={() => setMessage("")} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <div className="flex justify-center items-center gap-2">
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
              ₮
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Creating Travel..." : "Create Travel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTravels;
