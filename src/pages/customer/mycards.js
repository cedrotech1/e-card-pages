import React, { useEffect, useState } from 'react';
import '../../css/main2.css';
import LoadingSpinner from '../../components/loading'; 
import Menu from '../../components/customerM';
import Footer from '../../components/footer';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; 
import { useNavigate, useParams } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const ID = parsedUser.id;

      const fetchCards = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/mycard/${ID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setCards(data.Cardses || []);
          } else {
            console.error('Failed to fetch Cards:', data.message);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching Cards:', error);
          setLoading(false);
        }
      };
      fetchCards();
    } else {
      console.error('User information not found in local storage');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/restaurent/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setRestaurants(data.data || []);
        } else {
          console.error('Failed to fetch restaurants:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [token]);

  const handleView = (id) => {
    navigate(`../history/${id}`);
  };

  return (
    <>
      <Menu />
      <section id="hero" className="hero" style={{marginTop:'2cm',height:''}}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
              <h5 style={{ fontSize: '35px', fontStyle: 'bold'}}>
                <b>LIST OF  <span className='apart' style={{color:'#f38a7a'}}>MY CARDS</span> </b>
              </h5>
            </div>
            <div className="col-lg-6 order-1 order-lg-2"></div>
          </div>
        </div>
      </section>

{cards.length > 0 ? (<>
  <section id="team" className="team" style={{marginTop:'-1.5cm'}}>
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            {loading ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3cm',
              }}>
                <LoadingSpinner />
              </div>
            ) : (
              cards.length > 0 ? (
                cards.map((card) => (
                  <div onClick={() => handleView(card.id)} key={card.id} className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * card.id} style={{ padding: '' }}>
                    <div className="member col-xl-12" style={{padding:"0.4cm"}}>
                      <img src='/assets/img/card7.png' className="img-fluid" alt="" style={{ height: 'auto', padding: '0px', width: '100%', borderRadius: '7px' }} />
                      {card.cardUser && (
                        <div>
                          <strong>Restaurant:</strong> {card.categories?.resto?.name || 'N/A'}<br />
                          <strong>Card category:</strong> {card.categories?.name || 'N/A'}<br />
                          <strong>Duration:</strong> {card.times || 'N/A'} times remain<br />
                          <strong>Date:</strong> {new Date(card.createdAt).toLocaleDateString() || 'N/A'}
                        </div>
                      )}
                      <p style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '13px', backgroundColor: '#faead1', padding: '0.4cm', marginTop: '20px', borderRadius: '6px' }}>
                        <BiMap style={{ color: 'black' }} />&nbsp;&nbsp;{card.address || 'N/A'} <br />
                        <BiEnvelope style={{ color: 'black' }} />&nbsp;&nbsp;obina@gmail.com <br />
                        <BiPhone />&nbsp;&nbsp;07854635367
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                </>
                // <p style={{ textAlign: 'center', padding: '2cm' }}>No cards available.</p>
              )
            )}
          </div>
        </div>
      </section>

</>)
:(<>

<center>
   {/* <p style={{ textAlign: 'center', padding: '0.1cm' }}>No cards available.</p> */}
  <img src='/assets/img/no.jpg' className="img-fluid" alt="" style={{ height: 'auto', padding: '0px', width: '50%', borderRadius: '7px' }} />
</center>
</>)}
  

   
      <Footer />
    </>
  );
};

export default LandingPage;
