import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main2.css';
import Menu from '../../components/menu';
import Footer from '../../components/footer';

const styles = {
  hero: {
    height: '65vh', // Default height for medium to large devices
    marginTop: '2.3cm',
  },
  heading: {
    fontFamily: 'monospace',
    // padding:'1cm'
  },
  paragraph: {
    marginBottom: '1cm',
    marginTop: '0cm',
    fontStyle: 'italic',
    fontFamily: 'cursive',
    textAlign: 'justify',
  },
  buttonContainer: {
    marginTop: '1cm',
  },
  getStartedButton: {
    backgroundColor: '',
    borderRadius: '6px',
    fontFamily: 'monospace',
  },
  restaurantButton: {},
  footer: {
    marginTop: '-0cm',
    fontFamily: 'monospace',
  },
};

// Custom hook to adjust hero height based on screen size
const useResponsiveHeroHeight = () => {
  const [heroHeight, setHeroHeight] = React.useState('65vh');
  const [heroPadingTOP, setPadingTOP] = React.useState('');

  React.useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        setHeroHeight('100vh'); // Smaller height for mobile devices
      } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
        setHeroHeight('75vh'); // Medium height for tablets
        setPadingTOP('1cm');
      } else {
        setHeroHeight('65vh'); // Default height for larger screens
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return heroHeight;
};

const LandingPage = () => {
  const heroHeight = useResponsiveHeroHeight();
  const heroPaddingTOP = useResponsiveHeroHeight(); // Change this line to use the correct hook value

  return (
    <>
      <Menu />

      <section id="hero" className="hero herohome" style={{ ...styles.hero, height: heroHeight, }}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 headx order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={styles.heading}>
              <h2 className="welcame" style={{ fontSize: '35px', fontFamily: 'cursive' }}>
                Welcome to E-CARD restaurant system
              </h2>
              <p style={styles.paragraph}>
                Welcome to our innovative dining experience! Securely enjoy meals with your personalized card. Our automated system ensures convenience and effortless reporting. Bon appétit!
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start" style={styles.buttonContainer}>
                <a href="register" className="btn-get-started" style={styles.getStartedButton}>
                  Get Started
                </a>
                <a href="restoAdmin" className="restaurent" style={styles.restaurantButton}>
                  Restaurant
                </a>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2" style={{ marginTop: '-1cm', fontFamily: 'monospace', color: 'white' }}>
              <img src="assets/img/breakfast from bed-pana.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />
            </div>
          </div>
        </div>
      </section>
      <br />
      <div style={styles.footer}>
        <Footer />
      </div>

      <a href="#" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <script src="assets/js/main.js"></script>
    </>
  );
};



export default LandingPage;
