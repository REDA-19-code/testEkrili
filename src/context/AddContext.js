import { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = '/property';  // بدون http://localhost:3000
const useAddProperty = () => {
    // the use state to bring information i need
    const [propertyType, setPropertyType] = useState("Store");
    const [description, setDescription] = useState("");
    const [rooms, setRooms] = useState("");
    const [area, setArea] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    // ✅ الطريقة الصحيحة
    const [token, setToken] = useState("");  // الترتيب: [value, setValue]
    // جلب التوكن عند تحميل الكومبوننت
    useEffect(() => {
        setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTdjOTJjY2EzYzI2ZmExYjE4NmY4MCIsImlzTGVzc29yIjp0cnVlLCJpYXQiOjE3NzI5ODM0ODAsImV4cCI6MTc3MzA2OTg4MH0.hrCYmFxkg--AToJEf_JJ1ilSiZ3M63SZinYSIevIqvI");

    }, []); // [] يعني ينفذ مرة واحدة فقط عند تحميل الكومبوننت


    //
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // save the image
        setImageFiles(prevFiles => [...prevFiles, ...files]);

        const resetForm = () => {
            setPropertyType("Store");
            setDescription("");
            setRooms("");
            setArea("");
            setPrice("");
            setLocation("");
            setImages([]);
            setImageFiles([]);
        };
    };

    const handleAddProperty = async () => {
        // prpare the form data that have the information
        const formData = new FormData();

        // the image
        imageFiles.forEach(file => {
            formData.append('images', file);
        });

        // other information
        formData.append('title', `${propertyType} `);
        formData.append('localisation', location);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', propertyType.toLowerCase());
        formData.append('numberOfRooms', rooms);
        formData.append('area', area);
        // the request 
        axios.post(`${API_URL}/create`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {

                console.log("✅ Response data:", response.data);  // هذا هو المهم
                console.log("✅ Response status:", response.status);
                console.log("✅ FormData sent:", formData);



            })
            .catch(error => {

                console.error('خطأ في إضافة العقار:', error);

                if (error.response) {
                    // خطأ من السيرفر
                    const message = error.response.data.message ||
                        error.response.data.error ||
                        'حدث خطأ في السيرفر';
                    console.log(message)
                    console.log("✅ Response data:", error.response);
                }
                else {

                    console.log(error.message);
                }
            });
    }
    return {
        // states
        propertyType,
        description,
        rooms,
        area,
        price,
        location,
        images,


        // setters
        setPropertyType,
        setDescription,
        setRooms,
        setArea,
        setPrice,
        setLocation,

        // functions
        handleImageChange,
        handleAddProperty,  // ✅ هذه هي الدالة المهمة!
    };
}
export default useAddProperty;