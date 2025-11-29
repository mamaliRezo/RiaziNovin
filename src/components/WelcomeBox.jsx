import ProfileAvatar from "../assets/ProfileAvatar.svg"
export default function WelcomeBox() {
  return (
    <div>
      {/* آواتار */}
      <img
        src={ProfileAvatar}
        style={{
          width: "57px",
          height: "60px",
          position: "absolute",
          top: "85px",
          left: "323px",
          borderRadius: "50%",
        }}
      />

      {/* متن خوش آمد */}
      <p
        style={{
          width: "129px",
          height: "36px",
          position: "absolute",
          top: "93px",
          left: "178px",
          fontFamily: "Poppins, IRANYekan",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: "100%",
          textAlign: "right"
        }}
      >
        سلام محمد<br/>
        خوش اومدی
      </p>
    </div>
  );
}
