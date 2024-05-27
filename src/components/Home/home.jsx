import Leftbar from "../leftbar/leftbar";
import SimpleAlert from "../simplealert/simplealert";
import "./home.css";

export default function Home() {
  return (
    <>
      <Leftbar />
      <IsToast />
    </>
  );
}

function IsToast() {
  if (localStorage.getItem("isFirstReg") === "true") {
    localStorage.setItem("isFirstReg", "false");
    return <SimpleAlert text={`Успешная регистрация!`} alertStatus={`success`} />;
  }
  return null;
}
