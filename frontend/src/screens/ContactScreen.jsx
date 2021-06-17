import React from 'react'
import { Row, Col } from 'reactstrap';

export const ContactScreen = () => {
  return (
    <div className="mt-4">
      <h2 className="text-center"><b>Kontak Kami</b></h2>
      <Row className="mt-4">
        <Col>
          <div>
            <h5>Aruspinggir dapat dihubungi melalui kontak berikut:</h5>
          </div>
          <div className="mt-3">
            <ul>
              <li>Whatsapp: +62 856-4552-3575</li>
            </ul>
          </div>
        </Col>
        <Col>
          <div>
            <h5>Media Sosial :</h5>
          </div>
          <div className="mt-3">
            <ul>
              <li>Facebook : 
                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/Aruspinggir-823536244683984">
                  Aruspinggir
                </a>
              </li>
              <li>Instagram :
                <a target="_blank" rel="noreferrer" href="http://instagram.com/aruspinggir">
                  @aruspinggir
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  )
}
