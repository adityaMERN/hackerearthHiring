
import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
//import PhotoContainer from "./PhotoContainer";


class BeerItem extends Component {
    render() {
        return (
            <div className="box">
            <Card>
                <CardHeader
                    title={this.props.data.name}
                    subtitle={this.props.data.style}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText>
                    <strong>ID: {this.props.data.id}</strong>
                    <br />
                    <strong>ounces:{this.props.data.ounces}</strong>
                    <br />
                    <strong>ABV:{this.props.data.abv}</strong>
                    {/* <PhotoContainer photos={this.state.image} />  */}
                </CardText>
            </Card>
            </div>
        );
    }
}

export default BeerItem;