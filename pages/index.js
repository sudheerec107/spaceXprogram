import React, { useEffect, useState } from 'react';
import Filter from '../component/programs/filter/filter';
import Programs from '../component/programs/program';
import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FilterObject } from '../utils';
import Head from 'next/head';

const IndexPage = () => {
    const router = useRouter();
    const launch_year = router.query.launch_year;
    const successful_launch = router.query.successful_launch;
    const successful_landing = router.query.successful_landing;
    const [spaceXData, setSpaceXData] = useState([]);
    const [filterObj, setFilterObj] = useState(FilterObject);

    useEffect(() => {
        let queryParam = '' + (!!launch_year ? '&launch_year=' + launch_year : '') +
            (!!successful_launch ? '&launch_success=' + successful_launch : '') +
            (!!successful_landing ? '&land_success=' + successful_landing : '');
        fetch('https://api.spaceXdata.com/v3/launches?limit=20' + queryParam).then((res) => {
            res.json().then(data => {
                setSpaceXData(data);
            }).catch(data => {
                setSpaceXData([]);
            });
        });
        const newFilterObj = filterObj.map(filter => {
            if (!!launch_year && filter.label === FilterObject[0].label) {
                (filter.keys.find(item => item.label === launch_year) || { active: true }).active = true;
            } else if (!!successful_launch && filter.label === FilterObject[1].label) {
                (filter.keys.find(item => item.label === (successful_launch === 'true' ? 'True' : 'False')) || { active: true }).active = true;
            } else if (!!successful_landing && filter.label === FilterObject[2].label) {
                (filter.keys.find(item => item.label === (successful_landing === 'true' ? 'True' : 'False')) || { active: true }).active = true;
            }

            return filter;

        });
        setFilterObj(newFilterObj);

    }, [launch_year, successful_launch, successful_landing]);


    return (
        <main className="main-div">
            <Head>
                <title>SpaceX Launch Programs</title>
                <meta name="description" content="A list of Space Launch programs" />
            </Head>
            <h2>SpaceX Launch Programs</h2>
            <div className="container-custom">
                <Row>
                    <Col className="pm cl-sm-12 cl-md-4 cl-lg-3"><Filter filter={filterObj}></Filter></Col>
                    <Col className="pm cl-sm-12 cl-md-8 cl-lg-9"><Programs programs={spaceXData}></Programs></Col>
                </Row>
                <Row className="text-center">
                    <Col className="cl-sm-12 cl-md-12 cl-lg-12">Developed By: Sudheer K B</Col>
                </Row>
            </div>
        </main>
    );
}
export default IndexPage;
