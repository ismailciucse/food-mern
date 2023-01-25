import Cookies from "js-cookie";
import "./App.css";
import LayOut from "./component/common/layout/LayOut";

function App() {
  return (
    <>
      {Cookies.get("admin") ? (
        <LayOut />
      ) : (
        (window.location.href = "http://localhost:3000/admin")(
          <h3>Authintication required</h3>
        )
      )}
    </>
  );
}

export default App;
