import Nav from "../components/Nav.jsx";
import {Link} from "react-router-dom";
import Footer from "../components/Footer.jsx";


export default function AdminDashboard(){
    return(
        <>
            <Nav/>
            <div className='dash-body'>
                <h1>Welcome to Admin Dashboard</h1>

                <div className='sect-cards'>

                    <Link to='/alumni-events' className='sect-card'>
                        See all created events

                    </Link>

                    <Link to='/alumni-records' className='sect-card'>
                        See all created users

                    </Link>


                </div>
            </div>
            <Footer/>
        </>
    )
}