import React from 'react';
import ReactDOM from 'react-dom';
import { IonContent,IonSlide,IonSlides,IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Epg.css';
import * as data from '../data/epg.json';
import { list } from 'ionicons/icons';


export default class Epg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            epg: data,
            tvShow: ""
        };
        this.changeTv=this.changeTv.bind(this);
    }

    changeTv(data){
      this.setState({
        tvShow: data
      });
    }
    

    render() {
        let dayShow="14"; //The day we will show
        let day14=new Array();
        let day15=new Array();
        let day16=new Array();
        let day17=new Array();
        let day18=new Array();


        const data = this.state.epg.default;

        let ranges = new Array();

        //Function to parse seconds to date format
        function toDateTime(secs) {
          var t = new Date(1970, 0, 1);
          t.setSeconds(secs);
          return t;
        }

        //Function to extract the day of a show with date format
        function getDay(show){
          //Sacar el dia en el que se emite y meterlo en el array adecuado
          let day=toDateTime(show.spa.start);
          day=day.toString().split(" ")[2];
          switch(day){
            case "14":
              day14.push(show);
              break;
            case "15":
              day15.push(show);
              break;
            case "16":
              day16.push(show);
              break;
            case "17":
              day17.push(show);
              break;
            case "18":
              day18.push(show);
              break;
          }
        }

        

        //Convertimos los segundos a fecha
        Object.values(data.events).map((item) => {
          getDay(item);
          ranges.push(toDateTime(item.spa.start))
        });
        
        //Cogemos los dias en el que se emite los programas
        let days=ranges.map((item)=>{
          let aux=item.toString().split(" ");
          return aux[2];
        });

        //Cogemos solamente un dia por programa, es decir, no cogemos duplicados
        days = days.filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        })

        //Lo que pintamos en el menu
        let daysToRender=days.map((item)=>{
          return(<p className="menu-day">Day: {item}</p>)
        });

        


        //Aqui detectamos el click para cambiar de dia
      let dayButtonsHTML=document.getElementsByClassName('menu-day');
      console.log('-------------------')
      for(let item of dayButtonsHTML){
        item.onclick=()=>{
          //Aqui decimos que dia pintamos
          dayShow=item.innerHTML.split("Day: ")[1];
          // listShows();
        }
      }
   
   

      function listShows(){
       
        console.log("Day to show ",dayShow);
        let dataToShow=new Array();
        switch(dayShow){
          case "14":
            dataToShow=day14;
            break;
          case "15":
            dataToShow=day15;
            break;
          case "16":
            dataToShow=day16;
            break;
          case "17":
            dataToShow=day17;
            break;
          case "18":
            dataToShow=day18;
            break;
          default:
            dataToShow=day14;
            break;
        }
        
        console.log("DATA TO SHOW------");
        console.log(dataToShow);


          let listData = Object.values(dataToShow).map((item) =>

              <IonSlide key={item.spa.id}>
                  <h2>{data.title}</h2>
                  <div>{item.spa.name}</div>
                  <h3>Descripcion</h3>
                  <article>
                      <p>prueba prueba prueba prueba prueba </p>
                      <p>prueba prueba prueba prueba prueba </p>
                      <p>prueba prueba prueba prueba prueba </p>
                      <p>prueba prueba prueba prueba prueba </p>
                      <p>prueba prueba prueba prueba prueba </p>
                      <p>prueba prueba prueba prueba prueba </p>
                      <p>prueba prueba prueba prueba prueba </p>
                  </article>
              </IonSlide> 
          );

 
          console.log("Nueva data: listData")
          console.log(listData);
          // debugger
          return listData;
      }


        

        const slideOpts = {
            slidesPerView: 4,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
            on: {
              beforeInit() {
                const swiper = this;
          
                swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
                swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
          
                swiper.params.watchSlidesProgress = true;
                swiper.originalParams.watchSlidesProgress = true;
              },
              setTranslate() {
                const swiper = this;
                const {
                  width: swiperWidth, height: swiperHeight, $wrapperEl
                } = swiper;
               
                const isHorizontal = swiper.isHorizontal();
                const transform$$1 = swiper.translate;
                const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
                
               
          
                 // Set correct perspective for IE10
                if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
                  const ws = $wrapperEl[0].style;
                  ws.perspectiveOrigin = `${center}px 50%`;
                }
              },
              setTransition(duration) {
                const swiper = this;
                swiper.slides
                  .transition(duration)
                  .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                  .transition(duration);
              }
            }
          }
          /////
         

          listShows();
        return (
            <IonContent>
              {/* {dayShow} */}
              <div className="days-nav" onClick={()=>this.setState( {tvShow:listShows()} ) }>
              {daysToRender}
              </div>
                
                <IonSlides id="shows" pager={true} options={slideOpts}>
                  {this.state.tvShow}
                </IonSlides>
               
            </IonContent>
        )
    }
};








///////////////////7



