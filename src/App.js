import React, {Component} from 'react';
import logo from './img/24keys2.png';
import './css/App.css';
import './css/bootstrap.min.css';
import { Container, Button, Grid, PageHeader, Form, Row, Col, Image, Nav } from 'react-bootstrap'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'
import {LineChart, Line, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, Legend} from 'recharts'

class App extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
		countries: [],
		//HTTP response only working for single values in typeahead. 
		//converting selected to array would fix that and just iterate through the array and maked looped 
		//axios requests and concatenate the responses into one giant json
		selected: '',
		data: [],
		chartData: [],
		isHidden: false
	  }
	}
  
componentDidMount() {
	axios.get('https://oxford-data-challenge-backend.herokuapp.com/start').then(response => { 
	  this.setState({ countries: response.data.data.countries })
	  console.log(response.data.data.countries);
      })
      .catch(function(error) {
        console.log(error)
      })
	}

	componentDidUpdate(e) {
		if (typeof e === 'number') {
			console.log(e)
						this.setState({isHidden: true })
	    	axios.get('https://oxford-data-challenge-backend.herokuapp.com/getCountryData/'+this.state.selected).then(response => { 
			this.setState({data: response.data.data.countryData})
			this.setState({keys: response.data.data.keys})
		  this.state.chartData = []
		  	for (let i = 0; i < this.state.data.length; i++) {
			this.state.chartData[i] = {
			  count: i,
			  AlcoholicBeverages: response.data.data.countryData[i][11],
			  CerealsAndGrains: response.data.data.countryData[i][2],
			  DairyAndEggs: response.data.data.countryData[i][8],
			  Pulses: response.data.data.countryData[i][3],
			  StarchyRoots: response.data.data.countryData[i][4],
			  Sugar: response.data.data.countryData[i][5],
			  OilsAndFats: response.data.data.countryData[i][6],
			  Meat: response.data.data.countryData[i][7],
			  FruitAndVeg: response.data.data.countryData[i][9],
	   		  Other: response.data.data.countryData[i][10],
			  Year: response.data.data.countryData[i][1],
			}
			}
		}
		).catch(function(error) {
				console.log(error)
				})				

		}
	}

	createChart() {
			this.setState({isHidden: true })
	    	axios.get('https://oxford-data-challenge-backend.herokuapp.com/getCountryData/'+this.state.selected).then(response => { 
			this.setState({data: response.data.data.countryData})
			this.setState({keys: response.data.data.keys})
		  this.state.chartData = []
		  	for (let i = 0; i < this.state.data.length; i++) {
			this.state.chartData[i] = {
			  count: i,
			  AlcoholicBeverages: response.data.data.countryData[i][11],
			  CerealsAndGrains: response.data.data.countryData[i][2],
			  DairyAndEggs: response.data.data.countryData[i][8],
			  Pulses: response.data.data.countryData[i][3],
			  StarchyRoots: response.data.data.countryData[i][4],
			  Sugar: response.data.data.countryData[i][5],
			  OilsAndFats: response.data.data.countryData[i][6],
			  Meat: response.data.data.countryData[i][7],
			  FruitAndVeg: response.data.data.countryData[i][9],
	   		  Other: response.data.data.countryData[i][10],
			  Year: response.data.data.countryData[i][1],
			}
			}
	 			this.componentDidUpdate(this.state.chartData[0]['AlcoholicBeverages'])
		}
		).catch(function(error) {
				console.log(error)
				})				
    } 

  render() {
    return (
    <div className="App">
      <header className="App-header">
      			<Container>
      			<Row>
      			<Col xs={2} md={2}>
    		  	<Image src={logo} fluid />
			  	  </Col>
				    </Row>
          </Container>
        <p>
			Jamie Paterson: Our World in Data
        </p>
		<p>
			diet-compositions-by-commodity-categories-fao-2017
		</p>
		<Typeahead
          labelKey="name"
          options={this.state.countries}
          selected={this.state.selected}
          onChange={(s) => this.setState({selected: s})}
          placeholder="Choose one country..."
        />
		<br/>
		<Button
        variant="outline-success"
		onClick={this.createChart.bind(this)}
		>
		Generate Chart
    </Button>
    <h2>Constituencies</h2>
		<Nav variant="pills" defaultActiveKey="" className="flex-column">
		<Nav.Item>
    <Nav.Link eventKey="home"onClick={this.createChart.bind(this)}>Active</Nav.Link>
	  </Nav.Item>
	  <Nav.Item>
    <Nav.Link eventKey="link-1">Option 2</Nav.Link>
	  </Nav.Item>
		</Nav>
		<LineChart
            width={1300}
            height={700}
            data={this.state.chartData}
        >
	        <XAxis dataKey="Year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Alcoholic Beverages" stroke="#c94473" />
		    <Line type="monotone" dataKey="CerealsAndGrains" stroke="#8884d8" />
			<Line type="monotone" dataKey="DairyAndEggs" stroke="#c94473" />
		    <Line type="monotone" dataKey="Pulses" stroke="#8884d8" />
            <Line type="monotone" dataKey="StarchyRoots" stroke="#c94473" />
		    <Line type="monotone" dataKey="Sugar" stroke="#8884d8" />
            <Line type="monotone" dataKey="OilsAndFats" stroke="#c94473" />
            <Line type="monotone" dataKey="Meat" stroke="#8884d8" />
            <Line type="monotone" dataKey="FruitAndVeg" stroke="#c94473" />
			<Line type="monotone" dataKey="Other" stroke="#c94473" />
			
          </LineChart>
      </header>
    </div>
  );
  }
}

export default App;