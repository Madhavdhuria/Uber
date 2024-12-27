const Locationsearchpanel = (props) => {
  const { setvehiclepanel, setOpenPanel } = props;
  const locations = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ea!",
  ];

  return (
    <div className="px-4 space-y-4">
      {locations.map((el, index) => (
        <div
          onClick={() => {
            setvehiclepanel(true);
            setOpenPanel(false);
          }}
          key={index}
          className="flex gap-4 border-2 p-4 border-gray-200 active:border-black rounded-xl items-center my-2 justify-start hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          <h2 className="bg-[#f3f4f6] h-10 flex items-center justify-center w-12 rounded-full shadow-lg">
            <i className="ri-map-pin-fill text-lg text-gray-600"></i>
          </h2>
          <h4 className="font-medium text-gray-800">{el}</h4>
        </div>
      ))}
    </div>
  );
};

export default Locationsearchpanel;
