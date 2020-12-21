import React from 'react';
import ReactDOM from 'react-dom';
import { IonContent, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Epg.css';
import * as data from '../data/epg.json';

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
let daySelected = 14;

export default class Epg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            epg: data,
            tvShow: ""
        };
        this.printData = this.printData.bind(this);
    }

    daysToRender() {
        let ranges = [];

        function toDateTime(secs) {
            var t = new Date(1970, 0, 1);
            t.setSeconds(secs);
            return t;
        }
        function secondsToDate(show) {
            let day = this.toDateTime(show.spa.start);
        }
        function getDay(show) {
            let day = toDateTime(show.spa.start);
            day = day.toString().split(" ")[2];//Day tiene el dia exacto
        }

        //Recorremos el array y sacamos la fecha y la convertimos a date
        Object.values(data.events).map((item) => {
            //Item contiene spa
            getDay(item);
            ranges.push(toDateTime(item.spa.start))//Aqui tenemos todos los dias sin formatear
        });

        //Cogemos los dias en el que se emite los programas
        let days = ranges.map((item) => {
            let aux = item.toString().split(" ");
            return aux[2];
        });

        //Eliminamos duplicados de days
        days = days.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        //Lo que pintamos en el menu
        let daysToRender = days.map((item) => {
            return (<p onClick={() => this.setState({ tvShow: this.printData(item) })} className="menu-day">Day: {item}</p>) 
        });
        return daysToRender;

    }

    printData(day=14) {
        //////
        function getDay(show) {
            let day = toDateTime(show.spa.start);
            return day = day.toString().split(" ")[2];//Day tiene el dia exacto
            
        }
        function toDateTime(secs) {
            var t = new Date(1970, 0, 1);
            t.setSeconds(secs);
            return t;
        }
        ////////

        let shows = data.default.events
        let showsFilter = [];

        let showFiltered=Object.values(shows).map((item) =>{
            let dayActual=getDay(item);
            if(dayActual==day){
                showsFilter.push(item);
            }
            
        });

        let listData = Object.values(showsFilter).map((item) =>
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

        this.setState( {tvShow:listData} );
        return listData;
    }


    render() {
        
        return (
            <IonContent>
                <div className="days-nav" >

                    {this.daysToRender()}
                </div>

                <IonSlides id="shows" pager={true} options={slideOpts}>
                    {this.state.tvShow}
                </IonSlides>

            </IonContent>
        )
    }
}    