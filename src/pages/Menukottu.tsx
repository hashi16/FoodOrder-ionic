import {   IonBackButton, IonButton, IonButtons,  IonContent, IonHeader,  IonImg, IonItem, IonLabel, IonList,   IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';


// type Item = {
//   url: string;
//   text: string;
// };

// const items: Item[] = [
//   { 
//     url: 'http://placekitten.com/g/200/300',
//    text: 'a picture of a cat' 
//   },
//   {
//     url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Flife-style%2Frelationships%2Fpets%2F5-things-that-scare-and-stress-your-cat%2Farticleshow%2F67586673.cms&psig=AOvVaw271KTG22JXf-flOzCI_BP7&ust=1600862034785000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNi4t-fZ_OsCFQAAAAAdAAAAABAJ/200/300',
//    text: 'a picture of a oio' 
//   },
//   {
//     url: '../../assets/images/homeimage.jpg',
//     text: 'nnus' 
//    },


// ];


const Menukottu: React.FC = () => {
  const[kottu, setKottu]=useState<any[]>([]) 
 

    
 useEffect(() => {
  const ref = db.collection('menu').doc("fdypAS9P3pe34Xs8ZGG9").collection('types');
  ref.get().then((snapshot:any) => {
    const kottu = snapshot.docs.map((doc:any) => ({
      id:doc.id,
      ...doc.data(),
    }));
    setKottu(kottu);
  })
}, [])
  return (
    <IonPage>
        <IonHeader>
          <IonToolbar color="light">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/menu"/>
            </IonButtons>
            <IonTitle><b>KOTTU</b></IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
        <IonList>
      {kottu.map((image, i) => (
        <IonItem key={i}>
          <IonThumbnail slot="start">
          <IonImg src={image.url }/>
          </IonThumbnail>
          <IonLabel>{image.text}</IonLabel>
          <IonButton routerLink={image.link}>Customize</IonButton>
        </IonItem>
      ))}
    </IonList>   

     
        </IonContent>
    </IonPage>
  );
};

export default Menukottu;
