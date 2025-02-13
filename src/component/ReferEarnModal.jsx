import React, { useState } from "react";
import axios from "axios";

const ReferEarnModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.referrerName)
      newErrors.referrerName = "Referrer name is required";
    if (!formData.referrerEmail)
      newErrors.referrerEmail = "Referrer email is required";
    if (!formData.refereeName)
      newErrors.refereeName = "Referee name is required";
    if (!formData.refereeEmail)
      newErrors.refereeEmail = "Referee email is required";
    if (!formData.course) newErrors.course = "Course name is required";
    // simple email regex validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (formData.referrerEmail && !emailRegex.test(formData.referrerEmail))
      newErrors.referrerEmail = "Invalid email format";
    if (formData.refereeEmail && !emailRegex.test(formData.refereeEmail))
      newErrors.refereeEmail = "Invalid email format";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      // Adjust the URL if your backend is hosted separately
      const response = await fetch("/api/referrals", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        setSuccessMessage("Referral submitted successfully!");
        setFormData({
          referrerName: "",
          referrerEmail: "",
          refereeName: "",
          refereeEmail: "",
          course: "",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Refer a Course</h2>
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={formData.referrerName}
              onChange={(e) =>
                setFormData({ ...formData, referrerName: e.target.value })
              }
            />
            {errors.referrerName && (
              <p className="text-red-500 text-sm">{errors.referrerName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Your Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 mt-1"
              value={formData.referrerEmail}
              onChange={(e) =>
                setFormData({ ...formData, referrerEmail: e.target.value })
              }
            />
            {errors.referrerEmail && (
              <p className="text-red-500 text-sm">{errors.referrerEmail}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Friend's Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={formData.refereeName}
              onChange={(e) =>
                setFormData({ ...formData, refereeName: e.target.value })
              }
            />
            {errors.refereeName && (
              <p className="text-red-500 text-sm">{errors.refereeName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Friend's Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 mt-1"
              value={formData.refereeEmail}
              onChange={(e) =>
                setFormData({ ...formData, refereeEmail: e.target.value })
              }
            />
            {errors.refereeEmail && (
              <p className="text-red-500 text-sm">{errors.refereeEmail}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Course Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
            />
            {errors.course && (
              <p className="text-red-500 text-sm">{errors.course}</p>
            )}
          </div>
          {errors.submit && (
            <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Referral
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReferEarnModal;
