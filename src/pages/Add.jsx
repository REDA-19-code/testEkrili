import React, { useState } from "react";
import TextComponent from "../components/TextComponents";

function Add() {
  const [propertyType, setPropertyType] = useState("Store");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]);
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ 
      propertyType, 
      description, 
      rooms, 
      area, 
      price, 
      location, 
      images 
    });
  };

  const formatLabel = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

   
  const focusColor = "#8371f9";  
  const addPostColor = "#6366f1";
  const addPostShadow = "rgba(99, 102, 241, 0.4)";

  const containerStyle = {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    backgroundColor: "transparent"
  };

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor: addPostColor,
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    boxShadow: `0 4px 12px ${addPostShadow}`
  };

  return (
    <div>
      <div style={{
        backgroundColor: addPostColor,
        width: "100vw",
        padding: "30px 0",
        marginLeft: "calc(-50vw + 50%)",
        boxShadow: `0 4px 12px ${addPostShadow}`
      }}>
        <div style={{
          maxWidth: "700px",
          margin: "0",
          padding: "0",
          marginLeft: "20px"
        }}>
          <h1 style={{
            color: "white",
            fontSize: "36px",
            fontWeight: "bold",
            margin: 0,
            padding: 0,
            textAlign: "left"
          }}>
            Creation Post
          </h1>
        </div>
      </div>

      <div style={containerStyle}>
        <h2 style={{ 
          fontSize: "28px", 
          fontWeight: 700, 
          marginBottom: "32px",
          color: "#0f172a",
          textAlign: "center",
          paddingBottom: "16px",
        }}>
          Add New Post
        </h2>
        
        <form onSubmit={handleSubmit}>
           
          <div style={{ marginBottom: "24px" }}>
            <div style={{ 
              fontWeight: 500, 
              marginBottom: "8px", 
              fontSize: "14px", 
              color: "gray" 
            }}>
              {formatLabel("Property type")}
            </div>
            <select 
              value={propertyType} 
              onChange={(e) => setPropertyType(e.target.value)} 
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1.5px solid #e2e8f0",
                borderRadius: "20px",  
                fontSize: "15px",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
                outline: "none",
                color: "#0f172a"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = focusColor;
                e.target.style.boxShadow = "none";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
              }}
            >
              <option value="Store">Store</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>

          {/* Description  */}
          <div style={{ marginBottom: "24px" }}>
            <TextComponent
              label={formatLabel("Description")}
              placeholder="Describe your property..."
              value={description}
              setValue={setDescription}
              width="100%"
            />
          </div>

          {/* Rooms  */}
          <div style={{ marginBottom: "24px" }}>
            <TextComponent
              label={formatLabel("Rooms")}
              placeholder="Enter number of rooms"
              value={rooms}
              setValue={setRooms}
              width="100%"
            />
          </div>

          {/* Area  */}
          <div style={{ marginBottom: "24px" }}>
            <TextComponent
              label={formatLabel("Area (m²)")}
              placeholder="Enter area"
              value={area}
              setValue={setArea}
              width="100%"
            />
          </div>

          {/* Price */}
          <div style={{ marginBottom: "24px" }}>
            <TextComponent
              label={formatLabel("Price ($)")}
              placeholder="Enter price"
              value={price}
              setValue={setPrice}
              width="100%"
            />
          </div>

          {/* Location  */}
          <div style={{ marginBottom: "30px" }}>
            <TextComponent
              label={formatLabel("Location")}
              placeholder="Enter Location"
              value={location}
              setValue={setLocation}
              width="100%"
            />
          </div>

           <div style={{ marginBottom: "30px" }}>
            <div style={{ 
              fontWeight: 500, 
              marginBottom: "8px", 
              fontSize: "14px", 
              color: "gray" 
            }}>
              {formatLabel("Property images")}
            </div>
            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "20px",  
                padding: "40px",
                textAlign: "center",
                backgroundColor: "#ffffff",
                cursor: "pointer"
              }}
              onClick={() => document.getElementById('imageInput').click()}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = focusColor}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
            >
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "20px",  
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 15px auto"
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              
              <div style={{ fontSize: "16px", color: "#64748b" }}>
                Click or drag to upload images
              </div>
              <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "8px" }}>
                You can select multiple images (JPG, PNG)
              </div>
            </div>

            {images.length > 0 && (
              <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
                {images.map((image, index) => (
                  <div key={index} style={{ position: "relative", width: "80px", height: "80px" }}>
                    <img
                      src={image}
                      alt="preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} // نفس borderRadius
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        width: "22px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        cursor: "pointer"
                      }}
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={buttonStyle}
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;