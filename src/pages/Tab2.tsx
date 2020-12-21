import React from 'react';
import { IonContent, IonHeader, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import epg from '../data/epg.json';

let data = {...epg};




const Tab2: React.FC = () => {
  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Programacion TV</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonLabel>{data.title}</IonLabel>
          <IonList>
          </IonList>

        </IonContent>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
