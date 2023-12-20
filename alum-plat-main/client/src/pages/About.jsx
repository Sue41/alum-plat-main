import NavBar from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";


export default function About(){
    return(
        <>
            <NavBar/>
            <div className='dash-body'>
                <h1>About Us</h1>
                <div>We help Alumni connect with your fellow graduates.</div>


                <div className='main-detail'>
                    <div className='about-section'>
                        <div className='abt-txt'>
                            <h2 className='abt-head'>Our Mission</h2>
                            <div className='abt-body'>Discover Alumni events and connect with your fellow graduates, </div>
                            <p>Our mission is to foster a vibrant and interconnected <br />community of alumni who share a common commitment to excellence, <br />lifelong learning, and positive impact. We strive to <br />create opportunities for networking, mentorship, and collaboration,<br /> empowering our alumni to thrive in their professional and personal endeavors.</p>
                        </div>
                        <div className='abt-image'>
                            <img src='https://plus.unsplash.com/premium_photo-1661281279098-69b9445baa01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyb3xlbnwwfHwwfHx8MA%3D%3D' alt='Missing' className='abt-image'/>
                        </div>

                    </div>

                    <div className='about-section'>
                        <div className='abt-image'>
                            <img src='https://plus.unsplash.com/premium_photo-1661281279098-69b9445baa01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyb3xlbnwwfHwwfHx8MA%3D%3D' alt='Missing' className='abt-image'/>
                        </div>
                        <div className='abt-txt'>

                            <h2 className='abt-head'>Our Vision</h2>
                            <div className='abt-body'>Discover Alumni events and connect with your fellow graduates.</div>
                            <p>Our vision is to build a dynamic and global alumni network <br />
                                 that transcends boundaries, creating a supportive ecosystem <br />
                                 where every member is inspired to contribute, engage, and lead. <br />
                                  By nurturing a culture of shared success and continuous growth, <br />
                                  we envision this alumni platform as a beacon of inspiration, driving <br />
                                  positive change and leaving a lasting legacy for generations to come.</p>
                        </div>


                    </div>



                </div>


            </div>
            <Footer/>
        </>
    )
}