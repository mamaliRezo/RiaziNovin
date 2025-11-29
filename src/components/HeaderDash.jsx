import LogoRiaziNovin from "../assets/LogoRiaziNovin.svg"
import Bell from "../assets/Bell.svg"
export default function HeaderDash() {
  return (
    <div className="absolute w-full" style={{ top: "0px" }}>

      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        style={{
          width: "125px",
          height: "70px",
          position: "absolute",
          top: "4px",
          left: "147px",
        }}
      />

      {/* آیکون زنگوله */}
      <img
        src={Bell}
        style={{
          width: "32px",
          height: "36px",
          position: "absolute",
          top: "17px",
          left: "336px",
        }}
      />
    </div>
  );
}
