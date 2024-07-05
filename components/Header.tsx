import Link from 'next/link';
import { CiMenuBurger } from 'react-icons/ci';

import AuthButton from './AuthButton';

export const Title = ({ styles }: { styles: string }) => {
    return (
        <Link href='/'>
            <p className={styles}>&#127880; My simple wishlist</p>
        </Link>
    );
};

export const LandingHeader = () => (
    <nav className='z-30 flex h-16 w-full items-center justify-center shadow-[rgba(0,_0,_0,_0.1)_0px_10px_30px] bg-light-grey'>
        <div className='mobile:px-2 flex h-16 w-full items-center justify-between pl-36 pr-12 text-sm'>
            <Title styles={`mobile:pr-2 text-center text-xl font-medium text-grey-black`} />
            <AuthButton />
        </div>
    </nav>
);

export const WishlistHeader = ({ isMyList }: { isMyList?: boolean }) => (
    <nav className='z-30 flex h-16 w-full items-center justify-between px-6 mobile:px-4'>
        {isMyList ? (
            <label htmlFor='lists-drawer' className='mobile:flex drawer-button ml-8 hidden'>
                <CiMenuBurger size={26} />
            </label>
        ) : (
            <Title styles='pr-2 text-center text-xl font-medium tracking-[0.5px]' />
        )}
        <div
            className={`flex h-16 items-center text-sm ${isMyList ? 'mobile:px-2 w-full pl-36 justify-end pr-12' : ''}`}
        >
            <AuthButton />
        </div>
    </nav>
);
