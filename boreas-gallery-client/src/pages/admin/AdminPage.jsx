// import { Link } from "react-router-dom";
import AddItem from "../../components/AddItem";

function AdminPage() {

    return (
      <div className="body-container">
        <h1>Admin portal</h1>
        <br />
          <AddItem />
        <br /><br />
      </div>
    );
  }
   
  export default AdminPage;