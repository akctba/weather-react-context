import React, { Component } from 'react';
import './index.css';

/*********************
 * 
 * This file it's not in use, it's here just for historic pourpose.
 * See languageFunction.js to Hooks version.
 * 
 *********************/

import { WeatherConsumer } from './weatherContext';

class LanguageCombo extends Component {

    onChange = (dispatch, e) => {
        dispatch({ type: "CHANGE_LANGUAGE", payload: e.target.value });
    }

    static contextType = WeatherConsumer

    render() {
        const langs = [
            {freq: false, code:"af",	lang:"Afrikaans"},
            {freq: false, code:"ar",	lang:"Arabic"},
            {freq: false, code:"az",	lang:"Azerbaijani"},
            {freq: false, code:"bg",	lang:"Bulgarian"},
            {freq: false, code:"ca",	lang:"Catalan"},
            {freq: false, code:"cz",	lang:"Czech"},
            {freq: false, code:"da",	lang:"Danish"},
            {freq: false, code:"de",	lang:"German"},
            {freq: false, code:"el",	lang:"Greek"},
            {freq: true, code:"en",	    lang:"English"},
            {freq: false, code:"eu",	lang:"Basque"},
            {freq: false, code:"fa",	lang:"Persian (Farsi)"},
            {freq: false, code:"fi",	lang:"Finnish"},
            {freq: false, code:"fr",	lang:"French"},
            {freq: false, code:"gl",	lang:"Galician"},
            {freq: false, code:"he",	lang:"Hebrew"},
            {freq: false, code:"hi",	lang:"Hindi"},
            {freq: false, code:"hr",	lang:"Croatian"},
            {freq: false, code:"hu",	lang:"Hungarian"},
            {freq: false, code:"id",	lang:"Indonesian"},
            {freq: false, code:"it",	lang:"Italian"},
            {freq: true, code:"ja",	    lang:"Japanese"},
            {freq: false, code:"kr",	lang:"Korean"},
            {freq: false, code:"la",	lang:"Latvian"},
            {freq: false, code:"lt",	lang:"Lithuanian"},
            {freq: false, code:"mk",	lang:"Macedonian"},
            {freq: false, code:"no",	lang:"Norwegian"},
            {freq: false, code:"nl",	lang:"Dutch"},
            {freq: false, code:"pl",	lang:"Polish"},
            {freq: false, code:"pt",	lang:"Portuguese"},
            {freq: true, code:"pt_br",  lang:"Português Brasil"},
            {freq: false, code:"ro",	lang:"Romanian"},
            {freq: false, code:"ru",	lang:"Russian"},
            {freq: false, code:"sv",	lang:"Swedish"},
            {freq: false, code:"sk",	lang:"Slovak"},
            {freq: false, code:"sl",	lang:"Slovenian"},
            {freq: true, code:"es",	    lang:"Spanish"},
            {freq: false, code:"sr",	lang:"Serbian"},
            {freq: false, code:"th",	lang:"Thai"},
            {freq: false, code:"tr",	lang:"Turkish"},
            {freq: false, code:"uk",	lang:"Ukrainian"},
            {freq: false, code:"vi",	lang:"Vietnamese"},
            {freq: false, code:"zh_cn", lang:"Chinese Simplified"},
            {freq: false, code:"zh_tw", lang:"Chinese Traditional"},
            {freq: false, code:"zu",	lang:"Zulu"}
        ];

        return (
            <WeatherConsumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="lang-box">
                            <label>Language: </label>
                            <select id="language" name="language" defaultValue={this.context.language}
                            onChange={this.onChange.bind(this, dispatch)}
                            >
                                <optgroup label="Frequent">
                                    {langs.filter(e => e.freq).map(e => <option key={"lang_"+e.code} value={e.code}>{e.lang}</option>)}
                                </optgroup>
                                <optgroup label="All">
                                    {langs.filter(e => !e.freq).map(e => <option key={"lang_"+e.code} value={e.code}>{e.lang}</option>)}
                                </optgroup>
                            </select>
                        </div>
                    );
                }}
            </WeatherConsumer>
        
        );
    }
}

export default LanguageCombo;

