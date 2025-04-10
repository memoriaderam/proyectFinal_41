
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {
  const { actions } = useContext(Context);

  const [formData, setFormData] = useState({
    offers: "",
    article: "",
    doctor_id: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("offers", formData.offers);
    dataToSend.append("article", formData.article);
    dataToSend.append("doctor_id", formData.doctor_id);
    if (imageFile) dataToSend.append("image", imageFile);

    const result = await actions.createPost(dataToSend);

    if (result.success) {
      toast.success("Post creado con éxito", {

        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       
      });
    handleCancel();

    } else {
      toast.error("Error: " + result.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCancel = () => {
    setFormData({ offers: "", article: "", doctor_id: "" });
    setImageFile(null);
    setPreviewImage(null);
    document.getElementById("imageInput").value = "";
    
  };

return (
  <div className="container mt-5">

    <h2 className="mb-4">Crear Post</h2>

    <div className="card p-4 shadow-sm">
      <div className="row">

        {/* Campos */}
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Oferta</label>
              <textarea
                name="offers"
                className="form-control"
                value={formData.offers}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Artículo</label>
              <input
                type="text"
                name="article"
                className="form-control"
                value={formData.article}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Doctor ID</label>
              <input
                type="number"
                name="doctor_id"
                className="form-control"
                value={formData.doctor_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input
                type="file"
                name="image"
                id="imageInput"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary w-50">
                Crear
              </button>
              <button type="button" className="btn btn-secondary w-50" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>

        </div>

        {/* Vista previa */}
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="img-fluid rounded" />
          ) : (
            <p className="text-muted">Vista previa de imagen</p>
          )}
        </div>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={2000} />
  </div>
);
};

export default Post;