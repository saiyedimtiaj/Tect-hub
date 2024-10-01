import { Skeleton } from "@/components/ui/skeleton";

const KnowPeopleSkeleton = () => {
    return (
        <div className="w-1/4 p-6 bg-white space-y-5 lg:block hidden">
            <h1 className="text-xl font-semibold mb-6">People may you Know</h1>
            {/* Skeleton for each user */}
            {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex items-start gap-2">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                        <Skeleton className="w-28 h-5 mb-2" />
                        <Skeleton className="w-12 h-3 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KnowPeopleSkeleton;
