import { Outlet } from 'react-router';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';
import Footer from '../pages/Home/Shared/Footer/Footer';


const Root = () => {

  
    return (
      <div className="md:max-w-7xl w-full max-w-full mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
};

export default Root;