import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';

const filter = (props) => {
    const router = useRouter();

    const clickHandler = (value) => {
        const filterKeys = [];
        const newFilterItems = props.filter.map(filterItem => {
            if (filterItem.label == value.label) {
                const newKeys = filterItem.keys.map(item => {
                    if (item.label === value.key) {
                        item.active = !item.active;
                    } else {
                        item.active = false;
                    }
                    return item;
                });
                filterItem.keys = newKeys;
                return filterItem;
            } else {
                return filterItem
            }
        });
        newFilterItems.forEach(filterItem => {
            let filterKeysFor = '';
            filterItem.keys.forEach((item) => {
                if (item.active) {
                    filterKeysFor = item.label;
                }
            });
            if (filterKeysFor.length > 0) {
                filterKeys.push({ label: filterItem.label, key: filterKeysFor })
            }
        });

        router.push('?' + getFilterParams(filterKeys));
    }

    const getFilterParams = (value) => {
        let queryParam = '';
        value.forEach(element => {
            if (element.label === 'Launch Year') {
                queryParam += '&launch_year=' + element.key;
            } else if (element.label === 'Successful Launch') {
                queryParam += '&successful_launch=' + (element.key === 'True' ? 'true' : 'false');
            } else if (element.label === 'Successful Landing') {
                queryParam += '&successful_landing=' + (element.key === 'True' ? 'true' : 'false');
            }
        });
        return queryParam;
    }


    return (
        <div className="grid">
            <h6><b>Filters</b></h6>
            {
                props.filter.map((filterItem, index) => {
                    return (
                        <div key={index} className="mt-2">
                            <div className="text-center"><u>{filterItem.label}</u></div>
                            <Container fluid>
                                <Row className="text-center">
                                    {
                                        filterItem.keys.map((item, i) => {
                                            return (
                                                <Col key={index + i} className="mt-3 cl-sm-6 cl-md-6 cl-lg-6">
                                                    <span onClick={() => { clickHandler({ label: filterItem.label, key: item.label }) }}
                                                        className={['small-btn', item.active ? 'active' : ''].join(' ')}>
                                                        {item.label}
                                                    </span>
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                            </Container>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default filter;