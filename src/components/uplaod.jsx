import ClearIcon from '@mui/icons-material/Clear';
export default function Upload({ image, setImage }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding:"10% 0px 10% 0",
        borderRadius:"20px",
        position:"relative",
      }}
    >
    <ClearIcon
    onClick={()=>{setImage(null)}}
     style={{
        position:"absolute",
        left:"calc(50% - 125px)",
        top:"calc(50% - 150px)",
        cursor:"pointer",
        display:image?"block":"none",
        fontSize:"30px",
        color:"#8371f9"
    }}  />
      <input
        type="file"
        id="upload"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
        style={{
          display: "none",
        }}
      />

      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover",
            borderRadius: "50%",
            border:"3px solid #8371f9",
            boxShadow:"0px 5px 20px -6px"
          }}
        />

      ) : (
        <label
          htmlFor="upload"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "250px",
            height: "200px",
            border: "2px dashed gray",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          <img src="/images/ant-design_cloud-upload-outlined.png" alt="" />
          <p>select your image</p>
        </label>
      )}
    </div>
  );
}
