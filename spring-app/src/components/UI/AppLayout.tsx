import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  UserIcon, 
  AdjustmentsHorizontalIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useUserStore();
  
  // Skip navigation on auth pages
  if (pathname?.includes('/auth')) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Top Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-2xl font-semibold text-indigo-600">
            Spring
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/activities/filter" 
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6" />
            </Link>
            
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100"
              >
                {user?.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.username} 
                    className="h-8 w-8 rounded-full" 
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <UserIcon className="h-5 w-5" />
                  </div>
                )}
              </Link>
            ) : (
              <Link href="/auth/login" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">{children}</main>
      
      {/* Bottom Navigation (mobile) */}
      <nav className="sticky bottom-0 border-t border-gray-200 bg-white">
        <div className="mx-auto grid h-16 max-w-md grid-cols-4">
          <Link
            href="/activities"
            className={`flex flex-col items-center justify-center ${
              pathname === '/activities' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="mt-1 text-xs">Explore</span>
          </Link>
          
          <Link
            href="/activities/saved"
            className={`flex flex-col items-center justify-center ${
              pathname === '/activities/saved' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookmarkIcon className="h-6 w-6" />
            <span className="mt-1 text-xs">Saved</span>
          </Link>
          
          <Link
            href="/activities/new"
            className={`flex flex-col items-center justify-center ${
              pathname === '/activities/new' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span className="mt-1 text-xs">Create</span>
          </Link>
          
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center ${
              pathname === '/profile' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserIcon className="h-6 w-6" />
            <span className="mt-1 text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}; 