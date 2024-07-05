import Image from 'next/image';

import { Footer } from '@/components/Footer';
import { LandingHeader } from '@/components/Header';
import { JoinButton } from '@/components/JoinButton';
import { ExampleWish } from '@/components/wish/ExampleWish';
import { generatePrimaryButtonStyles } from '@/lib/styles';

export default async function Index() {
    return (
        <div className='animate-in bg-light-grey flex h-screen w-full flex-1 flex-col items-center overflow-hidden'>
            <LandingHeader />
            <main className='mobile:flex-col flex w-screen flex-1'>
                <div className='mobile:w-full mobile:px-6 mobile:py-32 mobile:text-left mobile:items-start relative flex w-6/12 flex-col items-end py-48 text-right'>
                    <h1 className='text-bold font-myriad mobile:text-4xl text-6xl text-black'>
                        Share your wishlist <br /> in just 5 minutes
                    </h1>
                    <h2 className='text-dark-green mobile:max-w-[310px] mt-8 max-w-[420px] text-xl'>
                        This is a simple wishlist where you can write down your wishes and send them to your
                        friends, their choice will be <i>anonymous to you.</i> <br />
                        <p className='mt-2 font-bold'>
                            <span className='text-black'>Real-time</span> updates for every visitor.
                        </p>
                        <JoinButton label='Start creating' styles='btn-md mt-8 w-[250px] text-lg' />
                    </h2>
                </div>
                <div className='mobile:w-full mobile:pb-16 z-10 flex w-6/12 justify-center'>
                    <div className='text-dark-green mobile:mt-0 mobile:p-4 mt-48 flex h-[360px] w-fit flex-col justify-center gap-4 rounded-2xl px-12 py-8'>
                        <div className='mobile:h-48 flex h-16 items-center rounded-2xl bg-white px-8'>
                            <h3 className='tracking-[0.2px]'>
                                1. Create a wishlist with a
                                <button className={generatePrimaryButtonStyles('mx-2')}>+ Add</button>
                                button
                            </h3>
                        </div>
                        <div className='mobile:h-48 flex h-16 items-center rounded-2xl bg-white px-8'>
                            <h3 className='tracking-[0.2px]'>
                                2. Share to you friends with a
                                <button className={generatePrimaryButtonStyles('mx-2')}>
                                    Copy share link
                                </button>
                                button
                            </h3>
                        </div>
                        <div className='mobile:h-48 flex h-16 items-center rounded-2xl bg-white px-8'>
                            <h3 className='mobile:mt-0 mr-4 tracking-[0.2px]'>
                                3. They will choose what they like the most
                            </h3>
                            <ExampleWish label='Skateboard' checked />
                        </div>
                    </div>
                </div>
            </main>
            <div className='text-dark-green mobile:py-16 mobile:h-fit flex h-screen w-full flex-col items-center justify-center bg-white'>
                <Image
                    src='/list-example.png'
                    className='mobile:hidden rounded-lg shadow-md'
                    width={850}
                    height={400}
                    alt='example'
                />
                <Image
                    src='/list-example-mobile.png'
                    className='mobile:flex hidden rounded-lg shadow-md'
                    width={310}
                    height={500}
                    alt='example'
                />
                <div className='mobile:w-[310px] mt-12 w-[850px]'>
                    <p className='w-full text-xl leading-8'>
                        <span>
                            &#9889; Your friends will be able to simply open the link and choose the gift they
                            are ready to buy.
                            <br />
                        </span>
                        <span>
                            &#9889; You will not know who chose what, <b>it is anonymous</b>.<br />
                        </span>
                        <span>
                            &#9889; People who have the link <b>do not need to register</b>.<br />
                        </span>
                    </p>

                    <JoinButton
                        label='Sign up to create list'
                        styles='mobile:flex btn-md mt-8 hidden w-[250px] text-lg'
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
