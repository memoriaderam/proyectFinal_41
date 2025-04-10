
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
    doctor_id: ""
  });

  const [loading, setLoading] = useState(true);

  // Obtener el post existente
  useEffect(() => {
    const fetchPost = async () => {
      const posts = await actions.getPost();
      const currentPost = posts.find((p) => p.id === parseInt(id));
      if (currentPost) {
        setForm({
          article: currentPost.article,
          offers: currentPost.offers,
          doctor_id: currentPost.doctor_id
        });
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actions.updatePost(id, form);
    if (result.success) {
      alert("Post actualizado correctamente");
      navigate("/posts");
    } else {
      alert("Error al actualizar post: " + result.error);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">✏️ Editar Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Artículo</label>
          <input
            type="text"
            name="article"
            className="form-control"
            value={form.article}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ofertas</label>
          <input
            type="text"
            name="offers"
            className="form-control"
            value={form.offers}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ID Doctor</label>
          <input
            type="number"
            name="doctor_id"
            className="form-control"
            value={form.doctor_id}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditPost;








