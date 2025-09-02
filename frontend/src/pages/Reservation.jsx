import { Bell, ArrowLeft, Upload, User, X, Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Reservation() {
  const [activeFloor, setActiveFloor] = useState("1st Floor");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showAddReservationSidebar, setShowAddReservationSidebar] = useState(false);
  const [dateFilter, setDateFilter] = useState("today");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [customDate, setCustomDate] = useState("");

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

  // Reservation data - organized by date
  const reservationData = {
    today: [
      { table: "Bar", start: 13, end: 15, name: "John Doe", people: 1, color: "bg-gray-200", id: 1 },
      { table: "A2", start: 11, end: 12, name: "Alice Smith", people: 2, color: "bg-gray-200", id: 2 },
      { table: "B1", start: 11, end: 13, name: "Bob Johnson", people: 4, color: "bg-gray-200", id: 3 },
      { table: "B3", start: 12, end: 13, name: "Carol White", people: 3, color: "bg-gray-200", id: 4 },
      { table: "C2", start: 19, end: 20, name: "David Brown", people: 2, color: "bg-gray-200", id: 5 },
    ],
    yesterday: [
      { table: "A1", start: 17, end: 18, name: "Emma Davis", people: 1, color: "bg-pink-200", id: 6 },
      { table: "A2", start: 14, end: 15, name: "Frank Miller", people: 2, color: "bg-pink-200", id: 7 },
      { table: "B2", start: 15, end: 16, name: "Grace Wilson", people: 5, color: "bg-pink-200", id: 8 },
    ],
    tomorrow: [
      { table: "A1", start: 12, end: 14, name: "Harry Potter", people: 2, color: "bg-blue-200", id: 9 },
      { table: "C1", start: 13, end: 15, name: "Hermione Granger", people: 3, color: "bg-blue-200", id: 10 },
      { table: "B3", start: 18, end: 20, name: "Ron Weasley", people: 4, color: "bg-blue-200", id: 11 },
    ],
    "2024-03-25": [
      { table: "A1", start: 11, end: 13, name: "Tony Stark", people: 2, color: "bg-green-200", id: 12 },
      { table: "B2", start: 14, end: 16, name: "Steve Rogers", people: 3, color: "bg-green-200", id: 13 },
      { table: "C2", start: 17, end: 19, name: "Natasha Romanoff", people: 2, color: "bg-green-200", id: 14 },
    ],
    "2024-03-24": [
      { table: "Bar", start: 12, end: 14, name: "Bruce Banner", people: 1, color: "bg-yellow-200", id: 15 },
      { table: "A2", start: 15, end: 17, name: "Thor Odinson", people: 4, color: "bg-yellow-200", id: 16 },
      { table: "B1", start: 18, end: 20, name: "Clint Barton", people: 2, color: "bg-yellow-200", id: 17 },
    ]
  };

  // Get reservations based on date filter
  const reservations = reservationData[dateFilter] || reservationData.today;

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

  // Get today, tomorrow, and yesterday dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format date for value (YYYY-MM-DD)
  const formatDateValue = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Date filter options with formatted labels
  const dateFilterOptions = [
    { value: "today", label: "Today", date: formatDate(today) },
    { value: "tomorrow", label: "Tomorrow", date: formatDate(tomorrow) },
    { value: "yesterday", label: "Yesterday", date: formatDate(yesterday) }
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

  // Get label for current date filter
  const getDateFilterLabel = () => {
    if (dateFilter === "custom") {
      return new Date(customDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    
    const option = dateFilterOptions.find(option => option.value === dateFilter);
    return option ? option.label : "Today";
  };

  // Get formatted date for current filter
  const getFormattedDate = () => {
    if (dateFilter === "custom") {
      return customDate ? new Date(customDate).toLocaleDateString() : "Select date";
    }
    
    const option = dateFilterOptions.find(option => option.value === dateFilter);
    return option ? option.date : formatDate(today);
  };

  // Handle date filter selection
  const handleDateFilterSelect = (value) => {
    setDateFilter(value);
    setShowDateDropdown(false);
    setShowCalendar(false);
  };

  // Handle custom date selection
  const handleCustomDateSelect = (e) => {
    const selectedDate = e.target.value;
    setCustomDate(selectedDate);
    setDateFilter("custom");
    setShowDateDropdown(false);
    setShowCalendar(false);
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white shadow px-4 sm:px-6 py-3 sticky top-0 z-10">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Restaurant Management</h1>
      </header>

      <section className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 bg-white min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Reservation</h1>
          <button 
            className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 w-full sm:w-auto text-sm sm:text-base"
            onClick={() => setShowAddReservationSidebar(true)}
          >
            Add New Reservation
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Floor Tabs */}
          <div className="flex flex-wrap gap-2">
            {["1st Floor", "2nd Floor", "3rd Floor"].map((floor) => (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm ${
                  activeFloor === floor ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {floor}
              </button>
            ))}
          </div>

          {/* Date Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer hover:bg-gray-200 transition"
            >
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-xs sm:text-sm text-gray-600">{getDateFilterLabel()}</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Dropdown Menu */}
            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {dateFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleDateFilterSelect(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      dateFilter === option.value ? "bg-pink-50 text-pink-700" : "text-gray-700"
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.date}</div>
                  </button>
                ))}
                
                {/* Calendar option */}
                <div className="border-t border-gray-200">
                  <button
                    onClick={toggleCalendar}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  >
                    <div className="font-medium">Choose from calendar</div>
                  </button>
                  
                  {showCalendar && (
                    <div className="px-4 py-2 border-t border-gray-100">
                      <input
                        type="date"
                        value={customDate}
                        onChange={handleCustomDateSelect}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date Filter Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            Showing reservations for <span className="font-semibold">{getDateFilterLabel()}</span>
            <span className="ml-2 text-blue-600">({getFormattedDate()})</span>
          </p>
        </div>

        {/* Rest of the component remains the same */}
        {/* Reservation Grid */}
        <div className="overflow-x-auto border rounded-lg sm:rounded-xl">
          {/* Time Axis */}
          <div className="grid grid-cols-12 border-b bg-gray-50 text-xs font-medium text-gray-500 min-w-[600px]">
            <div className="p-2 border-r text-xs">Table</div>
            {times.map((t) => (
              <div key={t} className="p-2 border-l text-center text-xs">
                {t}:00
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {tables.map((table) => (
            <div key={table} className="grid grid-cols-12 relative h-12 sm:h-16 border-b min-w-[600px]">
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
                      className={`${r.color} absolute top-1 bottom-1 sm:top-2 sm:bottom-2 rounded-md sm:rounded-lg shadow flex flex-col justify-center p-1 sm:p-2 text-center cursor-pointer hover:opacity-80 transition-opacity`}
                      style={{
                        left: `${((startIndex + 1) / (times.length + 1)) * 100}%`,
                        width: `${((endIndex - startIndex) / (times.length + 1)) * 100}%`,
                      }}
                    >
                      <p className="text-xs font-semibold text-gray-800 truncate">{r.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-700">👥 {r.people}</p>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>

        {/* Reservation Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-800">Total Reservations</h3>
            <p className="text-2xl font-bold text-blue-900">{reservations.length}</p>
            <p className="text-xs text-blue-700 mt-1">For {getDateFilterLabel()}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-sm font-medium text-green-800">Total Guests</h3>
            <p className="text-2xl font-bold text-green-900">
              {reservations.reduce((total, reservation) => total + reservation.people, 0)}
            </p>
            <p className="text-xs text-green-700 mt-1">For {getDateFilterLabel()}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-sm font-medium text-purple-800">Occupancy Rate</h3>
            <p className="text-2xl font-bold text-purple-900">
              {Math.round((reservations.length / (tables.length * 5)) * 100)}%
            </p>
            <p className="text-xs text-purple-700 mt-1">For {getDateFilterLabel()}</p>
          </div>
        </div>

        {/* Reservation Chart */}
        <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservation Timeline - {getDateFilterLabel()}</h3>
          <div className="h-64">
            <div className="flex h-full">
              {/* Time labels */}
              <div className="flex flex-col justify-between h-full text-xs text-gray-500 mr-2">
                {times.map(time => (
                  <div key={time} className="h-8 flex items-center">
                    {time}:00
                  </div>
                ))}
              </div>
              
              {/* Chart content */}
              <div className="flex-1 relative">
                {/* Grid lines */}
                {times.map((time, index) => (
                  <div 
                    key={time} 
                    className="absolute left-0 right-0 border-t border-gray-200"
                    style={{ top: `${(index / (times.length - 1)) * 100}%` }}
                  ></div>
                ))}
                
                {/* Reservation blocks */}
                {reservations.map((reservation, index) => {
                  const startPercent = ((reservation.start - times[0]) / (times[times.length - 1] - times[0])) * 100;
                  const heightPercent = ((reservation.end - reservation.start) / (times[times.length - 1] - times[0])) * 100;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute rounded-md px-2 py-1 text-white text-xs ${reservation.color.replace('bg-', 'bg-').replace('200', '500')} border-l-4 ${reservation.color}`}
                      style={{
                        top: `${startPercent}%`,
                        height: `${heightPercent}%`,
                        left: `${(tables.indexOf(reservation.table) / tables.length) * 100}%`,
                        width: `${90 / tables.length}%`,
                      }}
                    >
                      <div className="font-semibold truncate">{reservation.name}</div>
                      <div>Table {reservation.table}</div>
                      <div>{reservation.start}:00-{reservation.end}:00</div>
                    </div>
                  );
                })}
                
                {/* Table labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                  {tables.map(table => (
                    <div key={table} className="text-center">
                      {table}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Details Modal */}
      {showReservationModal && selectedReservation && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
              {/* Header with Image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=300&fit=crop"
                  alt="Restaurant table"
                  className="w-full h-20 sm:h-24 md:h-28 lg:h-32 object-cover rounded-t-lg sm:rounded-t-xl"
                />
                {/* Back Button + Title */}
                <div className="absolute top-2 left-2 flex items-center gap-2">
                  <button
                    onClick={closeModal}
                    className="p-1 bg-white/90 hover:bg-white rounded-full transition"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                  </button>
                  <h3 className="text-gray-900 text-sm font-semibold bg-white/80 px-2 py-0.5 rounded-full">
                    Reservation Details
                  </h3>
                </div>
                {/* Close Button */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={closeModal}
                    className="p-1 bg-white/90 hover:bg-white rounded-full transition"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                  </button>
                </div>
                {/* Table Number */}
                <div className="absolute bottom-2 left-2">
                  <h2 className="text-white text-sm sm:text-base font-semibold bg-black/50 px-2 py-0.5 rounded-md">
                    Table # {getReservationDetails(selectedReservation.id).tableNumber}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                {/* Reservation Details */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Reservation Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 p-2 text-xs sm:text-sm">
                      <div className="font-medium text-gray-600">Table</div>
                      <div className="font-medium text-gray-600">Pax</div>
                      <div className="font-medium text-gray-600">Date</div>
                      <div className="font-medium text-gray-600">Time</div>
                      <div className="font-medium text-gray-600">Deposit</div>
                      <div className="font-medium text-gray-600">Status</div>
                      
                      <div>{getReservationDetails(selectedReservation.id).tableNumber}</div>
                      <div>{getReservationDetails(selectedReservation.id).people} persons</div>
                      <div>{getReservationDetails(selectedReservation.id).date}</div>
                      <div>{getReservationDetails(selectedReservation.id).time}</div>
                      <div>{getReservationDetails(selectedReservation.id).deposit}</div>
                      <div className="font-semibold text-green-600">
                        {getReservationDetails(selectedReservation.id).status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Customer Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 text-xs sm:text-sm">
                      <div className="text-gray-500 font-medium">Title</div>
                      <div>{getReservationDetails(selectedReservation.id).customerTitle}</div>
                      <div className="text-gray-500 font-medium">Full Name</div>
                      <div>{getReservationDetails(selectedReservation.id).customerName}</div>
                      
                      <div className="text-gray-500 font-medium">Phone</div>
                      <div>{getReservationDetails(selectedReservation.id).phone}</div>
                      <div className="text-gray-500 font-medium">Email</div>
                      <div>{getReservationDetails(selectedReservation.id).email}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Additional Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 text-xs sm:text-sm">
                      <div className="text-gray-500 font-medium">Customer ID</div>
                      <div>{getReservationDetails(selectedReservation.id).customerId}</div>
                      <div className="text-gray-500 font-medium">Payment</div>
                      <div>{getReservationDetails(selectedReservation.id).paymentMethod}</div>
                      
                      <div className="text-gray-500 font-medium">Name</div>
                      <div>{getReservationDetails(selectedReservation.id).customerName}</div>
                      <div className="text-gray-500 font-medium">Card</div>
                      <div>{getReservationDetails(selectedReservation.id).cardNumber}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                  <button
                    onClick={closeModal}
                    className="text-xs sm:text-sm font-medium text-gray-600 underline hover:text-red-600 transition"
                  >
                    Cancel Reservation
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md transition text-xs sm:text-sm">
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
          <div className="fixed right-0 top-0 h-full w-full sm:max-w-sm bg-white shadow-xl z-50 overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-2">
                  <button onClick={handleCancelReservation} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Add New Reservation</h3>
                </div>
                <button onClick={handleCancelReservation} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-4">
                <div className="space-y-4 sm:space-y-6">
                  
                  {/* Customer Information */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Customer Information</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <select
                        name="customerTitle"
                        value={reservationForm.customerTitle}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
                      />
                      
                      <input
                        type="text"
                        name="lastName"
                        value={reservationForm.lastName}
                        onChange={handleReservationFormChange}
                        placeholder="Last Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
                      />
                      
                      <input
                        type="email"
                        name="email"
                        value={reservationForm.email}
                        onChange={handleReservationFormChange}
                        placeholder="Email Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
                      />
                      
                      <input
                        type="tel"
                        name="phone"
                        value={reservationForm.phone}
                        onChange={handleReservationFormChange}
                        placeholder="Phone Number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Reservation Details</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="date"
                        name="reservationDate"
                        value={reservationForm.reservationDate}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
                      />
                      
                      <select
                        name="reservationTime"
                        value={reservationForm.reservationTime}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
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
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 resize-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Payment Information</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="number"
                        name="depositAmount"
                        value={reservationForm.depositAmount}
                        onChange={handleReservationFormChange}
                        placeholder="Deposit Amount (Optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
                      />
                      
                      <select
                        name="paymentMethod"
                        value={reservationForm.paymentMethod}
                        onChange={handleReservationFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm"
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
              <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleCancelReservation}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmReservation}
                    className="flex-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition text-sm"
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