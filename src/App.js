import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import withScorm from './services/withScorm';

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

import Slide99 from './slides/Slide99';
import Slide100 from './slides/Slide100';
import Slide101 from './slides/Slide101';
import Slide102 from './slides/Slide102';
import Slide103 from './slides/Slide103';
import Slide104 from './slides/Slide104';
import Slide105 from './slides/Slide105';

import i18n from './services/translations/i18n';

export const pages = [
    { title: i18n.t('frontpageTitle'), component: Frontpage, name: 'Frontpage'},
    { title: i18n.t('presentationTitle'), component: Slide2, name: 'Slide2'},
    { title: i18n.t('conceptMapTitle'), component: Slide3, name: 'Slide3'},
    { title: "Layout", component: Slide4, name: 'Slide4'},
    { title: "Textos", component: Slide5, name: 'Slide5'},
    { title: "Textos", component: Slide6, name: 'Slide6'},
    { title: "Textos", component: Slide7, name: 'Slide7'},
    { title: "Textos", component: Slide8, name: 'Slide8'},
    { title: "Textos", component: Slide9, name: 'Slide9'},
    { title: "Textos", component: Slide10, name: 'Slide10'},
    { title: "Textos", component: Slide11, name: 'Slide11'},
    { title: "Imágenes", component: Slide12, name: 'Slide12'},
    { title: "Imágenes", component: Slide13, name: 'Slide13'},
    { title: "<i>Flip cards</i>", component: Slide14, name: 'Slide14'},
    { title: "<i>Accordion</i>", component: Slide15, name: 'Slide15'},
    { title: "Tabla", component: Slide16, name: 'Slide16'},
    { title: "Modales", component: Slide17, name: 'Slide17'},
    { title: "<i>Timeline</i>", component: Slide18, name: 'Slide18'},
    { title: "Preguntas", component: Slide19, name: 'Slide19'},
    { title: "Preguntas", component: Slide20, name: 'Slide20'},
    { title: "Preguntas", component: Slide21, name: 'Slide21'},
    { title: "Vídeo", component: Slide22, name: 'Slide22'},
    { title: "Asociando términos", component: Slide23, name: 'Slide23'},   
    { title: i18n.t('donutTitle'), component: Slide99, name: 'Slide99'},
    { title: i18n.t('glossaryTitle'), component: Slide100, name: 'Slide100'},
    { title: i18n.t('evaluationTitle'), component: Slide101, name: 'Slide101'},
    { title: i18n.t('interestingLinksTitle'), component: Slide102, name: 'Slide102'},
    { title: i18n.t('bibliographyTitle'), component: Slide103, name: 'Slide103'},
    { title: i18n.t('valorationTitle'), component: Slide104, name: 'Slide104'},
    { title: i18n.t('creditsTitle'), component: Slide105, name: 'Slide105'}
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