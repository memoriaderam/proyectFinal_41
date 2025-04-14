
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const EditPost = () => {
  const { id } = useParams();
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    article: "",
    offers: "",
    doctor_id: "",
    image_url: "" // guarda imagen actual
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await actions.getPost();
      const currentPost = posts.find((p) => p.id === parseInt(id));
      if (currentPost) {
        setForm({
          article: currentPost.article,
          offers: currentPost.offers,
          doctor_id: currentPost.doctor_id,
          image_url: currentPost.image_url,
        });
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));  // vista previa nueva imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("article", form.article);
    dataToSend.append("offers", form.offers);
    dataToSend.append("doctor_id", form.doctor_id);
    if (imageFile) dataToSend.append("image", imageFile);

    const result = await actions.updatePost(id, dataToSend);

    if (result.success) {
      alert("✅ Post actualizado correctamente");
      navigate("/posts");
    } else {
      alert("❌ Error al actualizar post: " + result.error);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">✏️ Editar Post</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        
        {/* Campos */}
        <div className="mb-3">
          <label>Artículo</label>
          <input type="text" name="article" value={form.article} className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Ofertas</label>
          <textarea name="offers" value={form.offers} className="form-control" rows="3" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>ID Doctor</label>
          <input type="number" name="doctor_id" value={form.doctor_id} className="form-control" onChange={handleChange} required />
        </div>

        {/* Subir Imagen */}
        <div className="mb-3">
          <label>Cambiar Imagen</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Vista previa Imagen */}
        <div className="text-center mb-3">
          {previewImage ? (
            <img src={previewImage} alt="Nueva Imagen" className="img-thumbnail" style={{ maxHeight: "200px" }} />
          ) : (
            <img src={`${process.env.BACKEND_URL}/${form.image_url}`} alt="Imagen Actual" className="img-thumbnail" style={{ maxHeight: "200px" }} />
          )}
        </div>

        <button type="submit" className="btn btn-success w-100">Guardar Cambios</button>

      </form>
    </div>
  );
};

export default EditPost;