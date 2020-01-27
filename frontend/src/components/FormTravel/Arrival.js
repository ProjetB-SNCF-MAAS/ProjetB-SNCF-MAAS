import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import useGlobal, { connect } from "../../global-state-management/store";

export class Arrival extends React.Component {
  // constructor({ globalState, setGlobalState }) {
  //   super({ ...this.props, globalState, setGlobalState });
  //   this.handleArrival = this.handleArrival.bind(this);
  //   this.handleSelect = this.handleSelect.bind(this);
  // }

  // handleArrival = address => {
  //   this.setState({ arrival: { address: address } });
  // };

  // handleSelect = address => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => {
  //       this.setGlobalState({
  //         arrival: { address: address, lat: latLng.lat, lng: latLng.lng }
  //       });
  //       console.log(
  //         "Success arrival address",
  //         `latitude : ${this.globalState.arrival.lat}`,
  //         `longitude : ${this.globalState.arrival.lng}`,
  //         `address : ${this.globalState.arrival.address}`
  //       );
  //       console.log("globalState : ", this.globalState);
  //     })
  //     // .then(address => this.setState({ departure: address }))
  //     .catch(error => console.error("Error", error));
  // };

  render() {
    const { state, actions } = this.props;
    return (
      <>
        {console.log(state)}
        <PlacesAutocomplete
          value={state.arrival.address}
          onChange={actions.arrivalActions.handleArrival}
          onSelect={actions.arrivalActions.handleSelect}
          shouldFetchSuggestions={state.arrival.address.length > 1}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                id="departure"
                placeholder="Adresse d'arrivée"
                style={{
                  lineHeight: "1.2em",
                  width: "250px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #6767AD",
                  fontSize: "1.3em",
                  outline: "none",
                  padding: "20px",
                  margin: "10px",
                  background: "rgba(255, 255, 255, 0)",
                  color: "#241F5D"
                }}
                {...getInputProps({
                  // placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const placeName = suggestion.active
                    ? suggestion.description
                    : "";
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        lineHeight: "1.2em",
                        width: "250px",
                        color: "#241F5D",
                        backgroundColor: "rgba(255, 255, 255, 50)",
                        cursor: "pointer"
                      }
                    : {
                        color: "#241F5D",
                        backgroundColor: "rgba(255, 255, 255, 50)",
                        cursor: "pointer"
                      };

                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </>
    );
  }
}

export default connect(Arrival);
