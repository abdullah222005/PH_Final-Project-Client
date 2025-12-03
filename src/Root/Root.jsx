import { Outlet } from 'react-router';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';
import Footer from '../pages/Home/Shared/Footer/Footer';


const Root = () => {

  
    return (
      <div className="max-w-7xl mx-auto bg-[#EAECED]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
};

export default Root;