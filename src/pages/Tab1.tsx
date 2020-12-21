import React from 'react';
import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Epg from '../components/Epg'

const Tab1: React.FC = () => {
  return (
    <>

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Programacion TV</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <Epg />
      </IonContent>


     
    </IonPage>
    </>
  );
};

export default Tab1;
