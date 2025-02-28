import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';

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
              <Image
                src="/MenuAssets/slider.horizontal.3.svg"
                alt="Filter"
                width={24}
                height={24}
                className={pathname === '/activities/filter' ? 'text-indigo-600' : 'text-gray-500'}
              />
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
                    <Image
                      src="/MenuAssets/person.fill.svg"
                      alt="User"
                      width={20}
                      height={20}
                    />
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
            <Image 
              src={pathname === '/activities' ? '/MenuAssets/rectangle.stack.fill.svg' : '/MenuAssets/rectangle.stack.svg'} 
              alt="Explore"
              width={24}
              height={24}
              className="h-6 w-6"
              style={{ 
                filter: pathname === '/activities' ? 'invert(36%) sepia(46%) saturate(5194%) hue-rotate(230deg) brightness(88%) contrast(92%)' : 'none' 
              }}
            />
            <span className="mt-1 text-xs">Explore</span>
          </Link>
          
          <Link
            href="/activities/saved"
            className={`flex flex-col items-center justify-center ${
              pathname === '/activities/saved' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Image 
              src={pathname === '/activities/saved' ? '/MenuAssets/bookmark.fill.svg' : '/MenuAssets/bookmark.svg'} 
              alt="Saved"
              width={24}
              height={24}
              className="h-6 w-6"
              style={{ 
                filter: pathname === '/activities/saved' ? 'invert(36%) sepia(46%) saturate(5194%) hue-rotate(230deg) brightness(88%) contrast(92%)' : 'none' 
              }}
            />
            <span className="mt-1 text-xs">Saved</span>
          </Link>
          
          <Link
            href="/activities/new"
            className={`flex flex-col items-center justify-center ${
              pathname === '/activities/new' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Image 
              src={pathname === '/activities/new' ? '/MenuAssets/plus.square.fill.on.square.fill.svg' : '/MenuAssets/plus.square.on.square.svg'} 
              alt="Create"
              width={24}
              height={24}
              className="h-6 w-6"
              style={{ 
                filter: pathname === '/activities/new' ? 'invert(36%) sepia(46%) saturate(5194%) hue-rotate(230deg) brightness(88%) contrast(92%)' : 'none' 
              }}
            />
            <span className="mt-1 text-xs">Create</span>
          </Link>
          
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center ${
              pathname === '/profile' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Image 
              src={pathname === '/profile' ? '/MenuAssets/person.fill.svg' : '/MenuAssets/person.fill.svg'} 
              alt="Profile"
              width={24}
              height={24}
              className="h-6 w-6"
              style={{ 
                filter: pathname === '/profile' ? 'invert(36%) sepia(46%) saturate(5194%) hue-rotate(230deg) brightness(88%) contrast(92%)' : 'none' 
              }}
            />
            <span className="mt-1 text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}; 