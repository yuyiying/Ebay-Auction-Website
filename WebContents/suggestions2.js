
/**
 * Provides suggestions for state names (USA).
 * @class
 * @scope public
 */

var bTA;
var AutoSuggestControl;
function StateSuggestions() {
    this.states = [
         
    ];
}

/**
 * Request suggestions for the given autosuggest control. 
 * @scope protected
 * @param oAutoSuggestControl The autosuggest control to provide suggestions for.
 */
StateSuggestions.prototype.requestSuggestions = function (oAutoSuggestControl /*:AutoSuggestControl*/,
                                                          bTypeAhead /*:boolean*/) {
    
    var sTextboxValue = oAutoSuggestControl.textbox.value;
    this.sendAjaxRequest(sTextboxValue);
    bTA = bTypeAhead;
    AutoSuggestControl = oAutoSuggestControl;
    //provide suggestions to the control
    
};

var xmlHttp = new XMLHttpRequest(); // works only for Firefox, Safari, ..

StateSuggestions.prototype.sendAjaxRequest = function (input){
    if (input!=null && input!=""){
        var request = "/eBay/suggest?q="+encodeURI(escape(input));
        
        xmlHttp.open("GET", request);
        xmlHttp.onreadystatechange = this.showSuggestion;
        xmlHttp.send(null);
    }
};

StateSuggestions.prototype.showSuggestion = function () {
    if (xmlHttp.readyState == 4) {
        // get the CompleteSuggestion elements from the response
        var states = [];
        var s = xmlHttp.responseXML.getElementsByTagName('CompleteSuggestion');
        // construct a bullet list from the suggestions
        for (var i = 0; i < s.length; i++) {
            var text = s[i].childNodes[0].getAttribute("data");
            states.push(text);
        }
        AutoSuggestControl.autosuggest(states, bTA);
    }
};