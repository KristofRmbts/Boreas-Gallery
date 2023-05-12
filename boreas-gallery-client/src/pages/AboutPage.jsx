import BB1 from '../assets/images/BB1.png'

function AboutPage() {
    return (
      <div className="body-container">
        <div className="item-container">
          <div className="item-container-left">
            <h2>About us</h2>
            <p className="text-s justify-text">Boreas Gallery is an esteemed online art gallery that provides a distinguished platform for amateur photographers to exhibit their work. Our dedicated mission is to offer a stepping stone to aspiring artists, enabling them to gain recognition and create potential pathways to future opportunities in the world of photography.</p>
          </div>
          <div className="item-container-right">
            <br />
            <img src={BB1} alt="BB Img" width={500} />
          </div>
        </div>
      </div>
    );
  }
   
  export default AboutPage;