import { IoNotificationsCircleSharp } from "react-icons/io5";


export default function NavBar(){
    return(
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            width:"100vw",
            position:"fixed",
            top:"0",
            zIndex:"4",
            height:"70px",
            background:" #ffffff",
  borderRadius: " 0 0 14px 14px",
  boxShadow:"0 0 1px 0"
        }} >
            <div>
                <img src="/images/photo_2026-02-13_01-10-24-removebg-preview.png" alt="" style={{
                    height:"60px"
                }}/>
                
            </div>
            <div
             style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"10px"
             }}
            >
            <p>home</p>
            <p>favorite</p>
            </div>
            <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"10px"}}>
                <IoNotificationsCircleSharp style={{fontSize:"40px"}} />
                <div
                 style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"10px",
            borderLeft:"1px solid gray",
            marginLeft:"5px",
            paddingLeft:"10px",
            marginRight:"10px"
        }}
                >
                    <img
                    style={{
                        height:"50px",
                        border:"1px solid black",
                        borderRadius:"50%"
                    }}
                    src="https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg"
                    alt="" />
                    <h4>allou zaki</h4>
                </div>
            </div>
        </div>
    )
}