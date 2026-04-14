import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';
import Footer from '../pages/Home/Shared/Footer/Footer';


const Root = () => {

  
    return (
      <div>
        <Navbar />
          <Outlet />
        <Footer />
      </div>
    );
};

export default Root;