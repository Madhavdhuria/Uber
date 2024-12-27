const Locationsearchpanel = (props) => {
  const { setvehiclepanel,setOpenPanel } = props;
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
         className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
        >
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{el}</h4>
        </div>
      ))}
    </div>
  );
};

export default Locationsearchpanel;
