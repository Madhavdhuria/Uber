import { Link } from "react-router-dom";
const Start = () => {
  return (
    <div>
      <div className="bg-cover  bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] flex flex-col justify-between  h-screen w-full pt-8">
      <img className='w-16 ml-8' src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417" alt="" />
        
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-4">Get Started with Uber</h2>
          <Link 
          to={"/userlogin"}
            type="button"
            className="inline-block text-center w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
