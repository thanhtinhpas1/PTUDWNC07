import React from 'react';
import Header from '../components/views/Header'
import { Image } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div style={{ margin: '0' }}>
                    <Header />
                    <div className="text-center mt-5">
                        <Image src="./banner.jpg">
                        </Image>
                        <br></br>
                        <h3 className="text-white">Please login before play.</h3>
                        <a href="/login" className="btn btn-danger mt-3" variant="danger" size="lg" >Play now</a>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}
export default Home;