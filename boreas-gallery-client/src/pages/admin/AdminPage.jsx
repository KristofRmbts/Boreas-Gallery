// import { Link } from "react-router-dom";
import AddItem from "../../components/AddItem";
import AddExhibition from "../../components/AddExhibition";

function AdminPage() {

    return (
      <div className="body-container">
        <h1>Admin portal</h1>
        <br />
        <AddItem />
        <br /><br />
        <AddExhibition />
        <br /><br />
      </div>
    );
  }
   
  export default AdminPage;