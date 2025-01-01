const ConfirmRidePanel = ({ setconfirmridePanel, setVehiclePanel ,setVehicleFound ,pickUp,destination,selectedVehicle,fares,CreateRide}) => {
  return (
    <div className="bg-white p-5 shadow-lg rounded-lg max-w-md mx-auto relative">
      <div 
        className="absolute top-3 left-3 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => {
          setconfirmridePanel(false);
          setVehiclePanel(true);
        }}
      >
        <i className="text-2xl ri-arrow-left-line"></i>
      </div>
      
      <h3 className="text-center text-xl font-bold mb-5">Confirm Your Ride</h3>
      
      <div className="flex justify-center mb-5">
        <img 
          className="h-24 object-contain rounded-lg shadow-sm" 
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
          alt="Ride" 
        />
      </div>
      
      <div className="space-y-4">

        <div className="flex items-start gap-4 p-3 border-b-2">
          <i className="text-2xl text-green-600 ri-map-pin-user-fill"></i>
          <div>
            <h4 className="text-lg font-medium">562/11-A</h4>
            <p className="text-sm text-gray-600">{pickUp}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-3 border-b-2">
          <i className="text-2xl text-blue-600 ri-map-pin-2-fill"></i>
          <div>
            <h4 className="text-lg font-medium">562/11-A</h4>
            <p className="text-sm text-gray-600">{destination}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-3">
          <i className="text-2xl text-yellow-600 ri-currency-line"></i>
          <div>
            <h4 className="text-lg font-medium">₹{fares[selectedVehicle]}</h4>
            <p className="text-sm text-gray-600">Cash Payment</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => {setVehicleFound(true),setconfirmridePanel(false),CreateRide() }} 
        className="w-full mt-5 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRidePanel;
