import { useEffect, useState } from "react";
import axios from "axios";

const LocationSearchPanel = (props) => {
  const {
    pickup,
    destination,
    setPickup,
    setDestination,
    activeInput,
  } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/maps/get-suggestions?input=${query}`,
        {
          withCredentials: true,
        }
      );

      const detailedSuggestions = response.data.map((suggestion) => ({
        ...suggestion,
        fullDescription: `${suggestion.description}, ${suggestion.structured_formatting.secondary_text}`,
      }));

      setSuggestions(detailedSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const query = activeInput === "pickup" ? pickup : destination;
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [pickup, destination, activeInput]);

  const handleSuggestionClick = (suggestion) => {
    if (activeInput === "pickup") {
      setPickup(suggestion.fullDescription);
    } else {
      setDestination(suggestion.fullDescription);
    }
  };

  return (
    <div className="px-4 space-y-4 mt-4">
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            onClick={() => handleSuggestionClick(suggestion)}
            key={index}
            className="flex gap-4 border-2 p-4 border-gray-200 active:border-black rounded-xl items-center my-2 justify-start hover:bg-gray-100 transition duration-200 ease-in-out"
          >
            <div className="bg-[#f3f4f6] h-10 flex items-center justify-center w-12 rounded-full shadow-lg">
              <i className="ri-map-pin-fill text-lg text-gray-600"></i>
            </div>
            <h4 className="font-medium text-gray-800">{suggestion.fullDescription}</h4>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4">
          {activeInput ? "Type to search locations" : "No suggestions found"}
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
