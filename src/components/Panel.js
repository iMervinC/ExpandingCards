import React, { useContext } from "react";
import { Context } from "../App";

const Panels = ({ img, title, stat, id }) => {
  const dispatch = useContext(Context);

  return (
    <div
      key={id}
      onClick={() => dispatch({ type: "TOGGLE", payload: stat })}
      className={stat ? "panel active" : "panel"}
      style={{ backgroundImage: `url(${img})` }}
    >
      <h3>{title}</h3>
    </div>
  );
};

export default Panels;
