// If you are using the app directory (app/page.tsx)
import Banner from '@/components/home/Banner';
import PricingAndPlans from '@/components/home/PricingAndPlans';
import MostLikedSection from '@/components/home/TopRated';
import { envConfig } from '@/config/envConfig';
import { TMostLikePost } from '@/types';
import React from 'react';

const Page = async () => {
  const res = await fetch(`${envConfig.baseApi}/post/most-liked`, {
    next: {
      tags: ["posts_data"],
    },
  });

  const data = await res.json();

  return (
    <div className="container mx-auto px-4">
      <Banner />
      <section className="mt-8 p-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Most Liked Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Check out the posts that are trending in the community
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((post: TMostLikePost) => (
            <MostLikedSection post={post} key={post?._id} />
          ))}
        </div>
      </section>
      <PricingAndPlans />
    </div>
  );
};

export default Page;
