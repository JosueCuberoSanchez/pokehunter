/**
 * Search form component.
 * @author Josué David Cubero Sánchez.
 */

import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

import DataTable from '../data-table/';

import './search-form.scss';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewTable: false,
            gameInvalid: false,
            game: ''
        };

        this.renderTable = this.renderTable.bind(this);
    }

    render() {
        return (
            <Container className="main">
                <Form className="row form">
                    <Col xs="12" sm="6" md="5" lg="5">
                        <FormGroup>
                            <Label htmlFor="filter-by-game">Chose game</Label>
                            {
                                this.state.gameInvalid
                                    ? <Input className="form-control border-danger" id="filter-by-game" placeholder="Required field"/>
                                    : <Input className="form-control" id="filter-by-game" placeholder="Enter game version. Eg: red"/>
                            }
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="2" md="2" lg="2" className="text-center d-flex flex-column">
                        <Button type="button" className="form__button mt-auto mx-auto mb-3" onClick={this.renderTable}>
                            Go!
                        </Button>
                    </Col>
                </Form>
                {
                    this.state.viewTable
                    ? <DataTable game={document.getElementById('filter-by-game').value}/>
                    : null
                }
            </Container>
        )
    }

    renderTable() {
        if(document.getElementById('filter-by-game').value !== ''){
            this.setState({ viewTable: true, gameInvalid: false });
        } else {
            this.setState({ gameInvalid: true });
        }
    }

}

export default SearchForm;