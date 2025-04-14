
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



const postList = () => {
    const { actions } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await actions.getPost();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const handleEdit = (postId) => {
        navigate(`/edit_post/${postId}`);
    }
    const handleDelete = async (postId) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este post?");
        if (!confirm) return;

        const result = await actions.deletePost(postId);
        if (result.success) {
            alert("✅ Post eliminado correctamente");
            // Refrescamos los posts
            const updatedPosts = await actions.getPost();
            setPosts(updatedPosts);
        } else {
            alert("❌ Error al eliminar: " + result.error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "900px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button
                    className="btn btn-success"
                    onClick={() => navigate("/create/post")}
                >
                    Crear Post
                </button>
            </div>

            <ul className="list-group">
                {posts.length === 0 ? (
                    <li className="list-group-item text-muted text-center">
                        No hay posts disponibles
                    </li>
                ) : (
                    posts.map((post) => (
                        <li key={post.id} className="list-group-item">
                            <div className="row">
                                {/* Imagen Miniatura */}
                                <div className="col-md-4 d-flex align-items-center justify-content-center">
                                    <img
                                        src={`${process.env.BACKEND_URL}/${post.image_url}`}
                                        alt={post.article}
                                        className="img-thumbnail"
                                        style={{ height: "150px", objectFit: "cover" }}
                                    />
                                </div>

                                {/* Datos del Post */}
                                <div className="col-md-8">
                                    <p className="mb-2"><strong>📰 Artículo:</strong> {post.article}</p>
                                    <p className="mb-2"><strong>💰 Ofertas:</strong> {post.offers}</p>
                                    <p className="mb-3"><strong>🩺 ID Doctor:</strong> {post.doctor_id}</p>

                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleEdit(post.id)}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};


export default postList;


