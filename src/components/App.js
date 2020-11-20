import React, {Component} from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import BeerItem from './BeerItem';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            beerNames: [],
            beers: [],
            photos:[],
            sort: ''
        };

        this.search = this.search.bind(this);
       
    }

    componentDidMount() {
        var self = this;

        fetch('http://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        data.shift();
                        self.setState({
                            apiData: data,
                            beers: data
                        });
                    });
                }
            )
            .catch(function (err) {
            });
        fetch("http://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json")
        .then(
            res=>{
                if(!res.ok){
                    throw Error("Error fetching images")
                }
                return res.json()
                
                .then(allData=>{
                    this.setState({
                        photos:allData,
                    });
                    
                });
                
            }
        )
        .catch(function(err){
            throw Error(err.message);
        });
    }

    search(query) {
        var beers = [];
        var beerNames = [];

        this.state.apiData.forEach(function (beer) {
            if (beer.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                beers.push(beer);
                beerNames.push(beer.name);
            }
        });

        this.setState({
            beers: beers,
            beerNames: beerNames,
        });
    }

    

    render() {
        var BeerList = this.state.beers.map(function (beer, index) {
            return (
                <BeerItem key={index} data={beer}/>
            );
        }, this);

        return (
            <div>
                <center>
                    <div className="margin-3">
                        <AutoComplete
                            hintText="Search..."
                            dataSource={this.state.beerNames}
                            onUpdateInput={this.search}
                            listStyle={{maxHeight: 200, overflow: 'auto'}}
                            fullWidth={true}
                        />
                    </div>
                </center>
                <div className="margin-3 flex-box">{BeerList}</div>
            </div>
        );
    }
}

export default App;