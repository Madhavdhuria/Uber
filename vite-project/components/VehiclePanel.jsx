const VehiclePanel = (props) => {
  const vehicles = [
    {
      name: "UberGo",
      capacity: 4,
      eta: "2 mins away",
      description: "Affordable, compact rides",
      image:
        "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
      price: "₹50",
    },
    {
      name: "Moto",
      capacity: 1,
      eta: "3 mins away",
      description: "Affordable motorcycle rides",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      price: "₹30",
    },
    {
      name: "UberAuto",
      capacity: 3,
      eta: "3 mins away",
      description: "Affordable Auto rides",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      price: "₹40",
    },
  ];

  return (
    <div className="max-h-[85vh] h-full overflow-y-auto pb-safe bg-white rounded-t-3xl shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center sticky top-0 z-10 bg-white pt-4 pb-3 px-6 border-b rounded-t-3xl shadow-sm">
        <h3 className="text-xl font-bold text-center text-gray-800">
          Choose a Vehicle
        </h3>

        <h5
          className="cursor-pointer mt-2 flex items-center gap-2"
          onClick={() => props.setVehiclePanel(false)}
        >
          <i className="text-2xl ri-arrow-left-line"></i>
        </h5>
      </div>

      <div className="px-4 py-4">
        <div className="space-y-4">
          {vehicles.map((vehicle, index) => (
            <button
              key={index}
              onClick={() => {
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
              }}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm transition hover:shadow-md hover:border-gray-300 w-full min-h-[80px]"
            >
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                src={vehicle.image}
                alt={vehicle.name}
                loading="lazy"
              />

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-lg font-medium text-gray-800">
                    {vehicle.name}
                  </h4>
                  <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    <i className="ri-user-3-fill mr-1"></i>
                    {vehicle.capacity}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{vehicle.description}</p>
                <p className="text-sm font-medium text-green-600">
                  {vehicle.eta}
                </p>
              </div>

              <div className="text-lg font-bold text-gray-800">
                {vehicle.price}
              </div>
            </button>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default VehiclePanel;
