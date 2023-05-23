import ArrowIcon from "./../assets/icons/arrow-right.png";

function TakePartPage() {
  return (
    <div className="body-container">
      <h1>Take part</h1>
      <br />
      <div className="home-container">
        <div className="col-sm-12 col-md-8 col-lg-6">
          <p className="justify-text">
            At Boreas Gallery, we are passionate about providing a platform for
            emerging photographers and artists to shine. We believe in the
            transformative power of art and the importance of supporting
            creativity in all its forms. If you are an amateur photographer
            looking to gain exposure and share your unique vision with the
            world, we invite you to take part in our esteemed gallery.
          </p>
          <br />
          <p className="justify-text">
            We welcome submissions from talented photographers like you. By
            sharing your work with us, you have the opportunity to be featured
            on our website and reach a wider audience. We value diversity,
            innovation, and the exploration of different artistic styles, so
            whether you specialize in landscapes, portraits, conceptual
            photography, or any other genre, we encourage you to submit your
            best creations.
          </p>
          <br />
          <p className="justify-text">
            Boreas Gallery is committed to providing a supportive space for all
            emerging photographers and artists. We believe in nurturing talent
            and creating avenues for growth. When you submit your work to us,
            you become part of our vibrant community, where your creativity is
            celebrated, and your unique voice is heard. We aim to showcase the
            breadth of talent that exists within the amateur photography
            community, allowing your artistry to be discovered and appreciated.
          </p>
          <br />
          <p className="justify-text">
            To take part in this exciting opportunity, simply send an email and
            attach your best work according to the submission guidelines
            outlined on our website. Our team carefully reviews each submission,
            considering its artistic merit, creativity, and alignment with our
            gallery's aesthetic. If selected, your work will be prominently
            featured on our website, allowing you to connect with fellow artists
            and enthusiasts, and potentially opening doors to further
            recognition and future opportunities.
          </p>
          <br />
          <a
            href="mailto:takepart@boreasgallery.com?subject=Take%20Part%20Request"
            className="link-normal"
          >
            <p className="link-black">
              Reach out to us{" "}
              <img src={ArrowIcon} alt="arrow right" height={11} />
            </p>
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default TakePartPage;
