import React, { Component } from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className="list-group-item"
          onClick={() => onItemSelect({ item })}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
