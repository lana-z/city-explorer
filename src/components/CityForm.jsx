import {useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CityForm(props) {
  const [showHeading, setShowHeading] = useState(false);
  const textInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowHeading(true);
    props.handleChangeCity(textInput.current.value);
  };

  return (
    <Form onSubmit={handleSubmit} className="google-search-form">
    <p className="greeting">Are you traveling for the holidays?</p>
    <div className="google-search-container">
      <Form.Group className="search-group">
        
        <Form.Control
          placeholder=" Enter a city"
          size="md"
          type="text"
          ref={textInput}
          className="search-input"
        />
        <Button variant="primary" type="submit" className="search-button">
          Explore
        </Button>
      </Form.Group>
    </div>
    {showHeading && props.city &&  (
      <h2 className="results-text">{props.city} could be a great place to spend the holidays.</h2>
    )}
  </Form>
  );
}

export default CityForm;
