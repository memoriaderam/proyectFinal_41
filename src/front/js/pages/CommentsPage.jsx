import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CommentList } from "../component/Comments/CommentList";

const CommentsPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadComments();
    }, []);

    return (
        <div>
            <h2>Comentarios</h2>
            <CommentList comments={store.comments} />
        </div>
    );
};

export default CommentsPage;