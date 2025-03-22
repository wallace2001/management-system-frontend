import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { HTTPError } from 'ky';
import { RegisterCredentials } from '../types/register';
import { register } from '../services/register';

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (values: RegisterCredentials) => register(values),
    onSuccess() {
      router.replace('/auth/login');
      toast.success('Registro efetuado com sucesso! Agora você pode fazer login.');
    },
    async onError(error: HTTPError<{ message: string }> | Error) {
      let errorMessage = 'Tente novamente';

      if (error instanceof HTTPError) {
        const errorResponse = await error.response.json();
        errorMessage = errorResponse?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error('Registro não efetuado', {
        description: errorMessage,
      });
    },
  });
}
