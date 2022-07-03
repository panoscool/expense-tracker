import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';
import { setLoading } from '../../lib/services/helpers';
import { getUser } from '../../lib/services/user';

const Input = styled('input')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const UploadForm: React.FC = () => {
  const { user, dispatch } = useAppContext();
  const [ratio, setRatio] = useState(16 / 9);
  const [file, setFile] = useState<string>('');
  const [previewSource, setPreviewSource] = useState<string>('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
    reader.onerror = () => {
      console.error('Error reading file');
      setError('Something went wrong!');
    };
  };

  const handleClearPreview = () => {
    setPreviewSource('');
    setFile('');
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      previewFile(file);
      setFile(e.target.value);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setLoading(dispatch, 'delete_image');
      await apiRequest('DELETE', '/user/media');
      await getUser(dispatch);

      setSuccess('Image deleted successfully');
    } catch (err) {
      console.error(err);
      setError(`Image failed to delete: ${err}`);
    } finally {
      setLoading(dispatch, 'delete_image');
    }
  };

  const uploadImage = async (base64EncodedImage: string) => {
    try {
      setLoading(dispatch, 'upload_image');
      await apiRequest('POST', '/user/media', { file_string: base64EncodedImage });
      await getUser(dispatch);

      setFile('');
      setPreviewSource('');
      setSuccess('Image uploaded successfully');

      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(`Image failed to upload: ${err}`);
    } finally {
      setLoading(dispatch, 'upload_image');
    }
  };

  const handleSubmitFile = (e: React.FormEvent) => {
    e.preventDefault();

    if (previewSource) {
      uploadImage(previewSource);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmitFile}>
        <Input
          id="file-input"
          type="file"
          name="image"
          accept="image/*"
          value={file}
          onChange={handleFileInputChange}
        />
        <Button type="submit" variant="contained" disabled={!file}>
          Save
        </Button>
      </Form>

      {success && (
        <Alert severity="success" sx={{ my: 3 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          {error}
        </Alert>
      )}

      <Box mt={3} display="flex" flexDirection="column" alignItems="flex-start">
        {!previewSource && user?.image && (
          <>
            <Button
              color="error"
              onClick={handleDeleteImage}
              startIcon={<DeleteRoundedIcon />}
              sx={{ mb: 1 }}
            >
              Delete
            </Button>
            <Image
              src={user.image}
              alt=""
              width={300}
              height={300 / ratio}
              layout="fixed"
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setRatio(naturalWidth / naturalHeight)
              }
            />
          </>
        )}
      </Box>

      <Box mt={3} display="flex" flexDirection="column" alignItems="flex-start">
        {previewSource && (
          <>
            <Button onClick={handleClearPreview} startIcon={<CancelOutlinedIcon />} sx={{ mb: 1 }}>
              Cancel
            </Button>
            <Image
              src={previewSource}
              alt="preview selected"
              width={300}
              height={300 / ratio}
              layout="fixed"
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setRatio(naturalWidth / naturalHeight)
              }
            />
          </>
        )}
      </Box>
    </div>
  );
};

export default UploadForm;
