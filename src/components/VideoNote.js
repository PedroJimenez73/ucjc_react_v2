import React, { Component } from 'react'
import withScorm from '../scormServices/withScorm';
import autoBind from 'react-autobind';
import jsPDF from 'jspdf';
import generalInfo from '../data/generalInfo';
import logo from '../img/logos/logo.jpg';

class VideoNote extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            videoNoteText: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        //this.getData()
    }

    getData() {
        const {currentPage, cmiDataState} = this.props.sco;
        if (cmiDataState.videoNotesPagesData && cmiDataState.videoNotesPagesData[currentPage - 1] !== '') {
            this.setState({videoNoteText: cmiDataState.videoNotesPagesData[currentPage - 1]})
        }
    }

    onChange = (event) => {
        const {currentPage, setVideoNote} = this.props.sco;
        this.setState({videoNoteText: event.target.value}, ()=> {
            setVideoNote(currentPage - 1, this.state.videoNoteText)
        })
    }

    render() {
        function getDateEs() {
            var date = new Date();
            var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            var days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
            return days[date.getDay()] + ', ' + date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear();
        }

        const downloadNotes = () => {
            const doc = new jsPDF();
            doc.addImage(logo, 10, 8, 30, 14.32);
            doc.setFontSize(14)
            doc.setTextColor(83, 104, 120)
            doc.text(generalInfo.degree , 10, 30);
            doc.text(generalInfo.subject, 10, 38);
            doc.text(generalInfo.title, 10, 46);
            doc.setTextColor(21, 21, 21);
            doc.setFontSize(12)
            doc.text(getDateEs(), 10, 65);
            doc.text('Anotaciones ' + this.props.title, 10, 73);
            doc.setTextColor(36, 36, 36);
            doc.rect(10, 80, 190, 150).stroke('#00BFFF');
            const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
            const splitText = doc.splitTextToSize(this.state.videoNoteText, 170);
            doc.text(splitText, 15, 90);
            if (isIOS) {
                doc.output('dataurlnewwindow', 'apuntes_video_pantalla_' + this.props.videoNumber + '.pdf'); 
            } else {
                doc.save('apuntes_video_pantalla_' + this.props.videoNumber + '.pdf');
            }
        } 

        return (
            <div className="video-note">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum est sapiente enim minus libero eius neque repudiandae quas quo nisi fugit quia ducimus saepe minima suscipit provident vitae ipsa, quod sunt molestias voluptatem porro quae sequi similique! Vitae atque dolore provident quaerat! Libero voluptatibus aliquid sunt, maiores ipsa aperiam amet. */}
                <textarea placeholder="Escriba aquí sus anotaciones"
                          maxLength="450" 
                          onChange={this.onChange}
                          value={this.state.videoNoteText}></textarea>
                <div className="flex j-center a-center m-t">
                    <button className="outline" onClick={downloadNotes}>Descargar en PDF</button>
                </div>
            </div>
        )
    }
}

export default withScorm()(VideoNote);

