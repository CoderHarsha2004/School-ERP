import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../actions/studentActions';
import { fetchFaculty } from '../actions/facultyActions';
import { fetchFees } from '../actions/feesActions';
import axios from 'axios';

// Set base URL for development
axios.defaults.baseURL = 'http://localhost:5000';

const ReportsModule = () => {
  const dispatch = useDispatch();
  const { students, loading: studentsLoading } = useSelector(state => state.student);
  const { faculty, loading: facultyLoading } = useSelector(state => state.faculty);
  const { fees, loading: feesLoading } = useSelector(state => state.fees);
  const { token } = useSelector(state => state.auth);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedFeeType, setSelectedFeeType] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchFaculty());
    dispatch(fetchFees());
  }, [dispatch]);

  const uniqueClasses = [...new Set(students.map(s => s.class))].sort();
  const classesWithFees = [...new Set(fees.map(f => f.class).filter(Boolean))].sort();

  const handleDownloadReport = async (type, className = null) => {
    if (!token) {
      alert('Please log in to download reports.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      };

      let url = `/api/reports/${type}`;
      if (className) {
        url += `/${className}`;
      }

      const response = await axios.get(url, config);
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', `${type}${className ? `_${className}` : ''}_report.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading report:', error);
      if (error.response) {
        if (error.response.status === 401) {
          alert('Unauthorized: Please log in to download reports.');
        } else if (error.response.status === 403) {
          alert('Forbidden: You do not have permission to download reports.');
        } else if (error.response.status === 404) {
          alert('No data found for the selected report. Please check if there are records for this class.');
        } else if (error.response.status === 500) {
          alert('Server error: Please try again later.');
        } else {
          alert('Error downloading report. Please try again.');
        }
      } else {
        alert('Network error: Please check your connection and try again.');
      }
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Reports</h2>
        </Col>
      </Row>

      {!selectedReport && (
        <Row>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Student Reports</Card.Title>
                <Card.Text>
                  Generate reports for students by class.
                </Card.Text>
                <Button variant="primary" onClick={() => setSelectedReport('students')}>
                  Select Student Reports
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Faculty Reports</Card.Title>
                <Card.Text>
                  Generate reports for all faculty members.
                </Card.Text>
                <Button variant="primary" onClick={() => handleDownloadReport('faculty')}>
                  Download Faculty Report
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Pending Fees Reports</Card.Title>
                <Card.Text>
                  Generate reports for pending fees by class.
                </Card.Text>
                <Button variant="primary" onClick={() => setSelectedFeeType('pending')}>
                  Select Pending Fees Reports
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      )}

      {selectedReport === 'students' && (
        <div>
          <Button variant="secondary" onClick={() => setSelectedReport(null)} className="mb-3">
            Back to Reports
          </Button>
          <h4>Select a Class for Student Report</h4>
          <Row>
            {uniqueClasses.map(cls => (
              <Col md={3} key={cls} className="mb-3">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Class {cls}</Card.Title>
                    <Button variant="primary" onClick={() => handleDownloadReport('students', cls)}>
                      Download CSV
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {selectedReport === 'fees' && (
        <div>
          <Button variant="secondary" onClick={() => setSelectedReport(null)} className="mb-3">
            Back to Reports
          </Button>
          <h4>Select a Class for Fees Report</h4>
          {classesWithFees.length === 0 ? (
            <Alert variant="info">No fees data available for any class.</Alert>
          ) : (
            <Row>
              {classesWithFees.map(cls => (
                <Col md={3} key={cls} className="mb-3">
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Class {cls}</Card.Title>
                      <Button variant="primary" onClick={() => handleDownloadReport('fees', cls)}>
                        Download CSV
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}

      {selectedFeeType && (
        <div>
          <Button variant="secondary" onClick={() => setSelectedFeeType(null)} className="mb-3">
            Back to Reports
          </Button>
          <h4>Select a Class for {selectedFeeType === 'pending' ? 'Pending' : 'Completed'} Fees Report</h4>
          {classesWithFees.length === 0 ? (
            <Alert variant="info">No fees data available for any class.</Alert>
          ) : (
            <Row>
              {classesWithFees.map(cls => (
                <Col md={3} key={cls} className="mb-3">
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Class {cls}</Card.Title>
                      <Button variant={selectedFeeType === 'pending' ? 'warning' : 'success'} onClick={() => handleDownloadReport(`${selectedFeeType}-fees`, cls)}>
                        Download CSV
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </Container>
  );
};

export default ReportsModule;
