import React, { useState } from "react";
import TextComponent from "../components/TextComponents";

function Edit({ post, onSave, onCancel }) {
  const [propertyType, setPropertyType] = useState(post?.propertyType || "Store");
  const [description, setDescription] = useState(post?.description || "");
  const [rooms, setRooms] = useState(post?.rooms || "");
  const [area, setArea] = useState(post?.area || "");
  const [price, setPrice] = useState(post?.price || "");
  const [location, setLocation] = useState(post?.location || "");
  const [images, setImages] = useState(post?.images || []);

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
    onSave({
      id: post?.id,
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
  const editColor = "#6366f1";
  const editShadow = "rgba(99, 102, 241, 0.4)";

  const saveButtonStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor: editColor,
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    boxShadow: `0 4px 12px ${editShadow}`
  };

  const cancelButtonStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)"
  };

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "30px",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{
        backgroundColor: editColor,
        padding: "15px 20px",
        borderRadius: "20px",
        marginBottom: "25px",
        textAlign: "left"
      }}>
        <h2 style={{ 
          color: "white", 
          margin: 0, 
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          Edit Post
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div style={{ marginBottom: "20px" }}>
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
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
            }}
          >
            <option value="Store">Store</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <TextComponent
            label={formatLabel("Description")}
            placeholder="Describe your property..."
            value={description}
            setValue={setDescription}
            width="100%"
          />
        </div>

        {/* Rooms  */}
        <div style={{ marginBottom: "20px" }}>
          <TextComponent
            label={formatLabel("Rooms")}
            placeholder="Enter number of rooms"
            value={rooms}
            setValue={setRooms}
            width="100%"
          />
        </div>

        {/* Area */}
        <div style={{ marginBottom: "20px" }}>
          <TextComponent
            label={formatLabel("Area (m²)")}
            placeholder="Enter area"
            value={area}
            setValue={setArea}
            width="100%"
          />
        </div>

        {/* Price  */}
        <div style={{ marginBottom: "20px" }}>
          <TextComponent
            label={formatLabel("Price ($)")}
            placeholder="Enter price"
            value={price}
            setValue={setPrice}
            width="100%"
          />
        </div>

        {/* Location  */}
        <div style={{ marginBottom: "20px" }}>
          <TextComponent
            label={formatLabel("Location")}
            placeholder="Enter Location"
            value={location}
            setValue={setLocation}
            width="100%"
          />
        </div>

        {/* Images */}
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
              padding: "30px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              cursor: "pointer",
              marginBottom: "15px"
            }}
            onClick={() => document.getElementById('editImageInput').click()}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = focusColor}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
          >
            <input
              id="editImageInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "20px", 
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px auto"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              Click or drag to upload images
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "5px" }}>
              You can select multiple images (JPG, PNG)
            </div>
          </div>

          {images.length > 0 && (
            <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
              {images.map((image, index) => (
                <div key={index} style={{ position: "relative", width: "70px", height: "70px" }}>
                  <img
                    src={image}
                    alt="preview"
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      borderRadius: "20px"  
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
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

         
        <div style={{ display: "flex", gap: "15px" }}>
          <button type="submit" style={saveButtonStyle}>Save Changes</button>
          <button type="button" onClick={onCancel} style={cancelButtonStyle}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;