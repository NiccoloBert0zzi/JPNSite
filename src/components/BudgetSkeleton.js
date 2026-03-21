export default function BudgetSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Summary bar skeleton */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6 mt-12 mb-8 flex flex-wrap gap-8 items-center">
                {[120, 100, 110].map((w, i) => (
                    <div key={i} className="flex flex-col gap-2 min-w-[120px]">
                        <div className="h-3 bg-gray-200 rounded-full" style={{ width: w * 0.6 }} />
                        <div className="h-8 bg-gray-200 rounded-lg" style={{ width: w }} />
                    </div>
                ))}
                <div className="w-full flex-basis-full mt-2">
                    <div className="h-2.5 bg-gray-200 rounded-full w-full" />
                </div>
            </div>

            {/* Grid skeleton */}
            <div style={{ columnCount: 2, columnGap: '1.5rem' }} className="md:block hidden">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="inline-block w-full mb-6 bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden break-inside-avoid">
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                                <div className="h-4 bg-gray-200 rounded-full w-20" />
                            </div>
                            <div className="h-5 bg-gray-200 rounded-full w-16" />
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            {[1, 2, 3].map((r) => (
                                <div key={r} className="flex justify-between items-center">
                                    <div className="h-3 bg-gray-100 rounded-full w-32" />
                                    <div className="h-3 bg-gray-100 rounded-full w-16" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile single column */}
            <div className="md:hidden flex flex-col gap-4">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                            <div className="h-4 bg-gray-200 rounded-full w-24" />
                            <div className="h-5 bg-gray-200 rounded-full w-16" />
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            {[1, 2].map((r) => (
                                <div key={r} className="flex justify-between items-center">
                                    <div className="h-3 bg-gray-100 rounded-full w-28" />
                                    <div className="h-3 bg-gray-100 rounded-full w-14" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
