import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonSlide, IonSlides, IonText, IonTitle, IonToolbar, } from '@ionic/react';
import { addCircle, addCircleOutline, atCircleOutline, bicycleSharp, informationCircle, pin, pulseOutline, removeCircle, removeCircleOutline, removeCircleSharp, text, textOutline, walk, warning, wifi, wine } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';
import { db } from '../firebaseConfig';

import { connect } from 'react-redux';


import '../theme/Desc.css';
import { toast } from '../toast';

 
const DescSamosa: React.FC = () => {

  const[desrice, setDescrice]=useState<any[]>([]) ;
  const[type, setType] =useState<any[string]>([]);
  const[title, setTitle] =useState("");
  const[price, setPrice] =useState<any[number]>([]);
  const[url,setUrl] = useState("");
  const[qty, setQty] = useState<any[number]>([]);
  const[total,setTotal] = useState<any[number]>([]);
  const[time,setTime] = useState("");
  const[date,setDate] = useState("");
 
 async function submit(e:any){
  e.preventDefault();

  if( qty == '' )
     {      
      return toast('Fields are required');
     } 

  db.collection('cart').doc("samosa").set({          //.doc("basmathi rice").
      
    title:'SAMOSA',
    price:'30.00',
    url:'../../assets/images/shorteats/samosa.jpg' ,
    qty:qty,
    total:30.00*qty,
    time:time,
    date:date
    

  })
  .then(() => {
    
    alert("Add to Cart Successfully");
  })
  .catch((error) => {
    alert(error.message);
  });

  // db.collection("total").add({
  //   total:total
  // })
  setQty("");
  
  setTime("");
  setDate("");
  
}

  useEffect(() => {
    const ref = db.collection('descSamosa');
    ref.get().then((snapshot:any) => {
      const desrice = snapshot.docs.map((doc:any) => ({
        id:doc.id,
        ...doc.data(),
      }));
      setDescrice(desrice);
    })
  }, [])
  
  return (
    <IonPage >
        
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/menu"/>
            </IonButtons>
          <IonTitle>Description</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {desrice.map((menu, i)=> (
          <IonRow key={i}>
          <IonCol  >
          <IonCard >
           <IonItem lines="inset">
             <IonCardHeader ><b>{menu.title}</b></IonCardHeader>
             <IonButton color="danger" fill="outline" slot="end" disabled>Rs.{menu.price}</IonButton>
           </IonItem>
          
       
          <IonItem>           
            <IonLabel><IonImg src={menu.url}></IonImg></IonLabel>        
          </IonItem>

          <IonCardContent>
            <IonLabel color="primary">Add On :</IonLabel>
                {menu.add}  <br/>
           <IonLabel color="primary">Serving Time:	</IonLabel>
           <IonText>  11.00AM - 11.00PM</IonText>
             <br />
           <IonLabel color="primary">Delivery </IonLabel>
           <IonText> Delivery Available.</IonText>
          </IonCardContent>
         
        </IonCard>

        <IonCard>
          
            <IonItem lines="none">
                <IonLabel slot="end">Quantity</IonLabel>
                <IonInput slot="end" placeholder="Enter Qty" value={qty}
              onIonChange={(e:any) => setQty(e.detail.value)} type="number"></IonInput>
            </IonItem>
           
            <IonItem lines="none" >                       
               <IonLabel><IonIcon icon={bicycleSharp} />Arriving Date: <IonInput type="date" value={date} onIonChange={(e:any) => setDate(e.detail.value)} /> </IonLabel>           
            </IonItem>  
            
            <IonItem lines="none">
              <IonLabel><IonIcon icon={bicycleSharp} />Arriving Time: <IonInput type="time" value={time} onIonChange={(e:any) => setTime(e.detail.value)} />  </IonLabel>
            </IonItem>
            
            
        </IonCard>
        

    
        {/* </IonItem> */}
        <IonItem lines="none">
          <IonButton slot="end" /*routerLink="../cart" */className="cartBtn" 
            onClick={submit}>Add to Cart</IonButton>
        </IonItem>
        

          </IonCol>
        </IonRow>

        ))}
        <IonInput  value={title} onIonChange={(e:any) => setTitle(e.detail.value)} ></IonInput>
         <IonInput  value={url} onIonChange={(e:any) => setUrl(e.detail.value)} ></IonInput>
         <IonInput  value={total} onIonChange={(e:any) => setTotal(e.detail.value)}></IonInput>  
         <IonInput  value={price} onIonChange={(e:any) => setPrice(e.detail.value)}> </IonInput>     
      </IonContent>

      {/* footer */}

      <Footer/>
    </IonPage>
  );
};

export default DescSamosa;