import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const programs = (props) => {
    return (
        <div>
            <Container fluid>
                <Row>
                    {
                        props.programs.map((program, index) => {
                            return (
                                <Col key={index} className="pn cl-sm-12 cl-md-6 cl-lg-3">
                                    <div className="grid">
                                        <div className="text-center">
                                        <img src={program.links.mission_patch_small}
                                            alt="Image of space launcher"
                                        className="img-fluid" />
                                        </div>
                                        <div className="pm bold"><label>Mission Ids: </label> {(program.mission_id || []).join(', ')}</div>
                                        <div className="pm bold"><label>Launch Year: </label> {program.launch_year}</div>
                                        <div className="pm bold"><label>Successful Launch: </label> {program.launch_success + ''}</div>
                                        <div className="pm bold"><label>Successful Landing: </label> {program.rocket.first_stage.cores[0].land_success !== null ? (program.rocket.first_stage.cores[0].land_success+ '') : ''}</div>
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </div>
    );
}

export default programs;