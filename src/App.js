import React, {Component} from 'react';
import './App.css';
import './css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button, Grid, PageHeader, Form, Row, Col } from 'react-bootstrap'
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
	axios.get('http://127.0.0.1:5000/start').then(response => { 
	  this.setState({ countries: response.data.data.countries })
	  console.log(response.data.data.countries);
      })
      .catch(function(error) {
        console.log(error)
      })
	}

createChart() {
    this.setState({ isHidden: true })
	axios.get('http://127.0.0.1:5000/getCountryData/'+this.state.selected).then(response => { 
	  this.setState({ data: response.data.data.countryData })
	  this.setState({ keys: response.data.data.keys })
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
   	  console.log(this.state.chartData)
	}
	).catch(function(error) {
			console.log(error)
			})
	}

  render() {
	  
    return (
    <div className="App">
      <header className="App-header">
        <p>
			Hello
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
        >
          Learn React
        </a>
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
		<br></br>
		{this.state.selected != "" && (
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
            <Line type="monotone" dataKey="AlcoholicBeverages" stroke="#c94473" />
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
		)}
      </header>
    </div>
  );
  }
}

export default App;