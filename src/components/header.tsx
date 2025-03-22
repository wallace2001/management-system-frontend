import { Button } from '@/components/ui/button';
import { UserButton } from '@/modules/auth/components/user-button';
import { User } from 'next-auth';
import Link from 'next/link';

export default function Header({ user }: { user: User }) {
  return (
    <div className="bg-background fixed inset-y-0 z-50 h-[80px] w-full border-b-[1px] px-2 sm:px-32">
      <div className="flex h-full w-full items-center justify-between">
        <p className="text-4xl font-bold">
          <Link href={'/'}>Management</Link>
        </p>
        <div className="flex items-center gap-4">
          <Button variant="outline">Produtos</Button>
          <Button variant="outline">Pedidos</Button>
          {user?.id ? (
            <div className="flex flex-row gap-4">
              <Button variant="outline" active>
                <Link href="/users">Usuários</Link>
              </Button>
              <UserButton />
            </div>
          ) : (
            <Button>
              <Link href="/auth">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
