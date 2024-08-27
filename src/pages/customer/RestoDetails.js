import React, { useEffect, useState } from 'react';
import '../../css/main2.css';
import Menu from "../../components/customerM";
import Footer from "../../components/footer";
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [RestaurantCategories, setRestaurantCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/categories/one/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          const cat = data.data
          setRestaurantCategories([cat]);
          console.log(cat);
        } else {
          console.error('Restaurant not found with ID:', id);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRequestCard = async (categoryId) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: categoryId
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        toast.success('Card requested successfully');
      } else {
        console.error('Failed to request card:', data.message);
        toast.error('Failed to request card');
      }
    } catch (error) {
      console.error('Error requesting card:', error);
      toast.error('Error requesting card');
    }
  };
  
  

  return (
    <>
      <Menu />

      {loading ? <> <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6cm', // Use 100% of the viewport height
      }}>
        <div>
          <LoadingSpinner />
        </div>
      </div></> : <>
        {Array.isArray(RestaurantCategories) && RestaurantCategories.length > 0 ? (

          <section id="team" className="team" style={{ marginTop: '1cm' }}>
            <div className="container" data-aos="fade-up">
              {RestaurantCategories.map((category, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={100 * index}>
                  <div className="row member" style={{ padding: "0.3cm" }}>
                    <div className="col-xl-6 col-md-6 d-flex">
                      {category.image !== null && category.image !== 'null' ? (
                        <img src={category.image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '9cm' }} />
                      ) : (
                        <img src='/assets/img/images (4).jpeg' className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '100%' }} />
                      )}
                    </div>
                    <div className="col-xl-4 col-md-5" style={{ padding: '0.4cm' }}><br/> <br/>
                      <h3 style={{ textAlign: 'justify' }}>category name: {category.name}</h3>
                      <p style={{ textAlign: 'justify', marginTop: '' }}>{category.description}</p>
                      <p style={{ fontFamily: 'monospace', marginTop: '-0.5cm', textAlign: 'justify', fontSize: '20px' }}>
                        Price: {category.price} <br/> <br/>
                        <button onClick={() => handleRequestCard(category.id)} style={{ marginTop: '10px', backgroundColor: 'lightgreen',border:'0px', color: 'black', borderRadius: '5px', padding: '5px 10px' }}>Request this card</button>
                      </p>

                
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section id="hero" className="hero" style={{ height: '90vh' }}>
            <div className="container position-relative">
              <div className="row gy-5" data-aos="fade-in">
                <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '4cm', fontFamily: 'monospace' }}>
                  <h2 className='welcame' style={{ fontSize: '45px', marginBottom: '0cm', marginTop: '-5cm', fontFamily: 'monospace' }}>
                    404
                  </h2>
                  <p style={{ marginBottom: '1cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace', textAlign: 'justfy' }}>
                    there is no registered category  yet ! <br />
                    sorry !!
                  </p>
                </div>
                <div className="col-lg-6 order-1 order-lg-2" style={{ marginTop: 'cm', fontFamily: 'monospace', color: 'white' }}>
                  <img src="/assets/img/Oops! 404 Error with a broken robot-amico.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />
                </div>
              </div>
            </div>
          </section>
        )}
      </>}

      <Footer />
      <ToastContainer />
      <script src="assets/js/main.js"></script>
    </>
  );
};

export default LandingPage;
