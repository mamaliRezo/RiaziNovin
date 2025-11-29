export default function Card({ img, title }) {
  return (
    <div
      style={{
        height: "130px",
        background: "#C90BBC",
        borderRadius: "20px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "15px",
      }}
    >
      <img src={img} style={{ width: "60px", marginBottom: "10px" }} />
      <p style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
        {title}
      </p>
    </div>
  );
}
