import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import withScorm from './scormServices/withScorm';
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Loader from "./components/Loader";
import Frontpage from './slides/Frontpage';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';
import Slide16 from './slides/Slide16';
import Slide17 from './slides/Slide17';
import Slide18 from './slides/Slide18';
import Slide19 from './slides/Slide19';
import Slide20 from './slides/Slide20';
import Slide21 from './slides/Slide21';
import Slide22 from './slides/Slide22';
import Slide23 from './slides/Slide23';
import Slide24 from './slides/Slide24';
import Slide25 from './slides/Slide25';
import Slide26 from './slides/Slide26';
import Slide27 from './slides/Slide27';
import Slide28 from './slides/Slide28';
import Slide29 from './slides/Slide29';
import Slide30 from './slides/Slide30';
import Slide31 from './slides/Slide31';
import Slide32 from './slides/Slide32';
import Slide33 from './slides/Slide33';
import Slide34 from './slides/Slide34';
import Slide35 from './slides/Slide35';
import Slide36 from './slides/Slide36';
import Slide37 from './slides/Slide37';
import Slide38 from './slides/Slide38';
import Slide39 from './slides/Slide39';
import Slide40 from './slides/Slide40';
import Slide41 from './slides/Slide41';
import Slide42 from './slides/Slide42';
import Slide43 from './slides/Slide43';
import Slide44 from './slides/Slide44';
import Slide45 from './slides/Slide45';
import Slide46 from './slides/Slide46';
import Slide47 from './slides/Slide47';
import Slide48 from './slides/Slide48';
import Slide49 from './slides/Slide49';
import Slide50 from './slides/Slide50';
import Slide51 from './slides/Slide51';
import Slide52 from './slides/Slide52';
import Slide53 from './slides/Slide53';
import Slide54 from './slides/Slide54';
import Slide55 from './slides/Slide55';
import Slide56 from './slides/Slide56';
import Slide57 from './slides/Slide57';
import Slide58 from './slides/Slide58';
import Slide59 from './slides/Slide59';
import Slide60 from './slides/Slide60';
import Slide61 from './slides/Slide61';
import Slide62 from './slides/Slide62';
import Slide63 from './slides/Slide63';
import Slide64 from './slides/Slide64';

import Slide99 from './slides/Slide99';
import Slide100 from './slides/Slide100';
import Slide101 from './slides/Slide101';
import Slide102 from './slides/Slide102';
import Slide103 from './slides/Slide103';
import Slide103bis from './slides/Slide103bis';
import Slide104 from './slides/Slide104';

