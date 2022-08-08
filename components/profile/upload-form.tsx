import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import { setError } from '../../lib/services/helpers';
import { deleteUserImage, getUser, uploadUserImage } from '../../lib/services/user';

const Input = styled('input')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 320;
const IMAGE_SIZE_LIMIT = 5000000;
const IMAGE_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

const UploadForm: React.FC = () => {
  const { user, error, dispatch } = useAppContext();
  const [ratio, setRatio] = useState(IMAGE_RATIO);
  const [filePath, setFilePath] = useState<string>('');
  const [previewSource, setPreviewSource] = useState<string>('');

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
    reader.onerror = () => {
      console.error('Error reading file');
      setError(dispatch, 'Error reading file');
    };
  };

  const handleClearFile = () => {
    setPreviewSource('');
    setFilePath('');
  };

  const handleClearError = () => {
    setError(dispatch, null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setError(dispatch, null);

    // if file size is greater than 5MB then show error
    if (file && file.size > IMAGE_SIZE_LIMIT) {
      setError(dispatch, 'File size is greater than 4MB');
      handleClearFile();

      return;
    }

    if (file) {
      previewFile(file);
      setFilePath(e.target.value);
    }
  };

  const handleDeleteImage = async () => {
    await deleteUserImage(dispatch);
    await getUser(dispatch);
  };

  const uploadImage = async (base64EncodedImage: string) => {
    await uploadUserImage(dispatch, base64EncodedImage);
    await getUser(dispatch);

    setFilePath('');
    setPreviewSource('');
  };

  const handleSubmitFile = (e: React.FormEvent) => {
    e.preventDefault();

    if (previewSource) {
      uploadImage(previewSource);
    }
  };

  return (
    <div>
      <Box mb={3}>
        <Typography variant="body2">Update your profile picture</Typography>
      </Box>

      <Form onSubmit={handleSubmitFile}>
        <Box width="100%">
          <Input
            id="file-input"
            type="file"
            name="image"
            accept="image/*"
            value={filePath}
            onChange={handleFileInputChange}
          />
          <FormHelperText>* Max allowed image size is 4mb</FormHelperText>
        </Box>
        <div>
          <Button type="submit" variant="contained" disabled={!filePath}>
            Save
          </Button>
        </div>
      </Form>

      {error && (
        <Alert severity="error" onClose={handleClearError} sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <Box mt={1} display="flex" flexDirection="column" alignItems="flex-start">
        {!previewSource && user?.image && (
          <>
            <Button color="error" onClick={handleDeleteImage} startIcon={<DeleteRoundedIcon />} sx={{ mb: 1 }}>
              Delete
            </Button>
            <Image
              src={user.image}
              alt=""
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT / ratio}
              layout="fixed"
              onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
            />
          </>
        )}
      </Box>

      <Box mt={1} display="flex" flexDirection="column" alignItems="flex-start">
        {previewSource && (
          <>
            <Button onClick={handleClearFile} startIcon={<CancelOutlinedIcon />} sx={{ mb: 1 }}>
              Cancel
            </Button>
            <Image
              src={previewSource}
              alt="preview selected"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT / ratio}
              layout="fixed"
              onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
            />
          </>
        )}
      </Box>
    </div>
  );
};

export default UploadForm;
