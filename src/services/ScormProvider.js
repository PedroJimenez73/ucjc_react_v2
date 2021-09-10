import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { pages } from '../App';

export const ScoContext = React.createContext({});

class ScormProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terminated: false,
            noAPIFound: false,
            currentPage: 1,
            totalPages: 0,
            AlreadyInitialized: false,
            cmiDataState: {
                
            },
        };
        autoBind(this);
    };

    ScanForAPI(win) {
        var API = null,
            nFindAPITries = 0,
            maxTries = 500

        while ((!win.API && !win.API_1484_11) &&
            (win.parent) &&
            (win.parent !== win) &&
            (nFindAPITries <= maxTries)) {

            nFindAPITries++;
            win = win.parent;
        }
        API = win.API_1484_11;
        return API;
    }

    GetAPI(win) {
        var API = null;

        API = this.ScanForAPI(win)

        if ((win.parent !== null) && (win.parent !== win)) {
            API = this.ScanForAPI(win.parent)
        }
        if ((API == null) && (win.opener !== null)) {
            API = this.ScanForAPI(win.opener)
        }
        return API
    }

    initializeCommunication() {
        const myAPI = this.GetAPI(window);

        if (myAPI == null) {
            alert("Error de conexión del Scorm con la plataforma LMS");
            return;
        } else {
            var result = myAPI.Initialize("");

            if (result !== "true") {
                var errorNumber = myAPI.GetLastError();
                var errorString = myAPI.GetErrorString(errorNumber);
                var diagnostic = myAPI.GetDiagnostic(errorNumber);

                var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

                alert("Error de conexión del Scorm con la plataforma LMS" + errorDescription);
            }
        }
        return result;
    }

    terminateCommunication() {
        const myAPI = this.GetAPI(window);

        if (myAPI == null) {
            return "false";
        }
        else {

            if (this.state.terminated !== "true") {

                var result = myAPI.Terminate("");

                if (result !== "true") {
                    var errorNumber = myAPI.GetLastError();
                    var errorString = myAPI.GetErrorString(errorNumber);
                    var diagnostic = myAPI.GetDiagnostic(errorNumber);

                    var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

                    alert("Error de conexión del Scorm con la plataforma LMS" + errorDescription);
                    return "false";
                }
                else {  
                    this.setState({ terminated: true })
                }
            }
        }
        return result;
    }

    retrieveDataValue(name) {
        // do not call a set after finish was called
        if (this.state.terminated !== "true") {
            const myAPI = this.GetAPI(window);

            if (myAPI == null) {
                return "";
            }
            else {
                var value = myAPI.GetValue(name);
                var errCode = myAPI.GetLastError();

                if (errCode !== "0") {
                    var errorString = myAPI.GetErrorString(errCode);
                    var diagnostic = myAPI.GetDiagnostic(errCode);

                    var errorDescription = "Number: " + errCode + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

                    alert("Error de conexión del Scorm con la plataforma LMS" + errorDescription);
                } else {
                    return value;
                }
            }
        }

        return;
    }

    storeDataValue(name, value) {
        // do not call a set after finish was called
        if (this.state.terminated !== "true") {
            const myAPI = this.GetAPI(window);

            if (myAPI == null) {
                return;
            } else {
                var result = myAPI.SetValue(name, value);

                if (result !== "true") {
                    var errorNumber = myAPI.GetLastError();
                    var errorString = myAPI.GetErrorString(errorNumber);
                    var diagnostic = myAPI.GetDiagnostic(errorNumber);

                    var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

                    alert("Error de conexión del Scorm con la plataforma LMS" + errorDescription);
                }
            }
        }

        return;
    }

    componentDidMount() {
        this.setState({totalPages: pages.length});
        let highLightPagesDataArray = [];
        let postitsPagesDataArray = [];
        let videoNotesPagesDataArray = [];
        for(let i=0; i < pages.length; i++) {
            highLightPagesDataArray.push('');
            postitsPagesDataArray.push('');
            videoNotesPagesDataArray.push('');
        }
        const originalCmiDataState = {
            highLightPagesData: highLightPagesDataArray,
            postitsPagesData: postitsPagesDataArray,
            videoNotesPagesData: videoNotesPagesDataArray,
            evaluationData: {
                corrects: null,
                questionsNumber: null,
                attemps: 2,
                maxAttemps: 2
            }
        }
        this.setState({ cmiDataState: originalCmiDataState })
        if (!this.state.AlreadyInitialized) {
            this.initializeCommunication();
            this.setState({ AlreadyInitialized: true })
        }
        const myAPI = this.GetAPI(window);
        this.getCompletedStatus();
        this.storeDataValue("cmi.exit", "suspend");
        // check for resumed entry state
        var entryMode = this.retrieveDataValue("cmi.entry");

        var data = '';

        if (entryMode === "resume") {
            let location;
            if(this.retrieveDataValue("cmi.location") !== undefined) {
                location = Number(this.retrieveDataValue("cmi.location"));
            }
            const errorNumber = myAPI.GetLastError();
            if (errorNumber === "403" || location === undefined || location === null) {
                location = 1;
            } else {
                this.setState({currentPage: location})
            }

            data = this.retrieveDataValue("cmi.suspend_data");

            if (data !== '') {
                var dataArray = JSON.parse(data)
                this.setState({ cmiDataState: dataArray })
            }
        } 
    }

    componentWillUnmount() {
        this.terminateCommunication()
    }

    getCompletedStatus() {
      let status = this.retrieveDataValue( "cmi.completion_status" );
    	if (status !== "completed"){
    		this.storeDataValue( "cmi.completion_status", "incomplete" );
    	}
    }

    nextPage() {
        const newLocation = this.state.currentPage + 1;
        this.setState({currentPage: newLocation}, () => this.storeDataValue("cmi.location", this.state.currentPage));
    }

    previousPage() {
        const newLocation = this.state.currentPage - 1;
        this.setState({currentPage: newLocation}, () => this.storeDataValue("cmi.location", this.state.currentPage));
    }

    navToPage(e) {
        const newLocation = e;
        this.setState({currentPage: newLocation}, () => this.storeDataValue("cmi.location", this.state.currentPage));
    }

    exit() {
        window.open(window.location, '_self').close();
    }

    deleteHighlight(page) {
        let prevCmiDataState = this.state.cmiDataState;
        prevCmiDataState.highLightPagesData[page] = '';
        this.setState({prevCmiDataState}, () => this.storeDataValue("cmi.suspend_data", JSON.stringify(this.state.cmiDataState)))
    }

    setHighlight(page, data) {
        let prevCmiDataState = this.state.cmiDataState;
        prevCmiDataState.highLightPagesData[page] = data;
        this.setState({prevCmiDataState}, () => this.storeDataValue("cmi.suspend_data", JSON.stringify(this.state.cmiDataState)))
    }

    setPostit(page, data) {
        let prevCmiDataState = this.state.cmiDataState;
        prevCmiDataState.postitsPagesData[page] = data;
        this.setState({prevCmiDataState}, () => this.storeDataValue("cmi.suspend_data", JSON.stringify(this.state.cmiDataState)))
    }

    setVideoNote(page, data) {
        let prevCmiDataState = this.state.cmiDataState;
        prevCmiDataState.videoNotesPagesData[page] = data;
        this.setState({prevCmiDataState}, () => this.storeDataValue("cmi.suspend_data", JSON.stringify(this.state.cmiDataState)))
    }

    setEvaluationState(corrects, questionsNumber) {
        let prevCmiDataState = this.state.cmiDataState;
        prevCmiDataState.evaluationData.corrects = corrects;
        prevCmiDataState.evaluationData.questionsNumber = questionsNumber;
        prevCmiDataState.evaluationData.attemps--;
        this.setState({prevCmiDataState}, () => {
            this.storeDataValue("cmi.suspend_data", JSON.stringify(this.state.cmiDataState));
            const result = Math.round((this.state.cmiDataState.evaluationData.corrects / this.state.cmiDataState.evaluationData.questionsNumber) * 10)
            this.storeDataValue('cmi.score.raw', result);
            this.storeDataValue('cmi.score.scaled', this.state.cmiDataState.evaluationData.corrects / this.state.cmiDataState.evaluationData.questionsNumber);
            this.storeDataValue('cmi.score.min', 0);
            this.storeDataValue('cmi.score.max', 10);
            if( result >= 5) {
                this.storeDataValue( "cmi.completion_status", "completed" );
                this.storeDataValue( "cmi.success_status", "passed" );
            } else {
                this.storeDataValue( "cmi.completion_status", "completed" );
                this.storeDataValue( "cmi.success_status", "failed" );  
            }
        })
    }

    render() {

        const val = {
            ...this.state,
            toggleMenu: this.toggleMenu,
            previousPage: this.previousPage,
            nextPage: this.nextPage,
            navToPage: this.navToPage,
            exit: this.exit,
            deleteHighlight: this.deleteHighlight,
            setHighlight: this.setHighlight,
            setPostit: this.setPostit,
            setVideoNote: this.setVideoNote,
            setEvaluationState: this.setEvaluationState
        }

        return (
            <ScoContext.Provider value={val}>
                {this.props.children}
            </ScoContext.Provider>
        );
    }
}

ScormProvider.propTypes = {
    //version: 2004,
    debug: PropTypes.bool,
}

export default ScormProvider;