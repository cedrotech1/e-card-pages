import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Menu from "../../components/MenuDeskTop";
import Menu2 from "../../components/MenuMobile";
import LoadingSpinner from '../../components/loading';

const Dashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const ID = parsedUser.id;

      const fetchCards = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/pending`, {
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

  const handleDeleteCard = async (e, cardId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm('Are you sure you want to activate this card?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/activate/${cardId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
        toast.success('Card activated successfully');
      } else {
        console.error('Failed to activated card:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error activated card:', error);
      toast.error('Error activated card');
    }
  };

  const filteredCards = cards.filter(card =>
    card.cardUser.firstname.toLowerCase().includes(filter.toLowerCase()) ||
    card.cardUser.lastname.toLowerCase().includes(filter.toLowerCase()) ||
    card.cardUser.email.toLowerCase().includes(filter.toLowerCase()) ||
    card.cardUser.phone.includes(filter) ||
    card.cardUser.address.toLowerCase().includes(filter.toLowerCase())
  );
  

  return (
    <body className='mybody'>
      <div className="dashboard" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="container-fluid">
          <div className="row">
            <div className={`col-md-3 d-none d-md-block ${show ? 'sidebar-shift' : ''}`}>
              <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Menu2 />
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 allcontent">
              <div className="row">
                {!show && (
                  <div className="col-md-2 d-none d-md-block d-md-blockx">
                    <Menu />
                  </div>
                )}
                <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>
                  <section id="team" className="team">
                    <div className="container" data-aos="fade-up" style={{ marginLeft: '-0.2cm' }}>
                      <div className="row">
                        <div className="col-12 d-md-none">
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>
                      </div>
                    </div>
                  </section>
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
                    <>
                      <section id="team" className="team" style={{ marginTop: '-4cm' }}>
                        <div className="container" data-aos="fade-up">
                          <div className="row" style={{ marginBottom: '0.5cm' }}>
                            <div className="col-xl-12 col-md-12" style={{ padding: '0.4cm' }}>
                              <input
                                placeholder='Filter customers...'
                                variant=""
                                onChange={(e) => setFilter(e.target.value)}
                                style={{
                                  backgroundColor: 'white',
                                  borderRadius: '6px',
                                  fontFamily: 'monospace',
                                  padding: '0.2cm',
                                  marginTop: '1.4cm',
                                  marginBottom: '0.5cm',
                                  outline: 'none',
                                  height: 'auto',
                                  width: '100%',
                                  border: '0px',
                                }}
                              />
                            </div>
                            {/* <div className="col-xl-6 col-md-6"></div> */}
                          </div>
                          <div className="row gy-4">
                            {filteredCards.length > 0 ? (
                              filteredCards.map((card) => (
                                <div onClick={() => handleView(card.id)} key={card.id} className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * card.id} style={{ padding: '' }}>
                                  <div className="member col-xl-12" style={{ padding: "0.4cm" }}>
                                    <img src='/assets/img/card.png' className="img-fluid" alt="" style={{ height: 'auto', padding: '0px', width: '100%', borderRadius: '7px' }} />
                                    {card.cardUser && (
                                      <>
                                        <div>
                                          <strong>Restaurant:</strong> {card.categories?.resto?.name || 'N/A'}<br />
                                          <strong>Card category:</strong> {card.categories?.name || 'N/A'}<br />
                                          <strong>Card price:</strong> {card.categories?.price || 'N/A'} Rwf<br />
                                          <strong>Duration:</strong> {card.times || 'N/A'} times<br />
                                          <strong>Date:</strong> {new Date(card.createdAt).toLocaleDateString() || 'N/A'}
                                        </div>

                                        <button onClick={(e) => handleDeleteCard(e, card.id)} style={{ marginTop: '10px', backgroundColor: 'lightgreen', color: 'white', width: '70%', borderRadius: '5px', border: '0px', padding: '5px 10px' }}>Activate Card</button>
                                      </>
                                    )}
                                 <p style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '13px', backgroundColor: 'whitesmoke', padding: '0.4cm', marginTop: '20px', borderRadius: '6px' }}>
                                  <BiMap style={{ color: 'black' }} />&nbsp;&nbsp;{card.cardUser.address || 'N/A'} <br />
                                  <BiEnvelope style={{ color: 'black' }} />&nbsp;&nbsp;{card.cardUser.email} <br />
                                  <BiPhone />&nbsp;&nbsp;{card.cardUser.phone}
                                </p>

                                  </div>
                                </div>
                              ))
                            ) : (
                              <p style={{ textAlign: 'center', padding: '2cm' }}>No cards available.</p>
                            )}
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ToastContainer />
    </body>
  );
};

export default Dashboard;
