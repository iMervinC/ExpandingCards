import React, { useReducer, createContext, useContext } from "react";
import "./styles.css";
//import Panel from "./components/Panel";

const activeState = [
  {
    season: "Spring",
    active: false,
    img:
      "https://images.unsplash.com/photo-1493589976221-c2357c31ad77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    season: "Summer",
    active: false,
    img:
      "https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    season: "Fall",
    active: false,
    img:
      "https://images.unsplash.com/photo-1508255139162-e1f7b7288ab7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    season: "Winter",
    active: false,
    img:
      "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"
  }
];

const activeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return !action.payload;
    default:
      return state;
  }
};

const Context = createContext();

export default function App() {
  const [state, dispatch] = useReducer(activeReducer, activeState);

  return (
    <Context.Provider value={dispatch}>
      <div className="container">
        {state.map((item, index) => (
          <Panels
            title={item.season}
            img={item.img}
            id={index}
            stat={item.active}
          />
        ))}
      </div>
    </Context.Provider>
  );
}

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
