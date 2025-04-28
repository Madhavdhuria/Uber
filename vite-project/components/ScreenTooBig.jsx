// src/pages/ScreenTooBig.jsx
const ScreenTooBig = () => {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-50 text-center p-4">
        <div className="text-6xl mb-6">📱</div>
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Screen Too Large</h1>
        <p className="text-blue-500 text-lg">
          Please open this app on a mobile device.
        </p>
      </div>
    );
  };
  
  export default ScreenTooBig;
  