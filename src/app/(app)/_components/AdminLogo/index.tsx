import Image from "next/image";
import "./styles.css";

export const AdminLogo = () => {
  return (
    <div className="logo-wrapper">
      <Image src="/logo_wit_lichten_groot.png" alt="Titaan" fill />
    </div>
  );
};
