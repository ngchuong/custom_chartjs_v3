const LegendCustom = ({ idBtn, idLabel, handleClick }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleClick}>
      <button id={idBtn}></button>
      <span id={idLabel}></span>
    </div>
  );
};

export default LegendCustom;
