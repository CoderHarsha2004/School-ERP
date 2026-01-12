import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFees, createFee, updateFee, deleteFee } from '../actions/feesActions';
import { Container, Row, Col, Card, Button, Modal, Form, Table, Alert } from 'react-bootstrap';

const FeesModule = () => {
  const dispatch = useDispatch();
  const { fees, loading, error } = useSelector(state => state.fees);
  const [showModal, setShowModal] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [formData, setFormData] = useState({
    student: '',
    class: '',
    section: '',
    amount: '',
    description: '',
    dueDate: '',
    status: 'pending',
  });
  const [showCallLogsModal, setShowCallLogsModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [callLogs, setCallLogs] = useState({});
  const [showCallLogModal, setShowCallLogModal] = useState(false);
  const [editingCallLog, setEditingCallLog] = useState(null);
  const [callLogFormData, setCallLogFormData] = useState({
    notes: '',
    outcome: 'successful',
  });


  useEffect(() => {
    dispatch(fetchFees());
  }, [dispatch]);

  const handleShowModal = (fee = null) => {
    setEditingFee(fee);
    setFormData(fee ? {
      ...fee,
      student: fee.student.rollNumber,
      class: fee.student.class,
      section: fee.student.section
    } : {
      student: '',
      class: '',
      section: '',
      amount: '',
      description: '',
      dueDate: '',
      status: 'pending',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFee(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFee) {
      dispatch(updateFee(editingFee._id, formData));
    } else {
      dispatch(createFee(formData));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fee record?')) {
      dispatch(deleteFee(id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowCallLogsModal = (fee) => {
    setSelectedFee(fee);
    setShowCallLogsModal(true);
  };

  const handleCloseCallLogsModal = () => {
    setShowCallLogsModal(false);
    setSelectedFee(null);
  };

  const handleShowCallLogModal = (log = null) => {
    setEditingCallLog(log);
    setCallLogFormData(log ? { ...log } : { notes: '', outcome: 'successful' });
    setShowCallLogModal(true);
  };

  const handleCloseCallLogModal = () => {
    setShowCallLogModal(false);
    setEditingCallLog(null);
  };

  const handleCallLogInputChange = (e) => {
    const { name, value } = e.target;
    setCallLogFormData({ ...callLogFormData, [name]: value });
  };

  const handleCallLogSubmit = (e) => {
    e.preventDefault();
    // Placeholder for call log submission logic
    console.log('Call log submitted:', callLogFormData);
    handleCloseCallLogModal();
  };

  const handleDeleteCallLog = (id) => {
    if (window.confirm('Are you sure you want to delete this call log?')) {
      // Placeholder for call log deletion logic
      console.log('Deleting call log:', id);
    }
  };



  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Fees Management</h2>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Fee
          </Button>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map(f => (
                      <tr key={f._id}>
                        <td>{f.student?.name || 'N/A'}</td>
                        <td>${f.amount}</td>
                        <td>{f.description}</td>
                        <td>{new Date(f.dueDate).toLocaleDateString()}</td>
                        <td>{f.status}</td>
                        <td>
                          <Button variant="info" size="sm" onClick={() => handleShowModal(f)}>
                            Edit
                          </Button>{' '}
                          <Button variant="warning" size="sm" onClick={() => handleShowCallLogsModal(f)}>
                            Call Logs
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(f._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingFee ? 'Edit Fee' : 'Add Fee'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Student Roll Number</Form.Label>
              <Form.Control
                type="text"
                name="student"
                value={formData.student}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editingFee ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showCallLogsModal} onHide={handleCloseCallLogsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Call Logs for {selectedFee?.student?.name || 'N/A'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={() => handleShowCallLogModal()}>
            Add Call Log
          </Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Notes</th>
                <th>Outcome</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(callLogs[selectedFee?._id] || []).map(log => (
                <tr key={log._id}>
                  <td>{new Date(log.date).toLocaleString()}</td>
                  <td>{log.notes}</td>
                  <td>{log.outcome}</td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleShowCallLogModal(log)}>
                      Edit
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteCallLog(log._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCallLogsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCallLogModal} onHide={handleCloseCallLogModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCallLog ? 'Edit Call Log' : 'Add Call Log'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCallLogSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={callLogFormData.notes}
                onChange={handleCallLogInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Outcome</Form.Label>
              <Form.Select
                name="outcome"
                value={callLogFormData.outcome}
                onChange={handleCallLogInputChange}
              >
                <option value="successful">Successful</option>
                <option value="no-answer">No Answer</option>
                <option value="callback">Callback</option>
                <option value="unreachable">Unreachable</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCallLogModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editingCallLog ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default FeesModule;