export const pages = [
    { title: "Portada", component: Frontpage, name: 'Frontpage'},
    { title: "Presentación", component: Slide2, name: 'Slide2'},
    { title: "Mapa conceptual", component: Slide3, name: 'Slide3'},
    { title: "Video", component: Slide4, name: 'Slide4'},
    { title: "", component: Slide5, name: 'Slide5'},
    { title: "Marketing personal", component: Slide6, name: 'Slide6', item: '1'},
    { title: "Video", component: Slide7, name: 'Slide7'},
    { title: "", component: Slide8, name: 'Slide8'},
    { title: "1.1 Define tu marca personal", component: Slide9, name: 'Slide9'},
    { title: "1.2 Antes de la presentación", component: Slide10, name: 'Slide10'},
    { title: "", component: Slide11, name: 'Slide11'},
    { title: "", component: Slide12, name: 'Slide12'},
    { title: "", component: Slide13, name: 'Slide13'},
    { title: "", component: Slide14, name: 'Slide14'},
    { title: "1.3 Construye una estrategia de marketing profesional", component: Slide15, name: 'Slide15'},
    { title: "", component: Slide16, name: 'Slide16'},
    { title: "", component: Slide17, name: 'Slide17'},
    { title: "", component: Slide18, name: 'Slide18'},
    { title: "1.4 Prepara un pitch personal", component: Slide19, name: 'Slide19'},
    { title: "", component: Slide20, name: 'Slide20'},
    { title: "", component: Slide21, name: 'Slide21'},
    { title: "1.5 Actividad de refuerzo", component: Slide22, name: 'Slide22'},
    { title: "1.6 Recapitulando", component: Slide23, name: 'Slide23'},
    { title: "Herramientas para la búsqueda de prácticas o empleo", component: Slide24, name: 'Slide24', item: '2'},
    { title: "Video", component: Slide25, name: 'Slide25'},
    { title: "", component: Slide26, name: 'Slide26'},
    {title: "2.1 Elaborar un plan de búsqueda de oportunidades laborales", component: Slide27, name: 'Slide27'},
    { title: "", component: Slide28, name: 'Slide28'},
    { title: "", component: Slide29, name: 'Slide29'},
    { title: "", component: Slide30, name: 'Slide30'},
    { title: "", component: Slide31, name: 'Slide31'},
    { title: "2.2 Currículum Vitae", component: Slide32, name: 'Slide32'},
    { title: "", component: Slide33, name: 'Slide33'},
    { title: "", component: Slide34, name: 'Slide34'},
    { title: "Video", component: Slide35, name: 'Slide35'},
    { title: "2.3 LinkedIn como herramienta de Networking", component: Slide36, name: 'Slide36'},
    { title: "", component: Slide37, name: 'Slide37'},
    { title: "", component: Slide38, name: 'Slide38'},
    { title: "2.4 Actividades de refuerzo", component: Slide39, name: 'Slide39'},
    { title: "2.5 Recapitulando", component: Slide40, name: 'Slide40'},
    { title: "La entrevista laboral en un proceso de selección", component: Slide41, name: 'Slide41', item: '3'},
    { title: "Video", component: Slide42, name: 'Slide42'},
    { title: "3.1 El proceso de selección", component: Slide43, name: 'Slide43'},
    { title: "", component: Slide44, name: 'Slide44'},
    { title: "3.2 La entrevista laboral", component: Slide45, name: 'Slide45'},
    { title: "", component: Slide46, name: 'Slide46'},
    { title: "3.3 Tipos de entrevistas laborales", component: Slide47, name: 'Slide47'},
    { title: "", component: Slide48, name: 'Slide48'},
    { title: "", component: Slide49, name: 'Slide49'},
    { title: "", component: Slide50, name: 'Slide50'},
    { title: "3.4 Preguntas y respuestas en una entrevista laboral", component: Slide51, name: 'Slide51'},
    { title: "", component: Slide52, name: 'Slide52'},
    { title: "", component: Slide53, name: 'Slide53'},
    { title: "", component: Slide54, name: 'Slide54'},
    { title: "", component: Slide55, name: 'Slide55'},
    { title: "", component: Slide56, name: 'Slide56'},
    { title: "3.5 Método STAR", component: Slide57, name: 'Slide57'},
    { title: "", component: Slide58, name: 'Slide58'},
    { title: "3.6 Actividad de refuerzo", component: Slide59, name: 'Slide59'},
    { title: "3.7 Recapitulando", component: Slide60, name: 'Slide60'},
    { title: "Video", component: Slide61, name: 'Slide61'},
    { title: "Video", component: Slide62, name: 'Slide62'},
    { title: "Video", component: Slide63, name: 'Slide63'},
    { title: "Infografia", component: Slide64, name: 'Slide64'},

   
    { title: "Adivina la palabra", component: Slide99, name: 'Slide99'},
    { title: "Glosario", component: Slide100, name: 'Slide100'},
    { title: "Evaluación", component: Slide101, name: 'Slide101'},
    { title: "Links de interés", component: Slide102, name: 'Slide102'},
    { title: "Bibliografía", component: Slide103, name: 'Slide103'},
    { title: "Video", component: Slide103bis, name: 'Slide103bis'},
    { title: "Créditos", component: Slide104, name: 'Slide104'}
]

class App extends Component {

    constructor() {
        super()
        this.state = {
            loading: true
        }
    }
    
    componentDidMount() {
        setTimeout(()=> {this.setState({loading: false})}, 3500)
    }

    render() {

        const {currentPage} = this.props.sco;

        return (
            <div className="App">
                <Header />
                <SideMenu />
                <Redirect
                    from="/"
                    to={ `/${currentPage}` } />
                <Switch>
                    <Route exact path="/" component={pages[0].component} />
                    {
                        pages.map((page, index) => {
                            return (<Route key={index} exact path={"/" + (index + 1)} component={page.component} />)
                        })
                    }
                    <Route>
                        <h1>Página no encontrada</h1>
                    </Route>
                </Switch>
                <Footer />
                {this.state.loading ? <Loader /> : ''}
            </div>
        );
    }
}

export default withScorm()(App);