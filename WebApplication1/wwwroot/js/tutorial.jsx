

// JSX Styles to put vehicle informatio into seperate boxes
const vehicleCards = {
    textAlign: 'left',
    border: '1px solid black',
    padding: 10,
    marginTop: 15,
    marginLeft: 350,
    marginRight: 350,
    width: 400,

}

const center = {
    textAlign: 'center',

}

// Individual Component for each vehicle
var Vehicle = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render: function () {
        return (
            <div className="vehicle" style={vehicleCards}>
                <p dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

// Component to list vehicles
var VehicleList = React.createClass({
    render: function () {
        var vehicleNodes = this.props.data.map(function (vehicleData) {
            return (
                <Vehicle key={vehicleData.vehicleid}>
                    {`${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`}
                </Vehicle>               
            );
        });
        return (
            <div className="vehicleList">
                {vehicleNodes}
            </div>
        );
    }
});


// Get information from database and render each component
var VehicleBox = React.createClass({
    loadVehiclesFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadVehiclesFromServer();
        window.setInterval(this.loadVehiclesFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="vehicleBox" style={center}>
                <h1> Kansas City Tow Lots</h1>         
                <VehicleSearch />
                <VehicleFilterBoxes />
                <VehicleList data={this.state.data} />
            </div>
        );
    }
});

// input form
var VehicleSearch = React.createClass({
    render() {
        return (
            <form className="searchForm">
                <input
                    type="text"
                    placeholder="2008 FORD"
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
})

// drop down boxes
var VehicleFilterBoxes = React.createClass({
    render() {
        return (
            <select id="dropDown">
                <option value=""> </option>
                <option value="ACURA"> ACURA </option>
                <option value="ALFA ROMEO"> ALFA ROMEO </option>
                <option value="AUDI"> AUDI </option>
                <option value="BMW"> BMW </option>
                <option value="BUICK"> BUICK </option>
                <option value="CADILLAC"> CADILLAC </option>
                <option value="CHEVROLET"> CHEVROLET </option>
                <option value="CHRYSLER"> CHRYSLER </option>
                <option value="DAEWOO"> DAEWOO </option>
                <option value="DODGE"> DODGE </option>
                <option value="FIAT"> FIAT </option>
                <option value="FORD"> FORD </option>
                <option value="GMC"> GMC </option>
                <option value="HARLEY - DAVIDSON"> HARLEY - DAVIDSON </option>
                <option value="HONDA"> HONDA </option>
                <option value="HYUNDAI"> HYUNDAI </option>
                <option value="INFINITI"> INFINITI </option>
                <option value="JAGUAR"> JAGUAR </option>
                <option value="JEEP"> JEEP </option>
                <option value="KIA"> KIA </option>
                <option value="LAND ROVER"> LAND ROVER </option>
                <option value="LEXUS"> LEXUS </option>
                <option value="LINCOLN"> LINCOLN </option>
                <option value="MASERATI"> MASERATI </option>
                <option value="MAZDA"> MAZDA </option>
                <option value="MERCEDES"> MERCEDES </option>
                <option value="MERCURY"> MERCURY </option>
                <option value="MINI"> MINI </option>
                <option value="MITSUBISHI"> MITSUBISHI </option>
                <option value="NISSAN"> NISSAN </option>
                <option value="OLDSMOBILE"> OLDSMOBILE </option>
                <option value="PLYMOUTH"> PLYMOUTH </option>
                <option value="PONTIAC"> PONTIAC </option>
                <option value="PORSCHE"> PORSCHE </option>
                <option value="SATURN"> SATURN </option>
                <option value="SCION"> SCION </option>
                <option value="SUBARU"> SUBARU </option>
                <option value="SUZUKI"> SUZUKI </option>
                <option value="TOYOTA"> TOYOTA </option>
                <option value="VOLKSWAGEN"> VOLKSWAGEN </option>
                <option value="VOLVO"> VOLVO </option>
            </select>            
        );
    }
})


ReactDOM.render(
    <VehicleBox url="/vehicles" pollInterval={2000} />,
    document.getElementById('content')
);
