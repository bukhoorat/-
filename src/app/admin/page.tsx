import { AdminPanel } from '@/components/AdminPanel';

export const metadata = {
  title: 'ZAREN Admin',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPanel />;
}
