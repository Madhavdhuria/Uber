const WaitingForDriver = ({setWaitngForDriver}) => {
  return (
    <div className="relative bg-white w-full max-w-lg mx-auto rounded-lg shadow-md">
      <button 
        className="w-full h-12 flex items-center justify-center border-b cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => {setWaitngForDriver(false)}}
      >
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-line" />
      </button>

      <div className="p-4">
        <div className="flex items-center justify-between gap-4 border-b pb-4">
          <div className="h-20 w-32 flex-shrink-0">
            <img
              className="h-full w-full rounded-lg object-cover"
              src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
              alt="Car Image"
            />
          </div>
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">Madhav</h2>
            <h4 className="text-xl font-semibold">PB 22 3421</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-4 p-4 border-b">
            <i className="text-lg ri-map-pin-user-fill text-gray-500" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">fazilka</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border-b">
            <i className="text-lg ri-map-pin-2-fill text-gray-500" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">chandigarh</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <i className="text-lg ri-currency-line text-gray-500" />
            <div>
              <h3 className="text-lg font-medium">₹500</h3>
              <p className="text-sm text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver

