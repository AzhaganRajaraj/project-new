import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Login from '../auth/Login';
import App from '../../App';
import Navbar from '../layout/Navbar';
import Register from '../auth/Register';
import Customer from '../controller/Customer';
import Booking from '../controller/Booking';
import Coach from '../controller/Coach';
import Location from '../controller/Location';
import Passenger from '../controller/Passenger';
import Payment from '../controller/Payment';
import Seats from '../controller/Seats';
import Train from '../controller/Train';
import TrainSchedule from '../controller/TrainSchedule';
import CustomerList from '../user/CustomerList';
import CustomerEdit from '../user/CustomerEdit';
import PassengerList from '../passenger/PassengerList';
import PassengerView from '../passenger/PassengerView';
import PassengerAdd from '../passenger/PassengerAdd';
import TrainList from '../../train/TrainList';
export default function MainRouter(){
    return(
        <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/customer/create' element={<Customer />} />
            <Route path='/customers' element={<CustomerList />} />
            <Route path='/customer/edit/:id' element={<CustomerEdit />} />
            <Route path='/bookings' element={<Booking />} />
            <Route path='/coach' element={<Coach />} />
            <Route path='/locations' element={<Location />} />
            <Route path='/passenger/edit/:id' element={<Passenger />} />
            <Route path='/passengers' element={<PassengerList />} />
            <Route path='/passenger/view/:id' element={<PassengerView />} />
            <Route path='/passenger/create' element={<PassengerAdd />} />
            <Route path='/payments' element={<Payment />} />
            <Route path='/seat' element={<Seats />} />
            <Route path='/train' element={<Train />} />
            <Route path='/schedule' element={<TrainSchedule />} />
            <Route path='/train/list' element={<TrainList />} />
            <Route path="/" element={<App/>} />
        </Routes>
        </BrowserRouter>
    )
}