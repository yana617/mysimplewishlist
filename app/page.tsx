import { Header } from '@/components/Header';
import { ExampleWish } from '@/components/wish/ExampleWish';
import { generatePrimaryButtonStyles } from '@/lib/styles';

const Arrow = ({ className = '' }: { className?: string }) => (
    <div className={className}>
        <div className="h-2.5 w-2.5 rotate-45 rotate-90 border border-b-[0px] border-l-[0px] border-r-[3px] border-t-[3px] border-solid border-[rgba(0,0,0,0.6)] before:absolute before:-left-2.5 before:top-[7px] before:block before:h-2.5 before:w-2.5 before:border before:border-b-[0px] before:border-l-[0px] before:border-r-[3px] before:border-t-[3px] before:border-solid before:border-[rgba(0,0,0,0.3)] before:content-[''] after:absolute after:left-2.5 after:top-[-13px] after:block after:h-2.5 after:w-2.5 after:border after:border-b-[0px] after:border-l-[0px] after:border-r-[3px] after:border-t-[3px] after:border-solid after:border-black after:content-['']" />
    </div>
);

export default async function Index() {
    return (
        <div className='text-grey-black bg-blue flex w-full flex-1 flex-col items-center gap-20 overflow-hidden'>
            <Header isLanding />
            <div className='animate-in flex flex-1 flex-col gap-20 opacity-0'>
                <main className='flex w-screen flex-1 gap-6 mobile:flex-col'>
                    <div className='w-6/12 mobile:w-full mobile:mb-48'>
                        <h1 className='text-bold ml-36 mt-24 text-4xl text-white mobile: text-3xl mobile:ml-16 mobile:mt-16'>
                            You can bravely begin
                            <br /> to fulfill your dreams.
                        </h1>
                    </div>
                    <div className='z-10 flex w-6/12 flex-col items-center mobile:items-start justify-center gap-4 mobile:w-full'>
                        <div className='flex items-center mobile:ml-8'>
                            <h2>Create a wishlist</h2>
                            <button className={generatePrimaryButtonStyles('ml-4')}>+ Add</button>
                        </div>
                        <Arrow className='mobile:ml-24' />
                        <div className='ml-32 flex items-center mobile:ml-8'>
                            <h3>Share to you friends with</h3>
                            <button className={generatePrimaryButtonStyles('ml-4')}>Copy share link</button>
                        </div>
                        <Arrow className='ml-32 mobile:ml-36' />
                        <div className='ml-24 flex flex-col items-end pl-1 mobile:ml-8 mobile:mb-8'>
                            <ExampleWish label='Skateboard' checked />
                            <h3>They will choose what they like the most</h3>
                        </div>
                    </div>
                </main>
                <div className='z-1 absolute bottom-0 right-0 h-0 w-[80vw] border-b-[100vh] border-l-[60vw] border-solid border-b-gray-100 border-l-transparent mobile:hidden' />
                <div className='z-1 absolute -bottom-20 right-0 h-0 w-[60vh] border-b-[140vw] border-l-[70px] border-solid border-b-gray-100 border-l-transparent mobile:flex hidden rotate-90' />
            </div>
        </div>
    );
}
