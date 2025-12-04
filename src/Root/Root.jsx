import { Outlet } from 'react-router';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';
import Footer from '../pages/Home/Shared/Footer/Footer';


const Root = () => {

  
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
};

export default Root;