import { useState } from 'react'
import './App.css'
import ListAuditoriumcomponent from './components/Auditorium/ListAuditoriumcomponent'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import AddAuditoriumcomponent from './components/Auditorium/AddAuditoriumcomponent'
import UpdateAuditoriumComponent from './components/Auditorium/UpdateAuditoriumComponent'
import LoginScreenComponent from './components/LoginScreenComponent'
import AdminDashboard from './components/AdminDashboard'
import ListTheatreComponent from './components/Theatre/ListTheatreComponent'
import AddTheatreComponent from './components/Theatre/AddTheatreComponent'
import UpdateTheatreComponent from './components/Theatre/UpdateTheatreComponent'
import ListMovieComponent from './components/Movie/ListMovieComponent'
import AddMovieComponent from './components/Movie/AddMovieComponent'
import UpdateMovieComponent from './components/Movie/UpdateMovieComponent'
import ListBookingComponent from './components/Booking/ListBookingComponent'
import AddBookingComponent from './components/Booking/AddBookingComponent'
// import UpdateBookingComponent from './components/Booking/UpdateBookingComponent'
import ListScreeningComponent from './components/Screening/ListScreeningComponent'
import AddScreeningComponent from './components/Screening/AddScreeningComponent'
import UpdateScreeningComponent from './components/Screening/UpdateScreeningComponent'
import UserDashboard from './components/UserDashboard'
import GetUserComponent from './components/User/GetUserComponent'
import UpdateUserComponent from './components/User/UpdateUserComponent'
import ScreensForUser from './components/User/ScreensForUser'
import BookScreeningbyUserID from './components/User/BookScreeningByUserID'
import AcknowledgementWindow from './components/User/AcknowledgementWindow'
import GetBookingByUserID from './components/User/GetBookingByUserID'
import SignupComponent from './components/User/SignupComponent'
import AccountCreatedComponent from './components/User/AccountCreatedComponent'
function App() {

  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path='' element = {<LoginScreenComponent/>}></Route>

          <Route path='/login-screen' element = {<LoginScreenComponent/>}></Route>

          {/* Admin Dashboard */}
          <Route path='/admin-dashboard' element = {<AdminDashboard/>}></Route>

          {/* User Dashboard */}
          <Route path='/user-dashboard/:userName' element = {<UserDashboard/>}></Route>

          {/* Auditorium services */}
          <Route path='/list-auditoriums' element = {<ListAuditoriumcomponent/>}></Route>
          
          <Route path='/add-auditorium' element = {<AddAuditoriumcomponent/>}></Route>
          
          <Route path='/update-auditorium/:audiid' element = {<UpdateAuditoriumComponent/>}></Route>

          {/* Theatre Services */}
          <Route path='/list-theatre' element = {<ListTheatreComponent/>}></Route>

          <Route path='/add-theatre' element = {<AddTheatreComponent/>}></Route>

          <Route path='/update-theatre/:theatreid' element = {<UpdateTheatreComponent/>}></Route>

          {/* Movie Services */}
          <Route path='/list-movie' element = {<ListMovieComponent/>}></Route>

          <Route path='/add-movie' element = {<AddMovieComponent/>}></Route>

          <Route path='/update-movie/:movieid' element = {<UpdateMovieComponent/>}></Route>

          {/* Booking Services */}
          {/* Admin */}
          <Route path='/list-booking' element = {<ListBookingComponent/>}></Route>

          {/* User */}
          <Route path='/add-booking' element = {<AddBookingComponent/>}></Route>


          {/* Admin */}
          {/* <Route path='/update-booking/:bookingid' element = {<UpdateBookingComponent/>}></Route> */}

          {/* Screening Services */}
          <Route path='/list-screening' element = {<ListScreeningComponent/>}></Route>

          <Route path='/add-screening' element = {<AddScreeningComponent/>}></Route>

          <Route path='/update-screening/:screeningid' element = {<UpdateScreeningComponent/>}></Route>

          {/* User */}
          <Route path ='/get-user/:userID' element={<GetUserComponent/>}></Route>

          <Route path='/update-user/:userID' element = {<UpdateUserComponent/>}></Route>

          <Route path='/screening-user/:userID' element = {<ScreensForUser/>}></Route>

          <Route path='/book-tickets-user/:screenID/:userID' element = {<BookScreeningbyUserID/>}></Route>

          <Route path='/signup' element = {<SignupComponent/>}></Route>

          <Route path='/acc-created-ack' element = {<AccountCreatedComponent/>}></Route>



          {/* <Route path='/acknowledgement-window/:userID/:screenID' element = {<AcknowledgementWindow/>}></Route> */}

          <Route path='/acknowledgement-window/:userID' element = {<AcknowledgementWindow/>}></Route>

          <Route path='/getbookingbyuserid/:userID' element = {<GetBookingByUserID/>}></Route>




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
