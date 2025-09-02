import { Bell, ArrowLeft, Upload, User, X } from "lucide-react";
import { useState } from "react";

export default function Reservation() {
  const [activeFloor, setActiveFloor] = useState("1st Floor");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showAddReservationSidebar, setShowAddReservationSidebar] = useState(false);

  // Form state for new reservation
  const [reservationForm, setReservationForm] = useState({
    customerTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reservationDate: "",
    reservationTime: "",
    partySize: "",
    tableNumber: "",
    specialRequests: "",
    depositAmount: "",
    paymentMethod: "",
    customerAddress: ""
  });

  // Reservation data
  const reservations = [
    { table: "Bar", start: 13, end: 15, name: "John Doe", people: 1, color: "bg-gray-200", id: 1 },
    { table: "A2", start: 11, end: 12, name: "Alice Smith", people: 2, color: "bg-gray-200", id: 2 },
    { table: "B1", start: 11, end: 13, name: "Bob Johnson", people: 4, color: "bg-gray-200", id: 3 },
    { table: "B3", start: 12, end: 13, name: "Carol White", people: 3, color: "bg-gray-200", id: 4 },
    { table: "C2", start: 19, end: 20, name: "David Brown", people: 2, color: "bg-gray-200", id: 5 },
    { table: "A1", start: 17, end: 18, name: "Emma Davis", people: 1, color: "bg-pink-200", id: 6 },
    { table: "A2", start: 14, end: 15, name: "Frank Miller", people: 2, color: "bg-pink-200", id: 7 },
    { table: "B2", start: 15, end: 16, name: "Grace Wilson", people: 5, color: "bg-pink-200", id: 8 },
    { table: "C1", start: 16, end: 17, name: "Henry Taylor", people: 3, color: "bg-pink-200", id: 9 },
  ];

  // Sample detailed reservation data
  const reservationDetails = {
    1: {
      tableNumber: "01",
      people: 1,
      date: "28.03.2024",
      time: "01:18 PM",
      deposit: "$60.00",
      status: "Confirmed",
      customerTitle: "Mr",
      customerName: "Watson Joyce",
      phone: "+1 (123) 123 4654",
      email: "watsonjoyce11@gmail.com",
      customerId: "#123-4564",
      paymentMethod: "Visa Card",
      cardNumber: "**** 9520 4564 4516"
    }
  };

  // Time slots and other data
  const times = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const tables = ["Bar", "A1", "A2", "B1", "B2", "B3", "C1", "C2"];
  const customerTitles = ["Mr", "Mrs", "Ms", "Dr", "Prof"];
  const paymentMethods = ["Cash", "Visa Card", "Master Card", "American Express", "PayPal"];
  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowReservationModal(true);
  };

  const closeModal = () => {
    setShowReservationModal(false);
    setSelectedReservation(null);
  };

  const getReservationDetails = (id) => {
    return reservationDetails[id] || {
      tableNumber: "01",
      people: 1,
      date: "28.03.2024",
      time: "01:18 PM",
      deposit: "$60.00",
      status: "Confirmed",
      customerTitle: "Mr",
      customerName: "John Doe",
      phone: "+1 (123) 456 7890",
      email: "johndoe@gmail.com",
      customerId: "#123-4564",
      paymentMethod: "Visa Card",
      cardNumber: "**** 9520 4564 4516"
    };
  };

  const handleReservationFormChange = (e) => {
    const { name, value } = e.target;
    setReservationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelReservation = () => {
    setShowAddReservationSidebar(false);
    setReservationForm({
      customerTitle: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      reservationDate: "",
      reservationTime: "",
      partySize: "",
      tableNumber: "",
      specialRequests: "",
      depositAmount: "",
      paymentMethod: "",
      customerAddress: ""
    });
  };

  const handleConfirmReservation = () => {
    console.log("Reservation Data:", reservationForm);
    handleCancelReservation();
    alert("Reservation created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Restaurant Management</h1>
      </header>

      <section className="space-y-6 p-4 sm:p-6 bg-white min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Reservation</h1>
          <button 
            className="px-4 py-2 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 w-full sm:w-auto"
            onClick={() => setShowAddReservationSidebar(true)}
          >
            Add New Reservation
          </button>
        </div>

        {/* Floor Tabs */}
        <div className="flex space-x-2">
          {["1st Floor", "2nd Floor", "3rd Floor"].map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-4 py-2 rounded-xl font-medium ${
                activeFloor === floor ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* Reservation Grid */}
        <div className="overflow-x-auto border rounded-xl">
          {/* Time Axis */}
          <div className="grid grid-cols-12 border-b bg-gray-50 text-xs sm:text-sm font-medium text-gray-500">
            <div className="p-2 border-r">Table</div>
            {times.map((t) => (
              <div key={t} className="p-2 border-l text-center">
                {t}:00
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {tables.map((table) => (
            <div key={table} className="grid grid-cols-12 relative h-16 border-b">
              {/* Table label */}
              <div className="p-2 border-r font-medium text-gray-700 bg-gray-50 flex items-center text-xs sm:text-sm">
                {table}
              </div>

              {/* Grid cells */}
              {times.map((t) => (
                <div key={t} className="border-l h-full"></div>
              ))}

              {/* Reservations */}
              {reservations
                .filter((r) => r.table === table)
                .map((r, i) => {
                  const startIndex = times.indexOf(r.start);
                  const endIndex = times.indexOf(r.end);

                  return (
                    <div
                      key={i}
                      onClick={() => handleReservationClick(r)}
                      className={`${r.color} absolute top-2 bottom-2 rounded-lg shadow flex flex-col justify-center p-2 text-center cursor-pointer hover:opacity-80 transition-opacity`}
                      style={{
                        left: `${((startIndex + 1) / (times.length + 1)) * 100}%`,
                        width: `${((endIndex - startIndex) / (times.length + 1)) * 100}%`,
                      }}
                    >
                      <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                      <p className="text-xs text-gray-700">👥 {r.people}</p>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </section>

      Reservation Details Modal
     {showReservationModal && selectedReservation && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={closeModal}
    ></div>

    {/* Modal */}
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col h-[90vh]">
        {/* Header with Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=300&fit=crop"
            alt="Restaurant table"
            className="w-full h-24 sm:h-28 md:h-32 lg:h-36 object-cover rounded-t-xl"
          />
          {/* Back Button + Title */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <button
              onClick={closeModal}
              className="p-1.5 bg-white/90 hover:bg-white rounded-full transition"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <h3 className="text-gray-900 text-base font-semibold bg-white/80 px-2.5 py-0.5 rounded-full">
              Reservation Details
            </h3>
          </div>
          {/* Close Button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={closeModal}
              className="p-1.5 bg-white/90 hover:bg-white rounded-full transition"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          {/* Table Number */}
          <div className="absolute bottom-3 left-3">
            <h2 className="text-white text-lg font-semibold bg-black/50 px-2.5 py-0.5 rounded-md">
              Table # {getReservationDetails(selectedReservation.id).tableNumber}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Reservation Details */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Reservation Details
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-1.5 font-medium text-gray-600">Table</th>
                    <th className="px-3 py-1.5 font-medium text-gray-600">Pax</th>
                    <th className="px-3 py-1.5 font-medium text-gray-600">Date</th>
                    <th className="px-3 py-1.5 font-medium text-gray-600">Time</th>
                    <th className="px-3 py-1.5 font-medium text-gray-600">Deposit</th>
                    <th className="px-3 py-1.5 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).tableNumber}</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).people} persons</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).date}</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).time}</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).deposit}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">
                      {getReservationDetails(selectedReservation.id).status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Customer Details
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 text-gray-500 font-medium">Title</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).customerTitle}</td>
                    <td className="px-3 py-2 text-gray-500 font-medium">Full Name</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).customerName}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-500 font-medium">Phone</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).phone}</td>
                    <td className="px-3 py-2 text-gray-500 font-medium">Email</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Additional Information
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 text-gray-500 font-medium">Customer ID</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).customerId}</td>
                    <td className="px-3 py-2 text-gray-500 font-medium">Payment</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).paymentMethod}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-500 font-medium">Name</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).customerName}</td>
                    <td className="px-3 py-2 text-gray-500 font-medium">Card</td>
                    <td className="px-3 py-2">{getReservationDetails(selectedReservation.id).cardNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={closeModal}
              className="text-sm font-medium text-gray-600 underline hover:text-red-600 transition"
            >
              Cancel Reservation
            </button>
            <button className="px-4 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md transition text-sm">
              Change Table
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)}





      {/* Add New Reservation Sidebar */}
      {showAddReservationSidebar && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCancelReservation}></div>
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <button onClick={handleCancelReservation} className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Add New Reservation</h3>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  
                  {/* Customer Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <select
                        name="customerTitle"
                        value={reservationForm.customerTitle}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      >
                        <option value="">Select Title</option>
                        {customerTitles.map((title) => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                      </select>
                      
                      <input
                        type="text"
                        name="firstName"
                        value={reservationForm.firstName}
                        onChange={handleReservationFormChange}
                        placeholder="First Name"
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      />
                      
                      <input
                        type="text"
                        name="lastName"
                        value={reservationForm.lastName}
                        onChange={handleReservationFormChange}
                        placeholder="Last Name"
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      />
                      
                      <input
                        type="email"
                        name="email"
                        value={reservationForm.email}
                        onChange={handleReservationFormChange}
                        placeholder="Email Address"
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      />
                      
                      <input
                        type="tel"
                        name="phone"
                        value={reservationForm.phone}
                        onChange={handleReservationFormChange}
                        placeholder="Phone Number"
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Reservation Details</h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="date"
                        name="reservationDate"
                        value={reservationForm.reservationDate}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      />
                      
                      <select
                        name="reservationTime"
                        value={reservationForm.reservationTime}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      
                      <select
                        name="partySize"
                        value={reservationForm.partySize}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      >
                        <option value="">Party Size</option>
                        {[1,2,3,4,5,6,7,8,9,10].map((size) => (
                          <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                      
                      <select
                        name="tableNumber"
                        value={reservationForm.tableNumber}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      >
                        <option value="">Preferred Table (Optional)</option>
                        {tables.map((table) => (
                          <option key={table} value={table}>Table {table}</option>
                        ))}
                      </select>
                      
                      <textarea
                        name="specialRequests"
                        value={reservationForm.specialRequests}
                        onChange={handleReservationFormChange}
                        placeholder="Special Requests"
                        rows={3}
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 resize-none text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="number"
                        name="depositAmount"
                        value={reservationForm.depositAmount}
                        onChange={handleReservationFormChange}
                        placeholder="Deposit Amount (Optional)"
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      />
                      
                      <select
                        name="paymentMethod"
                        value={reservationForm.paymentMethod}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                      >
                        <option value="">Payment Method (Optional)</option>
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCancelReservation}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmReservation}
                    className="flex-1 px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition text-sm sm:text-base"
                  >
                    Create Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}