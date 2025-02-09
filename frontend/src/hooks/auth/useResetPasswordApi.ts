import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../services/authApi';

export const useForgotPasswordApi = () => {
  const mutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) => 
      resetPassword({ token, password }),
    onSuccess: (data) => {
      console.log('Reset email sent successfully:', data);
    },
    onError: (error) => {
      console.error('Error sending reset email:', error);
    },
  });

  return mutation;
};
