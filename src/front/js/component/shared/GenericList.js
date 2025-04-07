import React from "react";

export const GenericList = ({ items, renderItem, onDelete }) => (
    <ul>
        {items.map((item) => (
            <li key={item.id || item.identity_number}>
                {renderItem(item)}
                {onDelete && (
                    <button onClick={() => onDelete(item.id || item.identity_number)}>
                        🗑
                    </button>
                )}
            </li>
        ))}
    </ul>
);