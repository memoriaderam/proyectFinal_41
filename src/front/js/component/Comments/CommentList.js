import React from "react";
import { GenericList } from "../shared/GenericList";

export const CommentList = ({ comments }) => (
    <GenericList
        items={comments}
        renderItem={(c) => `${c.author}: ${c.content}`}
    />
);
