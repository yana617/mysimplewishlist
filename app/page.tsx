import { LandingHeader } from '@/components/Header';
import { ExampleWishlist } from '@/components/list/ExampleWishlist';
import { ExampleWish } from '@/components/wish/ExampleWish';
import { generatePrimaryButtonStyles } from '@/lib/styles';

export default async function Index() {
    return (
        <div className='animate-in bg-blue flex h-screen w-full flex-1 flex-col items-center overflow-hidden'>
            <LandingHeader />
            <main className='mobile:flex-col flex w-screen flex-1'>
                <div className='mobile:w-full mobile:pt-16 mobile:flex mobile:justify-center mobile:flex-col relative w-6/12'>
                    <h1 className='text-bold mobile:text-3xl mobile:pl-8 mobile:mt-0 mobile:mb-8 mr-4 mt-24 pl-36 text-4xl text-white'>
                        You can bravely begin
                        <br /> to fulfill your dreams.
                    </h1>
                    <h2 className='mobile:ml-8 mobile:max-w-[310px] ml-36 mt-8 max-w-[380px] text-lg text-white'>
                        This is a simple wishlist where you can write down your wishes and send them to your
                        friends, their choice will be anonymous to you. <br />
                        <p className='mt-2 font-bold'>Real-time updates for every visitor.</p>
                    </h2>

                    <div className='mobile:rounded-none mobile:ml-0 mobile:px-8 mobile:py-20 mobile:mt-16 -ml-4 mt-24 flex w-fit flex-col gap-4 rounded-2xl bg-base-100 px-12 py-8'>
                        <div className='flex items-center'>
                            <h3 className='tracking-[0.2px]'>
                                - Create a wishlist with a
                                <button className={generatePrimaryButtonStyles('mx-2')}>+ Add</button>
                                button
                            </h3>
                        </div>
                        <div className='flex items-center'>
                            <h3 className='tracking-[0.2px]'>
                                - Share to you friends with a
                                <button className={generatePrimaryButtonStyles('mx-2')}>
                                    Copy share link
                                </button>
                                button
                            </h3>
                        </div>
                        <div className='flex items-center'>
                            <h3 className='mobile:mt-0 -mt-2 mr-4 tracking-[0.2px]'>
                                - They will choose what they like the most
                            </h3>
                            <ExampleWish label='Skateboard' checked />
                        </div>
                    </div>
                </div>
                <div className='mobile:w-full z-10 flex w-6/12 items-center justify-center'>
                    <ExampleWishlist />
                </div>
            </main>
        </div>
    );
}
