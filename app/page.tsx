import { Header } from '@/components/Header';
import { ExampleWish } from '@/components/wish/ExampleWish';
import { generatePrimaryButtonStyles, generateSecondaryButtonStyles } from '@/lib/styles';

export const Arrow = ({ className = '' }: { className?: string }) => (
    <div className={className}>
        <div className="h-2.5 w-2.5 rotate-45 rotate-90 border border-b-[0px] border-l-[0px] border-r-[3px] border-t-[3px] border-solid border-[rgba(0,0,0,0.6)] before:absolute before:-left-2.5 before:top-[7px] before:block before:h-2.5 before:w-2.5 before:border before:border-b-[0px] before:border-l-[0px] before:border-r-[3px] before:border-t-[3px] before:border-solid before:border-[rgba(0,0,0,0.3)] before:content-[''] after:absolute after:left-2.5 after:top-[-13px] after:block after:h-2.5 after:w-2.5 after:border after:border-b-[0px] after:border-l-[0px] after:border-r-[3px] after:border-t-[3px] after:border-solid after:border-black after:content-['']" />
    </div>
);

export default async function Index() {
    return (
        <div className='text-grey-black bg-blue flex w-full flex-1 flex-col items-center gap-20'>
            <Header isLanding />
            <div className='animate-in flex flex-1 flex-col gap-20 px-3 opacity-0'>
                <main className='flex w-screen flex-1 gap-6'>
                    <div className='w-6/12'>
                        <h1 className='text-bold ml-36 mt-24 text-4xl text-white'>
                            You can bravely begin
                            <br /> to fulfill your dreams.
                        </h1>
                    </div>
                    <div className='z-10 flex w-6/12 flex-col items-center justify-center gap-4'>
                        <div className='flex items-center'>
                            <h2>Create a wishlist</h2>
                            <button className={generatePrimaryButtonStyles('ml-4')}>+ Add</button>
                        </div>
                        <Arrow />
                        <div className='ml-32 flex items-center'>
                            <h3>Share to you friends with</h3>
                            <button className={generatePrimaryButtonStyles('ml-4')}>Copy share link</button>
                        </div>
                        <Arrow className='ml-32' />
                        <div className='ml-24 flex flex-col items-end pl-1'>
                            <ExampleWish label='Skateboard' checked />
                            <h3>They will choose what they like the most</h3>
                        </div>
                    </div>
                </main>
                <div className='z-1 absolute bottom-0 right-0 h-0 w-[80vw] border-b-[100vh] border-l-[60vw] border-solid border-b-gray-100 border-l-transparent' />
            </div>
        </div>
    );
}
