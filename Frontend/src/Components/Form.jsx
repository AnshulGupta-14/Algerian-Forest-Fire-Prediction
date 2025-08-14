import { useState } from "react";

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    Temperature: "",
    RH: "",
    Ws: "",
    Rain: "",
    FFMC: "",
    DMC: "",
    ISI: "",
    Classes: "",
    region: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("https://algerian-forest-fire-prediction-j2i8.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }, setLoading(true));

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Fire Prediction Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label className="block font-medium text-gray-800 mb-1">
              {field}:
            </label>
            <input
              type="number"
              step="any"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? "Predicting..." : 'Predict'}
        </button>
      </form>

      {prediction !== null && (
        <div className="mb-4 p-4 rounded-lg text-center text-white font-bold"
            style={{
              backgroundColor:
                    prediction < 5
                  ? "#22c55e" // green low risk
                  : prediction < 15
                  ? "#facc15" // yellow moderate
                  : prediction < 30
                  ? "#f97316" // orange high
                  : "#dc2626" // red extreme
            }}
        >
            {prediction < 5
              ? "Low Risk of fire"
              : prediction < 15
              ? "Moderate Risk of fire"
              : prediction < 30
              ? "High Risk of fire"
              : "Extreme Risk of fire"}
        </div>
      )}
      {error && (
        <p className="mt-6 text-lg font-bold text-red-500 text-center">
          Error: {error}
        </p>
      )}
    </div>
  );
}
