"use client"
import { useEffect, useState } from "react"
// import { updateProfile } from 'firebase/auth'
import { Download } from "lucide-react"
import { db, storage } from "@/app/config/firebase"
import { uploadBytesResumable, ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { addDoc, getDocs, collection, arrayUnion, Timestamp } from 'firebase/firestore'
import AdminSideBar from "@/components/AdminSideBar"
import { useRouter } from "next/router"


const Page = () => {
  const [file, setFile] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [product, setProduct] = useState([])
//   const navigate = useRouter()

  const getProduct = async () => {
    try{
      // const q = query(productCollectionRef, orderBy("", 'asc'))
      const productCollectionRef = collection(db, "Product") 
      const data = await getDocs(productCollectionRef);
      const filData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setProduct(filData)
    } catch (err){
      console.error(err)
    }
  };
  getProduct();

  useEffect(() => {
    
  })





  // const uploadFiles = (e) => {
  //   e.preventDefault();

  //   const files = e.target.files; // Get selected files
  //   const downloadURLs = []; // Array to store download URLs
  //   const productCollectionRef = collection(db, "Product");

  //   const uploadNextFile = (index) => {
  //       if (index >= files.length) {
  //           // All files processed, add document to Firestore
  //           addDoc(productCollectionRef, {
  //               Title: "Sample Title", // Replace with actual value
  //               Price: Number(10), // Replace with actual value
  //               Category: "Sample Category", // Replace with actual value
  //               photoURL: arrayUnion(...downloadURLs), // Add all URLs
  //               Description: "Sample Description", // Replace with actual value
  //               Date: new Date(),
  //           })
  //           .then(() => {
  //               console.log("Document successfully written!");
  //           })
  //           .catch((error) => {
  //               console.error("Error adding document:", error);
  //           });
  //           return;
  //       }

  //       const file = files[index];
  //       const metadata = {
  //           contentType: 'image/jpeg',
  //       };

  //       const storageRef = ref(storage, `images/${file.name}`);
        
  //       // Use uploadBytes instead of uploadBytesResumable
  //       uploadBytes(storageRef, file, metadata).then((snapshot) => {
  //           console.log(`${file.name} uploaded successfully!`);

  //           // Get the download URL after the upload is complete
  //           getDownloadURL(snapshot.ref).then((downloadURL) => {
  //               downloadURLs.push(downloadURL); // Store the URL
  //               uploadNextFile(index + 1); // Upload the next file
  //           });
  //       }).catch((error) => {
  //           console.error("Upload error:", error);
  //           uploadNextFile(index + 1); // Continue to the next file even if there's an error
  //       });
  //   };

  //   // Start uploading the first file
  //   uploadNextFile(0);
// };


    const uploadFile = async() =>{
      const metadata = {
        contentType: 'image/jpeg'
      };
      // const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      const imageURLList = [];
      for (let i = 0; i < file?.length; i++){
        const image = file[i];
        const storageRef = ref(storage, `images/${image?.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageURLList.push(url)
      }
      
  
      // uploadTask.on(
      //     (error) => {
      //         console.log(error)
      //     }, 
      //     () => {
          const productCollectionRef = collection(db, "Product") 
          // getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
              await addDoc(productCollectionRef, { Title: newTitle, Price: Number(newPrice), Category: newCategory, photoURL: imageURLList, Description: newDescription, Date: new Date() })
              // navigate("/Product")
          // });
      // })
    }
  
  
  return (
    <>
      <section className="flex">
        <AdminSideBar/>
        <div className="gap-5 pt-20 my-auto mx-auto text-[1rem]">
          <div className="grid gap-3">
            <label className='font-semibold'>Product Name <span className='text-Pink'>*</span></label>
            <input className='lg:w-[500px] w-[320px] outline-none font-semibold border-Grey pl-3 h-14 rounded border' placeholder="Product Name" type="text" onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div className='grid gap-3'>  
            <label className='font-semibold pt-5'>Product Price <span className='text-Pink'>*</span></label>
            <input className='lg:w-[500px] w-[320px] outline-none font-semibold border-Grey pl-3 h-14 rounded border' placeholder="Product Price" type="text" onChange={(e) => setNewPrice(e.target.value)} />
            </div>
            <div className='grid gap-3'>
                <label className='font-semibold pt-5'>Product Category <span className='text-Pink'>*</span></label>
                <input className='lg:w-[500px] w-[320px] outline-none font-semibold border-Grey pl-3 h-14 rounded border' placeholder="Product Category" type="text" onChange={(e) => setNewCategory(e.target.value)} />
            </div>
            <div className='grid gap-3'>
                <label className='font-semibold pt-5'>Product Description <span className='text-Pink'>*</span></label>
                <textarea className='lg:w-[500px] w-[320px] h-[15rem] outline-none font-semibold border-Grey pl-3 pt-5 rounded border' placeholder="Product Description" type="text" onChange={(e) => setNewDescription(e.target.value)} />
            </div>
          <div className='grid pt-5 gap-3'>
            <input onChange={(e) => {
              const newFiles = [];
              for (let i = 0; i < e.target.files.length; i++){
                newFiles.push(e.target.files[i])
              }
              setFile(newFiles)}} className="hidden" type="file" multiple name="" id="file" />
            <label  className="flex cursor-pointer mb-5 font-semibold gap-3 items-center" htmlFor="file">
              <Download/>
              <p >Add your Avater</p>
            </label>
          </div>
          <button className='lg:w-[500px] w-[320px] bg-primary h-14 font-semibold text-[1rem] text-white rounded' onClick={uploadFile}>Upload File</button>
        </div>
      </section>
    </>
  )
}
//   return (
//     <>
//     <section className="flex">
//       <Admin/>
//             <div className="mx-auto my-auto">
//               <div className='gap-5'>
//                 <div className='grid gap-3'>
//                   <label className='font-semibold'>Product Name <span className='text-Pink'>*</span></label>
//                   <input className='lg:w-[500px] w-[320px] outline-none font-semibold text-xl border-Grey pl-3 h-14 rounded border' placeholder="Product Name" type="text" onChange={(e) => setNewTitle(e.target.value)} />
//                 </div>
//                 <div className='grid gap-3'>  
//                   <label className='font-semibold pt-5'>Product Price <span className='text-Pink'>*</span></label>
//                   <input className='lg:w-[500px] w-[320px] outline-none font-semibold text-xl border-Grey pl-3 h-14 rounded border' placeholder="Product Price" type="text" onChange={(e) => setNewPrice(e.target.value)} />
//                 </div>
//                 <div className='grid gap-3'>
//                   <label className='font-semibold pt-5'>Product Category <span className='text-Pink'>*</span></label>
//                   <input className='lg:w-[500px] w-[320px] outline-none font-semibold text-xl border-Grey pl-3 h-14 rounded border' placeholder="Product Category" type="text" onChange={(e) => setNewCategory(e.target.value)} />
//                 </div>
//                 <div className='grid pt-5 gap-3'>
//                   <input className="hidden" type="file" name="" id="file" />
//                   <label onChange={(e) => {setFile(e.target.files[0])}} className="flex cursor-pointer mb-5 font-semibold gap-3 items-center" htmlFor="file">
//                     <img className="w-10" src={photo} alt="" />
//                     <p >Add your Avater</p>
//                   </label>
//                 </div>
//               </div>
//               <button className='lg:w-[500px] w-[320px] bg-Pink h-14 font-semibold text-xl text-White rounded' type='submit' onClick={uploadFile}>Submit</button>
//             </div>
//       </section>
//     </>
//   )
// }

export default Page