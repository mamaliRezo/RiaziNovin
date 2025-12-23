import LogoRiaziNovin from "../../assets/LogoRiaziNovin.svg";
import Bell from "../../assets/Bell.svg";
import cart from "../../assets/cart.svg";
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

      {/* آیکون سبدخرید */}
      <img
        src={cart}
        style={{
          width: "27.33px",
          height: "21.29px",
          position: "absolute",
          top: "29px",
          left: "47px",
        }}
      />
    </div>
  );
}
