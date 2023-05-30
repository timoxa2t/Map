import { Form, Button } from 'react-bootstrap';
import styles from './ModalForm.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  callback?: (comment: string) => void,
  setIsModalVisible: (visible: boolean) => void,
}

export const ModalForm: React.FC<Props> = ({
  callback = (comment: string) => {},
  setIsModalVisible,
}) => {

  const [comment, setComment] = useState('');

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!comment) {
      return
    }

    callback(comment);
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    callback('');
    setIsModalVisible(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Marker description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Home"
              value={comment}
              onChange={handleCommentChange}  
            />
            <Form.Text className="text-muted">
              Enter description for your marker
            </Form.Text>
          </Form.Group>

          <Button variant="success" type='submit'>Save</Button>{' '}

          <Button variant="danger" onClick={handleCancel}>Cancel</Button>{' '}
        </Form>
      </div>
    </div>
  );
}