import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logotext.svg";
import illustration from "../../assets/Headillustration.png";

function Header() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        telephone: "",
        description: ""
    });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = "First name is required";
        if (!formData.lastName) errors.lastName = "Last name is required";
        if (!formData.companyName) errors.companyName = "Company name is required";
        if (!formData.email) errors.email = "Email is required";
        if (!formData.telephone) errors.telephone = "Telephone number is required";
        if (!formData.description) errors.description = "Description is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('http://localhost:8087/form/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    console.log("Form data submitted: ", formData);
                    // Reset form and close it
                    setFormData({
                        firstName: "",
                        lastName: "",
                        companyName: "",
                        email: "",
                        telephone: "",
                        description: ""
                    });
                    setShowForm(false);
                } else {
                    console.error('Error submitting form');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            setFormErrors(errors);
        }
    };
    

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="contif">
            <div className="frame45">
                <img className="logo2" src={logo} alt="logo" />
                <div className="pargraphe">
                    We’re a highly collaborative and supportive team, coming together on every
                    project to ensure our clients get the very best result.
                </div>
                <div>
                    <button className="butt" onClick={() => setShowForm(!showForm)}>
                        <div className="buttContent">Book a demo
                            <svg className="arrow1" width="17" height="12" viewBox="0 0 17 12"
                                fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path
                                    d="M16.6531 6.39301C16.9489 6.09721 16.9489 5.61763 16.6531 5.32183L11.8328 0.501521C11.537 0.205723 11.0574 0.205723 10.7616 0.501521C10.4658 0.797319 10.4658 1.2769 10.7616 1.5727L15.0463 5.85742L10.7616 10.1421C10.4658 10.4379 10.4658 10.9175 10.7616 11.2133C11.0574 11.5091 11.537 11.5091 11.8328 11.2133L16.6531 6.39301ZM0.96875 6.61486H16.1175V5.09998H0.96875V6.61486Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <img className="illustarion" src={illustration} alt="illustration" />
            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="demo-form">
                        <div className="form-field">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
                        </div>
                        <div className="form-field">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                            {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
                        </div>
                        <div className="form-field">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                            />
                            {formErrors.companyName && <span className="error">{formErrors.companyName}</span>}
                        </div>
                        <div className="form-field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {formErrors.email && <span className="error">{formErrors.email}</span>}
                        </div>
                        <div className="form-field">
                            <label>Telephone</label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                            />
                            {formErrors.telephone && <span className="error">{formErrors.telephone}</span>}
                        </div>
                        <div className="form-field">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                            {formErrors.description && <span className="error">{formErrors.description}</span>}
                        </div>
                        <div className="form-actions">
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Header;
