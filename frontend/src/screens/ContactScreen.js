import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'

const ContactScreen = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')

  const resetForm = () => {
    setEmail('')
    setSubject('')
    setText('')
  }

  const emailHandler = e => {
    setEmail(e.target.value)
  }
  const subjectHandler = e => {
    setSubject(e.target.value)
  }
  const textHandler = e => {
    setText(e.target.value)
  }

  const submitHandler = async e => {
    e.preventDefault()
    const data = {
      email: email,
      subject: subject,
      text: text,
    }
    await axios
      .post('/api/contact-send', data)
      .then(alert('Message sent!'))
      .then(resetForm())
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={3} sm={1} />
          <Col md={6} sm={10}>
            <h1 className='text-center'>Request a Quote</h1>
            <Form onSubmit={e => submitHandler(e)}>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='name@example.com'
                  value={email}
                  onChange={e => emailHandler(e)}
                />
                <Form.Label>Subject:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Subject'
                  value={subject}
                  onChange={e => subjectHandler(e)}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              >
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Enter message or request a quote'
                  rows={7}
                  value={text}
                  onChange={e => textHandler(e)}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={3} sm={1} />
        </Row>
      </Container>
    </>
  )
}

export default ContactScreen
