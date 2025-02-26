import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { addCampaign } = useCampaigns(); // ✅ Get function to add campaigns

  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCampaign(form); // ✅ Save to context
    alert("Campaign Created Successfully!");
    navigate("/campaigns"); // ✅ Redirect after submission
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Start a Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Campaign Title</span>
          <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="block">
          <span className="text-gray-700">Funding Goal ($)</span>
          <input type="number" name="goal" value={form.goal} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="block">
          <span className="text-gray-700">Deadline</span>
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="block">
          <span className="text-gray-700">Image URL</span>
          <input type="text" name="image" value={form.image} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
