import { ToastContext } from '@/components/common/toast/Toast';
import { useContext } from 'react';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast는 반드시 ToastProvider 내부에서 사용해야합니다!');
  }

  return context;
};
